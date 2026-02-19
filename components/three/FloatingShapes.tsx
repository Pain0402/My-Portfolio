"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function FloatingLetter({ letter, position, color, speed = 1, rotation = [0, 0, 0] }: any) {
    const mesh = useRef<any>(null);

    useFrame((state, delta) => {
        if (mesh.current) {
            // Slight rotation for liveliness
            mesh.current.rotation.x += delta * 0.1 * speed;
            mesh.current.rotation.y += delta * 0.15 * speed;
        }
    });

    const fontUrl = "/fonts/helvetiker_regular.typeface.json";

    return (
        <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={0.5}>
            <group position={position} rotation={rotation}>
                <Center>
                    <Text3D
                        ref={mesh}
                        font={fontUrl}
                        size={4} // Larger size
                        height={0.5} // Extrude depth
                        curveSegments={12}
                        bevelEnabled
                        bevelThickness={0.1}
                        bevelSize={0.05}
                        bevelOffset={0}
                        bevelSegments={5}
                    >
                        {letter}
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.2}
                            wireframe={true}
                            transparent={true}
                            opacity={0.15}
                        />
                    </Text3D>
                </Center>
            </group>
        </Float>
    );
}

export function FloatingShapes() {
    // Letters: G I A N G distributed in 3D space
    // Hero: G
    // About: I
    // Projects: A
    // Skills: N
    // Footer: G

    return (
        <group>
            {/* Hero Area - G */}
            <FloatingLetter
                letter="G"
                position={[-4, 1, -2]} // Left side Hero
                color="#00f5d4" // Cyan
                speed={0.8}
                rotation={[0, -0.2, 0]}
            />

            {/* About Section - I */}
            <FloatingLetter
                letter="I"
                position={[4, -2, -8]} // Right side About
                color="#7b2cbf" // Purple
                speed={1}
                rotation={[0, 0.2, 0.1]}

            />

            {/* Projects Section - A */}
            <FloatingLetter
                letter="A"
                position={[-3, 3, -15]} // Left side Projects
                color="#f72585" // Pink
                speed={0.9}
                rotation={[0.1, -0.2, 0]}
            />

            {/* Skills Section - N */}
            <FloatingLetter
                letter="N"
                position={[3, -1, -22]} // Right side Skills
                color="#4cc9f0" // Light Blue
                speed={1.1}
                rotation={[0, 0.3, 0]}
            />

            {/* Footer Area - G */}
            <FloatingLetter
                letter="G"
                position={[0, 2, -28]} // Center deep
                color="#00f5d4" // Cyan
                speed={0.7}
                rotation={[0.2, 0, 0]}
            />
        </group>
    );
}
