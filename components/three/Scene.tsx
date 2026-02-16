"use client";
import { Canvas } from "@react-three/fiber";
import { StarField } from "./StarField";
import { Suspense } from "react";
import { Float } from "@react-three/drei";

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--bg-space)]">
            <Canvas camera={{ position: [0, 0, 1] }} className="pointer-events-none">
                <Suspense fallback={null}>
                    <group rotation={[0, 0, Math.PI / 4]}>
                        <StarField />
                    </group>
                </Suspense>
            </Canvas>
        </div>
    );
}
