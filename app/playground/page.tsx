"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, KeyboardControls, Sky, Grid } from "@react-three/drei";
import { Spiderman } from "@/components/three/Spiderman";
import { SciFiRobot } from "@/components/three/SciFiRobot";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function PlaygroundPage() {
    const [character, setCharacter] = React.useState<'spiderman' | 'robot'>('spiderman');
    const [showControls, setShowControls] = React.useState(true);
    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <div className="absolute top-6 left-6 z-50 flex gap-4">
                <Link href="/hub" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-sm font-bold">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>
                <button
                    onClick={() => setCharacter(prev => prev === 'spiderman' ? 'robot' : 'spiderman')}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-pink)]/20 hover:bg-[var(--accent-pink)]/40 border border-[var(--accent-pink)]/30 text-[var(--accent-pink)] rounded-full backdrop-blur-md transition-all text-sm font-bold shadow-[0_0_15px_rgba(247,37,133,0.3)]"
                >
                    <RefreshCw size={16} /> Switch to {character === 'spiderman' ? 'Robot' : 'Spiderman'}
                </button>
            </div>

            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-50 glassmorphism flex flex-col items-center p-4 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 ${!showControls ? 'translate-y-full opacity-50' : ''}`}>
                <div
                    className="absolute -top-10 bg-black/40 backdrop-blur border border-white/10 text-white/70 hover:text-white rounded-full p-2 cursor-pointer transition-colors"
                    onClick={() => setShowControls(!showControls)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${showControls ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                </div>

                <h3 className="text-[var(--accent-cyan)] font-display font-bold uppercase tracking-widest text-sm mb-2">Controls</h3>
                <div className={`flex flex-wrap gap-4 justify-center mt-2 max-w-sm transition-all duration-300 ${!showControls ? 'h-0 overflow-hidden m-0 opacity-0' : 'h-auto opacity-100'}`}>
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs mb-1">W</div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Forward</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex gap-1 mb-1">
                            <div className="w-8 h-8 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs">A</div>
                            <div className="w-8 h-8 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs">S</div>
                            <div className="w-8 h-8 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs">D</div>
                        </div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Move</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-8 px-4 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs mb-1">SPACE</div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Jump</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="h-8 px-4 rounded border border-white/30 bg-white/10 flex items-center justify-center font-bold text-xs mb-1">SHIFT</div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Sprint</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded border border-[var(--accent-pink)] bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] flex items-center justify-center font-bold text-xs mb-1">K</div>
                        <span className="text-[10px] text-[var(--accent-pink)] uppercase tracking-wider">Skill</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded border border-yellow-500/50 bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold text-xs mb-1">C</div>
                            <span className="text-[10px] text-yellow-500 uppercase tracking-wider">Dance</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded border border-emerald-500/50 bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs mb-1">V</div>
                            <span className="text-[10px] text-emerald-500 uppercase tracking-wider">Wave</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded border border-purple-500/50 bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold text-xs mb-1">B</div>
                            <span className="text-[10px] text-purple-500 uppercase tracking-wider">Bow</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Scene */}
            <KeyboardControls
                map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                    { name: "jump", keys: ["Space"] },
                    { name: "run", keys: ["Shift"] },
                    { name: "skill", keys: ["k", "K"] },
                    { name: "dance", keys: ["c", "C"] },
                    { name: "wave", keys: ["v", "V"] },
                    { name: "bow", keys: ["b", "B"] },
                ]}
            >
                <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
                    <Suspense fallback={null}>
                        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
                        <ambientLight intensity={0.5} />
                        <directionalLight castShadow position={[10, 20, 10]} intensity={1.5} shadow-mapSize={[1024, 1024]} />
                        <Environment preset="city" />

                        {character === 'spiderman' ? (
                            <Spiderman position={[0, 0, 0]} scale={7} />
                        ) : (
                            <SciFiRobot position={[0, 0, 0]} scale={0.5} />
                        )}

                        {/* Floor */}
                        <Grid
                            position={[0, -0.01, 0]}
                            args={[100, 100]}
                            cellSize={1}
                            cellThickness={1}
                            cellColor="#4cc9f0"
                            sectionSize={10}
                            sectionThickness={1.5}
                            sectionColor="#f72585"
                            fadeDistance={50}
                            fadeStrength={1}
                        />
                        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color="#0a0a0a" />
                        </mesh>
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </main>
    );
}
