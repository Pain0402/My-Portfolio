"use client";
import { Canvas } from "@react-three/fiber";
import { StarField } from "./StarField";
import { Suspense } from "react";
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--bg-space)]">
            <Canvas camera={{ position: [0, 0, 1] }} className="pointer-events-none" dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <group rotation={[0, 0, Math.PI / 4]}>
                        <StarField />
                    </group>

                    {/* Cyberpunk Post-Processing - HIGH INTENSITY */}
                    <EffectComposer disableNormalPass>
                        {/* Neon Glow - Stronger & lower threshold */}
                        <Bloom
                            luminanceThreshold={0.0}
                            luminanceSmoothing={0.7}
                            intensity={2.5}
                            mipmapBlur
                        />

                        {/* Cinematic Grain - More visible */}
                        <Noise
                            opacity={0.08}
                            blendFunction={BlendFunction.OVERLAY}
                        />

                        {/* Focus Attention - Stronger edges */}
                        <Vignette
                            eskil={false}
                            offset={0.15}
                            darkness={1.2}
                        />

                        {/* Glitch/Color Shift - More pronounced */}
                        <ChromaticAberration
                            offset={new Vector2(0.004, 0.004)} // Increased offset
                            radialModulation={false}
                            modulationOffset={0}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
