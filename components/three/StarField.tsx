"use client";
import { useState, useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as random from "maath/random/dist/maath-random.esm";
import { useThemeStore } from "@/store/useThemeStore";

export function StarField(props: any) {
    const ref = useRef<any>(null);
    const { colors } = useThemeStore();
    const [sphere] = useState(() => {
        const data = random.inSphere(new Float32Array(5001), { radius: 50 });
        // Validate against NaN
        for (let i = 0; i < data.length; i++) {
            if (isNaN(data[i])) data[i] = 0;
        }
        return data;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={colors.accentSecondary}
                    size={0.05} // Increased size for visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                    toneMapped={false} // Important for bloom!
                />
            </Points>
        </group>
    );
}
