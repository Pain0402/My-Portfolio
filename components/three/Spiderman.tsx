"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useFBX, useAnimations, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils, GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: any
  materials: any
}

export function Spiderman(props: any) {
  const group = useRef<THREE.Group>(null)

  // 1. Load Main Model
  const { scene } = useGLTF('/models/spiderman.glb')
  const clone = React.useMemo(() => {
    const clonedScene = SkeletonUtils.clone(scene)
    clonedScene.traverse((node: any) => {
      if (node.isBone) {
        // e.g. "mixamorig:Hips_01" -> "Hips"
        node.name = node.name.replace(/mixamorig:?/g, '').replace(/_\d+$/, '')
      }
    })
    return clonedScene
  }, [scene])

  // 2. Load Animations (FBX files from Mixamo)
  const idleFbx = useFBX('/models/animations/Happy Idle.fbx')
  const walkFbx = useFBX('/models/animations/Walking.fbx')
  const runFbx = useFBX('/models/animations/Running.fbx')
  const jumpFbx = useFBX('/models/animations/Jumping Up.fbx')
  const skillFbx = useFBX('/models/animations/Fireball.fbx')
  const bowFbx = useFBX('/models/animations/Quick Formal Bow.fbx')
  const waveFbx = useFBX('/models/animations/Waving.fbx')
  const danceFbx = useFBX('/models/animations/Dancing Running Man.fbx')

  // 3. Rename and Extract Animation Clips
  const animations = React.useMemo(() => {
    // Mixamo FBX clips are usually named "mixamo.com" inside the file
    // We clone them and give them proper names
    if (idleFbx.animations.length > 0) idleFbx.animations[0].name = 'Idle'
    if (walkFbx.animations.length > 0) walkFbx.animations[0].name = 'Walking'
    if (runFbx.animations.length > 0) runFbx.animations[0].name = 'Running'
    if (jumpFbx.animations.length > 0) jumpFbx.animations[0].name = 'Jump'
    if (skillFbx.animations.length > 0) skillFbx.animations[0].name = 'Skill'
    if (bowFbx.animations.length > 0) bowFbx.animations[0].name = 'Bow'
    if (waveFbx.animations.length > 0) waveFbx.animations[0].name = 'Wave'
    if (danceFbx.animations.length > 0) danceFbx.animations[0].name = 'Dance'

    return [
      idleFbx.animations[0],
      walkFbx.animations[0],
      runFbx.animations[0],
      jumpFbx.animations[0],
      skillFbx.animations[0],
      bowFbx.animations[0],
      waveFbx.animations[0],
      danceFbx.animations[0]
    ].filter(Boolean).map(clip => {
      const newClip = clip.clone();
      newClip.tracks.forEach(track => {
        // e.g. "mixamorigHips.position" -> "Hips.position"
        // Sometimes tracks have a "mixamorig:" or "mixamorig" prefix
        track.name = track.name.replace(/mixamorig:?/g, '');
      });
      // DEBUG
      return newClip;
    }) as THREE.AnimationClip[]
  }, [idleFbx, walkFbx, runFbx])

  // 4. Bind Animations to the Group
  const { actions } = useAnimations(animations, group)
  const [sub, get] = useKeyboardControls()

  useEffect(() => {
    // Play default animation
    if (actions['Idle']) {
      actions['Idle'].reset().fadeIn(0.5).play()
    }

    group.current!.userData = { currentAnim: 'Idle', lockedUntil: 0 };
  }, [actions])

  const moveSpeed = 3;
  const runSpeed = 8;
  const rotationSpeed = 10;

  // Track double tap W
  const lastPressWRef = useRef(0);
  const wasForwardRef = useRef(false);
  const doubleTapSprintRef = useRef(false);

  // 5. Update Loop
  useFrame((state, delta) => {
    if (!group.current) return;

    const { forward, backward, left, right, jump, run, skill, bow, wave, dance } = get()
    const isMoving = forward || backward || left || right;

    const now = state.clock.elapsedTime;

    // Double tap 'W' logic
    if (forward && !wasForwardRef.current) {
      if (now - lastPressWRef.current < 0.4) {
        doubleTapSprintRef.current = true;
      }
      lastPressWRef.current = now;
    }
    if (!forward) {
      doubleTapSprintRef.current = false;
    }
    wasForwardRef.current = forward;

    const isSprintActive = run || doubleTapSprintRef.current;

    let nextAnim = 'Idle';

    if (dance) {
      nextAnim = 'Dance';
      group.current.userData.lockedUntil = now + (actions['Dance']?.getClip().duration || 1) - 0.2;
    } else if (bow) {
      nextAnim = 'Bow';
      group.current.userData.lockedUntil = now + (actions['Bow']?.getClip().duration || 1) - 0.2;
    } else if (wave) {
      nextAnim = 'Wave';
      group.current.userData.lockedUntil = now + (actions['Wave']?.getClip().duration || 1) - 0.2;
    } else if (skill) {
      nextAnim = 'Skill';
      group.current.userData.lockedUntil = now + (actions['Skill']?.getClip().duration || 1) - 0.2;
    } else if (jump) {
      nextAnim = 'Jump';
      group.current.userData.lockedUntil = now + (actions['Jump']?.getClip().duration || 1) - 0.2;
    } else if (isMoving) {
      nextAnim = isSprintActive ? 'Running' : 'Walking';
      group.current.userData.lockedUntil = 0; // Clear the lock when moving
    } else {
      const isLocked = now < (group.current.userData.lockedUntil || 0);
      if (isLocked) {
        nextAnim = group.current.userData.currentAnim;
      }
    }

    // Smooth transition between animations
    if (group.current.userData.currentAnim !== nextAnim) {
      const prevAnim = group.current.userData.currentAnim;
      if (actions[prevAnim]) actions[prevAnim]!.fadeOut(0.2);
      if (actions[nextAnim]) actions[nextAnim]!.reset().fadeIn(0.2).play();
      group.current.userData.currentAnim = nextAnim;
    }

    // Calculate Movement Vector
    const moveZ = (forward ? -1 : 0) + (backward ? 1 : 0);
    const moveX = (right ? 1 : 0) + (left ? -1 : 0);

    const isStationaryAnim = ['Dance', 'Bow', 'Wave', 'Skill'].includes(nextAnim);

    if (isMoving && !isStationaryAnim) {
      const moveDir = new THREE.Vector3(moveX, 0, moveZ).normalize();
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);

      const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetAngle, 0));
      group.current.quaternion.slerp(targetRotation, delta * rotationSpeed);

      const currentSpeed = isSprintActive ? runSpeed : moveSpeed;
      group.current.translateZ(currentSpeed * delta);
    }

    // Optional: make camera follow the character
    const cameraOffset = new THREE.Vector3(0, 3, 6);
    const targetCameraPos = group.current.position.clone().add(cameraOffset);
    state.camera.position.lerp(targetCameraPos, 0.1);
    state.camera.lookAt(group.current.position.clone().add(new THREE.Vector3(0, 1.5, 0)));
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/models/spiderman.glb')
useFBX.preload('/models/animations/Happy Idle.fbx')
useFBX.preload('/models/animations/Walking.fbx')
useFBX.preload('/models/animations/Running.fbx')
useFBX.preload('/models/animations/Jumping Up.fbx')
useFBX.preload('/models/animations/Fireball.fbx')
useFBX.preload('/models/animations/Quick Formal Bow.fbx')
useFBX.preload('/models/animations/Waving.fbx')
useFBX.preload('/models/animations/Dancing Running Man.fbx')
