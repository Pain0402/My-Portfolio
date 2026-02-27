"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, useKeyboardControls, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils, GLTF } from 'three-stdlib'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { useSandboxStore } from '@/store/useSandboxStore'

type ActionName = 'Dance' | 'Death' | 'Idle' | 'Jump' | 'No' | 'Punch' | 'Running' | 'Sitting' | 'Standing' | 'ThumbsUp' | 'Walking' | 'WalkJump' | 'Wave' | 'Yes'

interface GLTFAction extends THREE.AnimationClip {
    name: ActionName
}

type GLTFResult = GLTF & {
    nodes: any
    materials: any
    animations: GLTFAction[]
}

export function SciFiRobot(props: any) {
    const group = useRef<THREE.Group>(null)
    const controlsRef = useRef<OrbitControlsImpl>(null)
    const previousPosition = useRef(new THREE.Vector3())

    const { scene, animations } = useGLTF('/models/robot.glb')

    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
    const { nodes, materials } = useGraph(clone) as unknown as GLTFResult

    const { actions, names } = useAnimations(animations, group)

    const [sub, get] = useKeyboardControls()

    useEffect(() => {
        // RobotExpressive has "Idle", "Walking", "Running", "Dance"
        if (actions['Idle']) {
            actions['Idle'].reset().fadeIn(0.5).play()
        }

        // Default config
        group.current!.userData = {
            idleAnim: 'Idle',
            walkAnim: 'Walking',
            runAnim: 'Running'
        }
    }, [actions])

    const moveSpeed = 3;
    const runSpeed = 8;
    const rotationSpeed = 10;

    const buildMode = useSandboxStore((state) => state.buildMode)

    useFrame((state, delta) => {
        if (!group.current) return;

        const { forward, backward, left, right, jump } = get()
        const isMoving = !buildMode && (forward || backward || left || right);
        const isRunning = jump && !buildMode; // Space to run

        const ud = group.current.userData;

        // Animation Blending
        if (isMoving) {
            const targetAnim = isRunning ? ud.runAnim : ud.walkAnim;
            const otherAnim = isRunning ? ud.walkAnim : ud.runAnim;

            if (!actions[targetAnim]?.isRunning()) {
                actions[targetAnim]?.reset().fadeIn(0.2).play();
                actions[ud.idleAnim]?.fadeOut(0.2);
                actions[otherAnim]?.fadeOut(0.2);
            }
        } else {
            if (!actions[ud.idleAnim]?.isRunning()) {
                actions[ud.idleAnim]?.reset().fadeIn(0.2).play();
                actions[ud.walkAnim]?.fadeOut(0.2);
                actions[ud.runAnim]?.fadeOut(0.2);
            }
        }

        // Calculate Movement Vector
        const moveZ = (forward ? -1 : 0) + (backward ? 1 : 0);
        const moveX = (right ? 1 : 0) + (left ? -1 : 0);

        if (isMoving) {
            // Calculate angle relative to camera
            const angleYCameraDirection = Math.atan2(
                (state.camera.position.x - group.current.position.x),
                (state.camera.position.z - group.current.position.z)
            );

            // Direction offset based on input
            const directionOffset = Math.atan2(moveX, moveZ);

            // Combine to rotate character correctly
            const targetAngle = angleYCameraDirection + directionOffset;

            const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetAngle, 0));
            group.current.quaternion.slerp(targetRotation, delta * rotationSpeed);

            const currentSpeed = isRunning ? runSpeed : moveSpeed;
            group.current.translateZ(currentSpeed * delta);
        }

        // Camera follow the character via OrbitControls
        if (controlsRef.current && group.current) {
            // Find movement delta
            const deltaPos = group.current.position.clone().sub(previousPosition.current);

            // Move camera by delta
            state.camera.position.add(deltaPos);

            // Move target to match character
            const targetPos = group.current.position.clone().add(new THREE.Vector3(0, 1.5, 0));
            controlsRef.current.target.copy(targetPos);

            controlsRef.current.update();

            previousPosition.current.copy(group.current.position);
        } else if (group.current) {
            previousPosition.current.copy(group.current.position);
        }
    })

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                mouseButtons={{ RIGHT: THREE.MOUSE.ROTATE, LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY }}
                enablePan={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2 + 0.1}
            />
            <group ref={group} {...props} dispose={null}>
                <primitive object={clone} />
            </group>
        </>
    )
}

useGLTF.preload('/models/robot.glb')
