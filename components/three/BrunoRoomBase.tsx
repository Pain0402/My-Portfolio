'use client'

import React, { useRef, useMemo } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function BrunoRoomBase() {
    // Load Models
    const { scene: roomScene } = useGLTF('/models/bruno/roomModel.glb')
    const { scene: coffeeScene } = useGLTF('/models/bruno/coffeeSteamModel.glb')
    const { scene: chairScene } = useGLTF('/models/bruno/topChairModel.glb')
    const { scene: macScreenScene } = useGLTF('/models/bruno/macScreenModel.glb')
    const { scene: pcScreenScene } = useGLTF('/models/bruno/pcScreenModel.glb')
    const { scene: loupeScene } = useGLTF('/models/bruno/loupedeckButtonsModel.glb')

    // Load Baked Textures
    const bakedDayTexture = useTexture('/models/bruno/bakedDay.jpg')
    bakedDayTexture.flipY = false;
    bakedDayTexture.colorSpace = THREE.SRGBColorSpace;

    // Apply the baked texture to all meshes in the room
    const bakedMaterial = useMemo(() => new THREE.MeshBasicMaterial({ map: bakedDayTexture }), [bakedDayTexture])

    // We clone the room and apply material
    const roomClone = useMemo(() => {
        const clone = roomScene.clone();
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = bakedMaterial;
            }
        });
        return clone;
    }, [roomScene, bakedMaterial])

    const chairClone = useMemo(() => {
        const clone = chairScene.clone();
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = bakedMaterial;
            }
        });
        return clone;
    }, [chairScene, bakedMaterial])

    const applyMaterial = (scene: THREE.Group) => {
        const clone = scene.clone();
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = bakedMaterial;
            }
        });
        return clone;
    }

    const macScreenClone = useMemo(() => applyMaterial(macScreenScene), [macScreenScene, bakedMaterial])
    const pcScreenClone = useMemo(() => applyMaterial(pcScreenScene), [pcScreenScene, bakedMaterial])
    const loupeClone = useMemo(() => applyMaterial(loupeScene), [loupeScene, bakedMaterial])

    return (
        <group position={[0, -1, 0]}>
            {/* Environment lighting not strictly needed for baked materials, but helps spiderman 
                We use MeshBasicMaterial above so the room itself ignores lights, exactly how Bruno did it! */}

            {/* The main baked room */}
            <primitive object={roomClone} position={[0, 0, 0]} />

            {/* Props included in Bruno's room */}
            <primitive object={chairClone} position={[0, 0, 0]} />
            <primitive object={macScreenClone} position={[0, 0, 0]} />
            <primitive object={pcScreenClone} position={[0, 0, 0]} />
            <primitive object={loupeClone} position={[0, 0, 0]} />
            <primitive object={coffeeScene.clone()} position={[0, 0, 0]} />

            {/* Invisible Floor for Spiderman to walk on */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0, 0]} visible={false}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial />
            </mesh>

            {/* Small ambient light just for Spiderman since the room doesn't react to it */}
            <ambientLight intensity={1.5} color="#ffffff" />
            <directionalLight position={[10, 20, 10]} intensity={1.5} />
        </group>
    )
}

useGLTF.preload('/models/bruno/roomModel.glb')
useGLTF.preload('/models/bruno/coffeeSteamModel.glb')
useGLTF.preload('/models/bruno/topChairModel.glb')
useTexture.preload('/models/bruno/bakedDay.jpg')
