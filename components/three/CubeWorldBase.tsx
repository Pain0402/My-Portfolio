'use client'

import React from 'react'
import { useGLTF, Sky } from '@react-three/drei'
import * as THREE from 'three'

export function CubeWorldBase() {
    const grassBlockGltf = useGLTF('/models/cubeworld/Block_Grass.gltf')
    const dirtBlockGltf = useGLTF('/models/cubeworld/Block_Dirt.gltf')
    const treeGltf = useGLTF('/models/cubeworld/Tree_1.gltf')
    const tree2Gltf = useGLTF('/models/cubeworld/Tree_2.gltf')
    const flowers1Gltf = useGLTF('/models/cubeworld/Flowers_1.gltf')
    const flowers2Gltf = useGLTF('/models/cubeworld/Flowers_2.gltf')
    const rockGltf = useGLTF('/models/cubeworld/Rock1.gltf')

    // Create a simple 10x10 platform
    const platformBlocks = [];
    for (let x = -10; x <= 10; x++) {
        for (let z = -10; z <= 10; z++) {
            // A simple path in the middle
            if (x >= -2 && x <= 2) {
                platformBlocks.push(
                    <primitive
                        key={`dirt-${x}-${z}`}
                        object={dirtBlockGltf.scene.clone()}
                        position={[x, -0.6, z]}
                        scale={[1, 0.9, 1]} // slightly sunken
                    />
                );
            } else if (x * x + z * z < 144) {
                platformBlocks.push(
                    <primitive
                        key={`grass-${x}-${z}`}
                        object={grassBlockGltf.scene.clone()}
                        position={[x, -0.5, z]}
                    />
                );
            }
        }
    }

    return (
        <group>
            <group>
                {/* Bruno Simon Warm Vibe Lighting */}
                <color attach="background" args={['#ff9a76']} />
                <fog attach="fog" args={['#ff9a76', 15, 40]} />

                <ambientLight intensity={1.5} color="#ffd4a3" />

                {/* Soft Sunset Directional Light */}
                <directionalLight
                    castShadow
                    position={[30, 20, -30]}
                    intensity={2.8}
                    color="#ffb37b"
                    shadow-mapSize={[2048, 2048]}
                    shadow-bias={-0.0001}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                />

                {/* Base Voxel Platform */}
                <group position={[0, -0.5, 0]}>
                    {platformBlocks}
                </group>

                {/* A few decorative trees & rocks */}
                <primitive object={treeGltf.scene.clone()} position={[5, 0, 5]} />
                <primitive object={tree2Gltf.scene.clone()} position={[-6, 0, 3]} />
                <primitive object={treeGltf.scene.clone()} position={[8, 0, -2]} />
                <primitive object={treeGltf.scene.clone()} position={[-8, 0, -5]} />

                <primitive object={flowers1Gltf.scene.clone()} position={[3, 0, 4]} />
                <primitive object={flowers2Gltf.scene.clone()} position={[-4, 0, 5]} />

                <primitive object={rockGltf.scene.clone()} position={[6, -0.5, 2]} />
                <primitive object={rockGltf.scene.clone()} position={[-2, -0.5, 8]} scale={2} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/cubeworld/Block_Grass.gltf')
useGLTF.preload('/models/cubeworld/Block_Dirt.gltf')
useGLTF.preload('/models/cubeworld/Tree_1.gltf')
useGLTF.preload('/models/cubeworld/Tree_2.gltf')
useGLTF.preload('/models/cubeworld/Flowers_1.gltf')
useGLTF.preload('/models/cubeworld/Flowers_2.gltf')
useGLTF.preload('/models/cubeworld/Rock1.gltf')
