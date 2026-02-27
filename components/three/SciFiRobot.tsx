"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, useKeyboardControls } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils, GLTF } from 'three-stdlib'

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

    useFrame((state, delta) => {
        if (!group.current) return;

        const { forward, backward, left, right, jump } = get()
        const isMoving = forward || backward || left || right;
        const isRunning = jump; // Space to run

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
            const moveDir = new THREE.Vector3(moveX, 0, moveZ).normalize();
            const targetAngle = Math.atan2(moveDir.x, moveDir.z);

            const targetRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetAngle, 0));
            group.current.quaternion.slerp(targetRotation, delta * rotationSpeed);

            const currentSpeed = isRunning ? runSpeed : moveSpeed;
            group.current.translateZ(currentSpeed * delta);
        }

        // Optional: make camera follow the character
        const cameraOffset = new THREE.Vector3(0, 3, 6);
        const targetCameraPos = group.current.position.clone().add(cameraOffset);
        state.camera.position.lerp(targetCameraPos, 0.1);
        state.camera.lookAt(group.current.position.clone().add(new THREE.Vector3(0, 1, 0)));
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={clone} />
        </group>
    )
}

useGLTF.preload('/models/robot.glb')
