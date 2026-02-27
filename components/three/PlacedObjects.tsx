'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useSandboxStore, modelPaths, PlacedObject } from '@/store/useSandboxStore';
import { ThreeEvent } from '@react-three/fiber';

export function PlacedObjects() {
    const placedObjects = useSandboxStore((state) => state.placedObjects);
    const buildMode = useSandboxStore((state) => state.buildMode);
    const removeObject = useSandboxStore((state) => state.removeObject);

    return (
        <group>
            {placedObjects.map((obj) => (
                <RenderedObject
                    key={obj.id}
                    obj={obj}
                    buildMode={buildMode}
                    onClick={(e) => {
                        if (buildMode && e.button === 2) { // Right click to remove in Build Mode
                            e.stopPropagation();
                            removeObject(obj.id);
                        }
                    }}
                />
            ))}
        </group>
    );
}

function RenderedObject({ obj, buildMode, onClick }: { obj: PlacedObject, buildMode: boolean, onClick: (e: ThreeEvent<MouseEvent>) => void }) {
    const config = modelPaths[obj.type];
    const { scene } = useGLTF(config.path);

    // Stop propagation so if we left click a model while building, we can still click through (unless we want to stack)
    // Actually if button is left click (0) and we're in build mode, we usually raycast through. We'll set pointerEvents

    return (
        <primitive
            object={scene.clone()}
            position={obj.position}
            rotation={obj.rotation}
            scale={config.scale}
            onPointerDown={buildMode ? onClick : undefined} // Only capture clicks in build mode
        />
    );
}
