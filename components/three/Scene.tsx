// @ts-nocheck
"use client";
import { Canvas } from "@react-three/fiber";
import { StarField } from "./StarField";
import { FloatingShapes } from "./FloatingShapes";
import { Suspense } from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--bg-space)]">
            <Canvas camera={{ position: [0, 0, 1] }} className="pointer-events-none" dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <group rotation={[0, 0, Math.PI / 4]}>
                        <StarField />
                        <FloatingShapes />
                    </group>

                    {/* Post-Processing — Optimized for performance */}
                    <EffectComposer disableNormalPass>
                        {/* Neon Glow — Reduced intensity */}
                        <Bloom
                            luminanceThreshold={0.3}
                            luminanceSmoothing={0.9}
                            intensity={0.4}
                            mipmapBlur
                        />

                        {/* Focus Attention — lighter vignette */}
                        {/* @ts-ignore */}
                        <Vignette
                            eskil={false}
                            offset={0.2}
                            darkness={0.8}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
