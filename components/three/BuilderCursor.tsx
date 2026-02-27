'use client';

import React, { useRef, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSandboxStore, modelPaths, ModelType } from '@/store/useSandboxStore';

export function BuilderCursor() {
    const buildMode = useSandboxStore((state) => state.buildMode);
    const selectedModel = useSandboxStore((state) => state.selectedModel);
    const addObject = useSandboxStore((state) => state.addObject);

    const [cursorPos, setCursorPos] = useState<[number, number, number]>([0, 0, 0]);
    const ghostRef = useRef<THREE.Group>(null);
    const currentRotation = useRef<number>(0); // Store rotation for the ghost

    // Listen for rotation hotkey
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (buildMode && selectedModel && (e.key === 'r' || e.key === 'R')) {
                currentRotation.current += Math.PI / 4; // Rotate 45 degrees
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [buildMode, selectedModel]);

    // Handle Raycast on invisible floor
    const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!buildMode || !selectedModel) return;
        // Snap to grid (integer positions)
        const x = Math.round(e.point.x);
        const z = Math.round(e.point.z);
        // We apply yOffset later based on model
        setCursorPos([x, 0, z]);
    };

    const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
        if (!buildMode || !selectedModel) return;
        // e.stopPropagation() prevents the click from falling through to OrbitControls or other things if needed
        e.stopPropagation();

        const config = modelPaths[selectedModel];
        addObject({
            type: selectedModel,
            position: [cursorPos[0], cursorPos[1] + config.yOffset, cursorPos[2]],
            rotation: [0, currentRotation.current, 0]
        });
    };

    if (!buildMode) return null;

    return (
        <group>
            {/* Invisible plane to catch raycaster */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.01, 0]}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                visible={false}
            >
                <planeGeometry args={[1000, 1000]} />
                <meshBasicMaterial color="red" wireframe />
            </mesh>

            {/* Ghost Model */}
            {selectedModel && (
                <GhostModel
                    type={selectedModel}
                    position={cursorPos}
                    rotation={currentRotation.current}
                />
            )}
        </group>
    );
}

function GhostModel({ type, position, rotation }: { type: ModelType, position: [number, number, number], rotation: number }) {
    const config = modelPaths[type];
    const { scene } = useGLTF(config.path);

    return (
        <group
            position={[position[0], position[1] + config.yOffset, position[2]]}
            rotation={[0, rotation, 0]}
            scale={config.scale}
        >
            <primitive object={scene.clone()} />
            {/* Add a slightly transparent cyan material effect for ghost */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#00ffff" transparent opacity={0.3} wireframe />
            </mesh>
        </group>
    );
}
