'use client'

import React, { useRef } from 'react'
import { useGLTF, Stars } from '@react-three/drei'
import * as THREE from 'three'

export function MoonBase() {
    const baseGltf = useGLTF('/models/space/Base_Large.gltf')
    const domeGltf = useGLTF('/models/space/GeodesicDome.gltf')
    const houseGltf = useGLTF('/models/space/House_Cylinder.gltf')
    const solarPanelGltf = useGLTF('/models/space/SolarPanel_Roof.gltf')
    const rock1Gltf = useGLTF('/models/space/Rock_Large_1.gltf')
    const rock2Gltf = useGLTF('/models/space/Rock_Large_2.gltf')

    // Planets
    const planet2Gltf = useGLTF('/models/space/Planet_2.gltf')
    const planet7Gltf = useGLTF('/models/space/Planet_7.gltf')
    const planet9Gltf = useGLTF('/models/space/Planet_9.gltf')
    const floatingTreeGltf = useGLTF('/models/space/Tree_Floating_1.gltf')

    return (
        <group>
            {/* Dynamic Starry Sky */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <group scale={0.3} position={[0, -0.2, 0]}>
                {/* Central Base Layout */}
                <primitive object={baseGltf.scene.clone()} position={[0, 0, 0]} scale={10} />

                <primitive object={domeGltf.scene.clone()} position={[-15, 0, -15]} scale={5} />
                <primitive object={houseGltf.scene.clone()} position={[15, 0, -15]} scale={4} />
                <primitive object={solarPanelGltf.scene.clone()} position={[15, 0, -25]} scale={3} />
                <primitive object={solarPanelGltf.scene.clone()} position={[20, 0, -25]} scale={3} />

                {/* Decorative Rocks & Trees */}
                <primitive object={rock1Gltf.scene.clone()} position={[-20, 0, 5]} scale={3} rotation={[0, Math.PI / 4, 0]} />
                <primitive object={rock2Gltf.scene.clone()} position={[25, 0, 10]} scale={4} rotation={[0, -Math.PI / 3, 0]} />

                <primitive object={floatingTreeGltf.scene.clone()} position={[-25, 5, -10]} scale={3} />
                <primitive object={floatingTreeGltf.scene.clone()} position={[30, 8, -5]} scale={2.5} rotation={[0, 1.5, 0]} />

                {/* Giant Background Planets */}
                <primitive object={planet2Gltf.scene.clone()} position={[-80, 40, -100]} scale={20} />
                <primitive object={planet7Gltf.scene.clone()} position={[60, 60, -120]} scale={15} />
                <primitive object={planet9Gltf.scene.clone()} position={[0, 120, -150]} scale={30} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/space/Base_Large.gltf')
useGLTF.preload('/models/space/GeodesicDome.gltf')
useGLTF.preload('/models/space/House_Cylinder.gltf')
useGLTF.preload('/models/space/SolarPanel_Roof.gltf')
useGLTF.preload('/models/space/Rock_Large_1.gltf')
useGLTF.preload('/models/space/Rock_Large_2.gltf')
useGLTF.preload('/models/space/Planet_2.gltf')
useGLTF.preload('/models/space/Planet_7.gltf')
useGLTF.preload('/models/space/Planet_9.gltf')
useGLTF.preload('/models/space/Tree_Floating_1.gltf')
