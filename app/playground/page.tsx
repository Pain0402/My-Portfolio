"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Spiderman } from "@/components/three/Spiderman";
import { SciFiRobot } from "@/components/three/SciFiRobot";
import { MoonBase } from '@/components/three/MoonBase';
import Link from "next/link";
import { ArrowLeft, RefreshCw, Hammer, Map } from "lucide-react";
import { BuilderCursor } from '@/components/three/BuilderCursor';
import { PlacedObjects } from '@/components/three/PlacedObjects';
import { useSandboxStore, modelPaths, spaceModelPaths, cubeModelPaths, ModelType } from '@/store/useSandboxStore';
import { CubeWorldBase } from '@/components/three/CubeWorldBase';
import { BrunoRoomBase } from '@/components/three/BrunoRoomBase';

export default function PlaygroundPage() {
    const [character, setCharacter] = React.useState<'spiderman' | 'robot'>('spiderman');
    const [showControls, setShowControls] = React.useState(true);
    const [mapType, setMapType] = React.useState<'space' | 'cube' | 'bruno'>('bruno');

    const buildMode = useSandboxStore(state => state.buildMode);
    const toggleBuildMode = useSandboxStore(state => state.toggleBuildMode);
    const selectedModel = useSandboxStore(state => state.selectedModel);
    const setSelectedModel = useSandboxStore(state => state.setSelectedModel);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white">
            <div className="absolute top-6 left-6 z-50 flex flex-wrap gap-4">
                <Link href="/hub" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all text-sm font-bold">
                    <ArrowLeft size={16} /> Back to Hub
                </Link>
                <button
                    onClick={() => {
                        setMapType(prev => {
                            if (prev === 'space') return 'cube';
                            if (prev === 'cube') return 'bruno';
                            return 'space';
                        });
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/30 text-emerald-400 rounded-full backdrop-blur-md transition-all text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                    <Map size={16} /> Map: {mapType === 'space' ? 'Moon Base' : mapType === 'cube' ? 'Cube World' : 'Bruno Room'}
                </button>
                <button
                    onClick={() => setCharacter(prev => prev === 'spiderman' ? 'robot' : 'spiderman')}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-pink)]/20 hover:bg-[var(--accent-pink)]/40 border border-[var(--accent-pink)]/30 text-[var(--accent-pink)] rounded-full backdrop-blur-md transition-all text-sm font-bold shadow-[0_0_15px_rgba(247,37,133,0.3)]"
                >
                    <RefreshCw size={16} /> Switch to {character === 'spiderman' ? 'Robot' : 'Spiderman'}
                </button>
                <button
                    onClick={toggleBuildMode}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-md transition-all text-sm font-bold ${buildMode ? 'bg-[var(--accent-cyan)]/40 border-[var(--accent-cyan)]/50 text-[var(--accent-cyan)] shadow-[0_0_15px_rgba(76,201,240,0.4)]' : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'}`}
                >
                    <Hammer size={16} /> {buildMode ? 'Exit Build Mode' : 'Build Mode'}
                </button>
            </div>

            {/* Sandbox Inventory UI */}
            {buildMode && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 glassmorphism flex flex-col gap-3 p-4 border border-white/10 rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-h-[80vh] overflow-y-auto">
                    <h3 className="text-[var(--accent-cyan)] font-display font-bold uppercase tracking-widest text-xs text-center border-b border-white/10 pb-2">Inventory</h3>
                    {(mapType === 'bruno' ? [] : Object.keys(mapType === 'space' ? spaceModelPaths : cubeModelPaths) as ModelType[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setSelectedModel(key)}
                            className={`p-2 rounded border transition-all text-xs font-bold ${selectedModel === key ? 'bg-[var(--accent-cyan)]/40 border-[var(--accent-cyan)] text-white' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'}`}
                        >
                            {key.replace(/_/g, ' ')}
                        </button>
                    ))}
                    <div className="text-[10px] text-gray-400 mt-2 text-center max-w-[100px]">
                        Left Click: Place<br />
                        Right Click: Delete<br />
                        R: Rotate
                    </div>
                </div>
            )}

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
                        {mapType === 'space' && (
                            <>
                                <color attach="background" args={['#050510']} />
                                <fog attach="fog" args={['#100520', 20, 150]} />
                                <ambientLight intensity={0.2} color="#ffffff" />
                                <directionalLight
                                    castShadow
                                    position={[50, 100, -50]}
                                    intensity={1.0}
                                    color="#fff0f0"
                                    shadow-mapSize={[2048, 2048]}
                                />
                                <pointLight position={[-50, 20, 50]} intensity={0.5} color="#4cc9f0" />
                                <MoonBase />
                            </>
                        )}
                        {mapType === 'cube' && <CubeWorldBase />}
                        {mapType === 'bruno' && <BrunoRoomBase />}

                        <PlacedObjects />
                        <BuilderCursor />

                        {character === 'spiderman' ? (
                            <Spiderman position={[0, 0, 0]} scale={7} />
                        ) : (
                            <SciFiRobot position={[0, 0, 0]} scale={0.5} />
                        )}
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </main>
    );
}
