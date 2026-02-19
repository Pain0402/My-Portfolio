"use client";
import { Canvas } from "@react-three/fiber";
import { StarField } from "./StarField";
import { FloatingShapes } from "./FloatingShapes";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

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

                    {/* Cyberpunk Post-Processing - HIGH INTENSITY */}
                    <EffectComposer disableNormalPass>
                        {/* Neon Glow - Balanced & Soft */}
                        <Bloom
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            intensity={0.6}
                            mipmapBlur
                        />

                        {/* Cinematic Grain - More visible */}
                        <Noise
                            opacity={0.08}
                            blendFunction={BlendFunction.OVERLAY}
                        />

                        {/* Focus Attention - Stronger edges */}
                        {/* @ts-ignore */}
                        <Vignette
                            eskil={false}
                            offset={0.15}
                            darkness={1.2}
                        />

                        {/* Glitch/Color Shift - More pronounced */}
                        {/* @ts-ignore */}
                        <ChromaticAberration
                            offset={new Vector2(0.003, 0.003)} // Slightly reduced
                            radialModulation={false}
                            modulationOffset={0}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
