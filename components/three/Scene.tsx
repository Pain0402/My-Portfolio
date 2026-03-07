// @ts-nocheck
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { StarField } from "./StarField";
import { FloatingShapes } from "./FloatingShapes";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

function CameraRig() {
    // We update camera on every frame
    useFrame((state) => {
        // --- 1. Scroll-based Depth Parallax (Z-Axis and Y-Axis) ---
        // Get absolute scroll position
        const scrollY = window.scrollY;

        // Calculate maximum scrollable distance
        const maxScroll = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        ) - window.innerHeight;

        // Progress between 0 (top) and 1 (bottom)
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

        // As scrollProgress goes 0 -> 1, camera flies from Z = 1 to Z = -30 deeper into the space
        const targetZ = 1 - (scrollProgress * 30);

        // Camera slightly drops in Y axis to add curvature of flight
        const targetY = scrollProgress * -2;

        // --- 2. Mouse-based Tilt Parallax (X and Y Axis) ---
        // state.pointer holds normalized mouse coords roughly [-1, 1]
        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y;

        // Sway the camera slightly based on mouse
        const targetX = mouseX * 2;

        // Interpolate camera POSITION smoothly
        state.camera.position.lerp(new THREE.Vector3(targetX, targetY + (mouseY * 1), targetZ), 0.05);

        // Interpolate camera ROTATION smoothly for dynamic tilt
        const targetRotationX = mouseY * 0.1;
        const targetRotationY = -mouseX * 0.1;
        const targetRotationZ = scrollProgress * Math.PI * 0.25; // Twist slightly as we go deep

        state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, targetRotationX, 0.05);
        state.camera.rotation.y = THREE.MathUtils.lerp(state.camera.rotation.y, targetRotationY, 0.05);
        state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, targetRotationZ, 0.05);
    });

    return null;
}

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[var(--bg-space)]">
            <Canvas camera={{ position: [0, 0, 1] }} className="pointer-events-none" dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <CameraRig />

                    {/* The 3D Scene elements */}
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
