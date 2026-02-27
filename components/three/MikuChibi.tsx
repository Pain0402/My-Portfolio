"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: any
  materials: any
  animations: any[]
}

export function MikuChibi(props: any) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/miku_chibi.glb')

  // Clone scene for multiple instances if needed
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult

  // Setup animations
  const { actions, names } = useAnimations(animations, group)

  // Movement State
  const [sub, get] = useKeyboardControls()

  useEffect(() => {
    // Play idle animation by default if available
    // Check available animations and pick the first one, or 'idle'
    if (names.length > 0) {
      const firstAnim = names[0];
      // Try to find idle or Walk/Run
      const idleAnim = names.find(n => n.toLowerCase().includes('idle')) || firstAnim;
      const walkAnim = names.find(n => n.toLowerCase().includes('walk') || n.toLowerCase().includes('run')) || null;

      // Store action names globally on the component for movement reference
      group.current!.userData = { idleAnim, walkAnim };

      if (actions[idleAnim]) {
        actions[idleAnim]!.reset().play();
      }
    }
  }, [actions, names])

  const moveSpeed = 5;
  const rotationSpeed = 10;

  useFrame((state, delta) => {
    if (!group.current) return;

    const { forward, backward, left, right } = get()

    // Check if moving
    const isMoving = forward || backward || left || right;

    // Handle Animations
    const ud = group.current.userData;
    if (ud && ud.idleAnim && ud.walkAnim && actions[ud.idleAnim] && actions[ud.walkAnim]) {
      if (isMoving) {
        // Transition to walk
        if (!actions[ud.walkAnim]!.isRunning()) {
          actions[ud.walkAnim]!.reset().play();
          actions[ud.idleAnim]!.stop(); // Or crossFadeFrom
        }
      } else {
        // Transition back to idle
        if (!actions[ud.idleAnim]!.isRunning()) {
          actions[ud.idleAnim]!.reset().play();
          if (ud.walkAnim) actions[ud.walkAnim]!.stop();
        }
      }
    } else if (names.length > 0 && actions[names[0]]) {
      // If no specific idle/walk, just ensure something is playing
      if (!actions[names[0]]!.isRunning()) {
        actions[names[0]]!.play()
      }
    }

    // Calculate Movement Vector
    const moveZ = (forward ? -1 : 0) + (backward ? 1 : 0);
    const moveX = (right ? 1 : 0) + (left ? -1 : 0);

    // Procedural Animation Variables
    const time = state.clock.getElapsedTime();

    if (isMoving) {
      // Movement direction relative to world (or camera)
      const moveDir = new THREE.Vector3(moveX, 0, moveZ).normalize();

      // Target angle based on X Z inputs
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);

      // Smoothly rotate character using quaternion spherical linear interpolation (slerp)
      const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetAngle, 0));
      group.current.quaternion.slerp(targetRotation, delta * rotationSpeed);

      // Move character forward inside local space based on target face
      group.current.translateZ(moveSpeed * delta);

      // Procedural Walk Animation (Bobbing & Leaning)
      group.current.position.y = 0 + Math.abs(Math.sin(time * 15)) * 0.3; // Bob up and down

      // Lean forward slightly when moving (we apply to a child rotation if we want, but since quaternions are handled above, 
      // let's just make the primitive inside the group sway)
      clone.rotation.x = THREE.MathUtils.lerp(clone.rotation.x, 0.2, 0.1);
      clone.rotation.z = Math.sin(time * 10) * 0.1; // wobble side to side
    } else {
      // Return to Idle Stance
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, 0, 0.1);
      clone.rotation.x = THREE.MathUtils.lerp(clone.rotation.x, 0, 0.1);
      clone.rotation.z = THREE.MathUtils.lerp(clone.rotation.z, 0, 0.1);

      // Gentle breathing idle animation
      clone.position.y = Math.sin(time * 2) * 0.02;
    }

    // Optional: make camera follow the character
    const cameraOffset = new THREE.Vector3(0, 3, 6);
    const targetCameraPos = group.current.position.clone().add(cameraOffset);
    state.camera.position.lerp(targetCameraPos, 0.1);
    state.camera.lookAt(group.current.position.clone().add(new THREE.Vector3(0, 1, 0)));
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* We inject the entire cloned scene instead of individual meshes for simpler loading */}
      <primitive object={clone} />
    </group>
  )
}

useGLTF.preload('/models/miku_chibi.glb')
