"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Disc3, Music, CloudRain, Keyboard, PlayCircle, Radio, Play, Pause, RotateCcw, Coffee, Brain, Timer } from "lucide-react";

type Station = {
    id: string;
    title: string;
    subtitle: string;
    videoId: string;
    icon: any;
    color: string;
};

const STATIONS: Station[] = [
    {
        id: "lofi-girl",
        title: "Lofi Girl Live",
        subtitle: "Beats to relax/study to",
        videoId: "jfKfPfyJRdk",
        icon: Music,
        color: "var(--accent-pink)" // #f72585
    },
    {
        id: "synthwave",
        title: "Synthwave Radio",
        subtitle: "Cyberpunk / Retrowave",
        videoId: "4xDzrJKXOOY",
        icon: Radio,
        color: "var(--accent-purple)" // #7209b7
    },
    {
        id: "rain",
        title: "Rainy Night",
        subtitle: "Cozy deep focus",
        videoId: "mPZkdNFkNps",
        icon: CloudRain,
        color: "var(--accent-cyan)" // #4cc9f0
    },
    {
        id: "piano",
        title: "Classical Piano",
        subtitle: "Elegant & Calm",
        videoId: "WJ3t9gD7zkw",
        icon: Keyboard,
        color: "#f59e0b"
    }
];

// Pomodoro Config
const FOCUS_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

type PomodoroMode = 'focus' | 'short-break' | 'long-break';

// --- Pomodoro Timer Component ---
function PomodoroTimer({ accentColor }: { accentColor: string }) {
    const [mode, setMode] = useState<PomodoroMode>('focus');
    const [secondsLeft, setSecondsLeft] = useState(FOCUS_MINUTES * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const totalSeconds = mode === 'focus' ? FOCUS_MINUTES * 60
        : mode === 'short-break' ? SHORT_BREAK_MINUTES * 60
        : LONG_BREAK_MINUTES * 60;

    const progress = 1 - secondsLeft / totalSeconds;
    const circumference = 2 * Math.PI * 54; // radius=54
    const strokeDashoffset = circumference * (1 - progress);

    const modeColor = mode === 'focus' ? '#10b981' : mode === 'short-break' ? '#f59e0b' : '#3b82f6';
    const ModeIcon = mode === 'focus' ? Brain : Coffee;

    // Countdown logic
    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0 && isRunning) {
            // Auto-switch mode
            setIsRunning(false);
            if (mode === 'focus') {
                const newSessions = sessionsCompleted + 1;
                setSessionsCompleted(newSessions);
                // Every 4 sessions → long break
                if (newSessions % 4 === 0) {
                    setMode('long-break');
                    setSecondsLeft(LONG_BREAK_MINUTES * 60);
                } else {
                    setMode('short-break');
                    setSecondsLeft(SHORT_BREAK_MINUTES * 60);
                }
            } else {
                setMode('focus');
                setSecondsLeft(FOCUS_MINUTES * 60);
            }
        }
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isRunning, secondsLeft, mode, sessionsCompleted]);

    const toggleTimer = useCallback(() => setIsRunning(prev => !prev), []);

    const resetTimer = useCallback(() => {
        setIsRunning(false);
        setMode('focus');
        setSecondsLeft(FOCUS_MINUTES * 60);
        setSessionsCompleted(0);
    }, []);

    const switchMode = useCallback((newMode: PomodoroMode) => {
        setIsRunning(false);
        setMode(newMode);
        setSecondsLeft(
            newMode === 'focus' ? FOCUS_MINUTES * 60
            : newMode === 'short-break' ? SHORT_BREAK_MINUTES * 60
            : LONG_BREAK_MINUTES * 60
        );
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    return (
        <div className="w-full rounded-xl border border-white/10 bg-black/30 p-5 flex flex-col items-center gap-4 relative overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${modeColor}, transparent 70%)` }} />

            {/* Mode Label */}
            <div className="flex items-center gap-2 z-10">
                <Timer size={14} style={{ color: modeColor }} />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">Pomodoro Focus</span>
            </div>

            {/* Mode Selector Pills */}
            <div className="flex gap-1.5 z-10">
                {([
                    { id: 'focus' as PomodoroMode, label: 'Focus', dur: FOCUS_MINUTES },
                    { id: 'short-break' as PomodoroMode, label: 'Short', dur: SHORT_BREAK_MINUTES },
                    { id: 'long-break' as PomodoroMode, label: 'Long', dur: LONG_BREAK_MINUTES },
                ]).map(m => {
                    const isActive = mode === m.id;
                    const pillColor = m.id === 'focus' ? '#10b981' : m.id === 'short-break' ? '#f59e0b' : '#3b82f6';
                    return (
                        <button
                            key={m.id}
                            onClick={() => switchMode(m.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${isActive ? 'text-white border-white/20' : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-white/10'}`}
                            style={isActive ? { backgroundColor: `${pillColor}20`, borderColor: `${pillColor}40` } : {}}
                        >
                            {m.label}
                        </button>
                    );
                })}
            </div>

            {/* Circular Timer */}
            <div className="relative w-32 h-32 z-10">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    {/* Background track */}
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    {/* Progress arc */}
                    <circle
                        cx="60" cy="60" r="54"
                        fill="none"
                        stroke={modeColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-linear"
                        style={{ filter: `drop-shadow(0 0 8px ${modeColor})` }}
                    />
                </svg>
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <ModeIcon size={16} className="mb-1 opacity-60" style={{ color: modeColor }} />
                    <span className="text-2xl font-mono font-bold text-white tracking-wider">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] mt-0.5" style={{ color: modeColor }}>
                        {mode === 'focus' ? 'Focus' : mode === 'short-break' ? 'Break' : 'Long Break'}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 z-10">
                <button
                    onClick={toggleTimer}
                    className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 active:scale-95"
                    style={{
                        backgroundColor: `${modeColor}20`,
                        borderColor: `${modeColor}50`,
                        boxShadow: isRunning ? `0 0 15px ${modeColor}40` : 'none'
                    }}
                >
                    {isRunning
                        ? <Pause size={16} style={{ color: modeColor }} />
                        : <Play size={16} className="ml-0.5" style={{ color: modeColor }} />
                    }
                </button>
                <button
                    onClick={resetTimer}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all hover:scale-110 active:scale-95"
                >
                    <RotateCcw size={14} />
                </button>
            </div>

            {/* Session Counter */}
            <div className="flex items-center gap-2 z-10">
                {[1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all"
                        style={{
                            backgroundColor: i <= (sessionsCompleted % 4 || (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? 4 : 0)) ? modeColor : 'rgba(255,255,255,0.1)',
                            boxShadow: i <= (sessionsCompleted % 4 || (sessionsCompleted > 0 && sessionsCompleted % 4 === 0 ? 4 : 0)) ? `0 0 6px ${modeColor}` : 'none'
                        }}
                    />
                ))}
                <span className="text-[9px] text-gray-500 ml-1 uppercase tracking-wider">{sessionsCompleted} sessions</span>
            </div>
        </div>
    );
}

// --- Main LofiPlayer Component ---
export default function LofiPlayer() {
    const [activeStation, setActiveStation] = useState<Station>(STATIONS[0]);

    return (
        <div className="w-full max-w-6xl mx-auto glassmorphism rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
            <style>{`
                @keyframes equalizer {
                    0%, 100% { transform: scaleY(0.3); }
                    50% { transform: scaleY(1); }
                }
            `}</style>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 relative">
                <div className="flex items-center gap-3 z-10">
                    <Disc3 size={20} className="animate-[spin_4s_linear_infinite]" style={{ color: activeStation.color }} />
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-300 select-none">Multi-Station Vibe</span>
                </div>
            </div>

            {/* Content Split */}
            <div className="flex flex-col lg:flex-row bg-black/20">
                {/* Left: Video Player */}
                <div className="flex-1 p-6 flex flex-col items-center border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black relative shadow-inner transition-all duration-500" style={{ boxShadow: `0 0 30px ${activeStation.color}20` }}>
                        <iframe
                            key={activeStation.id}
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeStation.videoId}?autoplay=1&controls=1&mute=0&loop=1&playlist=${activeStation.videoId}`}
                            title={activeStation.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-none"
                        />
                    </div>

                    <div className="mt-8 flex justify-between items-center w-full">
                        <div className="flex items-center gap-5">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all duration-500"
                                style={{ backgroundColor: `${activeStation.color}15`, border: `1px solid ${activeStation.color}40`, boxShadow: `0 0 20px ${activeStation.color}40` }}
                            >
                                <activeStation.icon size={24} className="animate-pulse" style={{ color: activeStation.color }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white leading-tight font-display tracking-widest uppercase transition-colors">{activeStation.title}</p>
                                <p className="text-sm tracking-widest uppercase mt-1 transition-colors" style={{ color: activeStation.color }}>{activeStation.subtitle}</p>
                            </div>
                        </div>

                        {/* Audio Wave Effect */}
                        <div className="flex items-end gap-1.5 h-8 opacity-80 px-4">
                            {[0.9, 1.2, 0.8, 1.1, 0.95].map((dur, i) => (
                                <div
                                    key={i}
                                    className="w-1.5 rounded-t-full origin-bottom"
                                    style={{
                                        height: '100%',
                                        backgroundColor: activeStation.color,
                                        animation: `equalizer ${dur}s ease-in-out infinite`,
                                        boxShadow: `0 0 10px ${activeStation.color}`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Pomodoro + Station List */}
                <div className="w-full lg:w-96 p-6 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
                    {/* Pomodoro Timer */}
                    <PomodoroTimer accentColor={activeStation.color} />

                    {/* Station List */}
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">Available Stations</h3>
                        <div className="flex flex-col gap-3">
                            {STATIONS.map((station) => {
                                const isActive = activeStation.id === station.id;
                                return (
                                    <button
                                        key={station.id}
                                        onClick={() => setActiveStation(station)}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all relative overflow-hidden group text-left ${isActive ? 'bg-white/10 border-white/20' : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/10'} border`}
                                    >
                                        {isActive && (
                                            <div className="absolute inset-0 opacity-10 transition-colors" style={{ backgroundColor: station.color }}></div>
                                        )}

                                        {/* Play Indicator / Icon */}
                                        <div className="relative shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 group-hover:border-white/30 transition-all">
                                            {isActive ? (
                                                <div className="flex items-end gap-[2px] h-4">
                                                    {[0.8, 1.1, 0.9, 1.0].map((dur, i) => (
                                                        <div
                                                            key={i}
                                                            className="w-1 rounded-t-sm origin-bottom"
                                                            style={{
                                                                height: '100%',
                                                                backgroundColor: station.color,
                                                                animation: `equalizer ${dur}s ease-in-out infinite`
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <PlayCircle size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                                            )}
                                        </div>

                                        <div>
                                            <p className={`text-sm font-bold tracking-wide uppercase transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{station.title}</p>
                                            <p className={`text-xs tracking-wider uppercase mt-1 transition-colors ${isActive ? '' : 'text-gray-500'}`} style={{ color: isActive ? station.color : '' }}>{station.subtitle}</p>
                                        </div>

                                        {isActive && (
                                            <div className="absolute right-0 top-0 bottom-0 w-1 shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-colors" style={{ backgroundColor: station.color }}></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
