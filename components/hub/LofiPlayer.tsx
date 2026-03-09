"use client";
import React, { useState } from "react";
import { Disc3, Music, CloudRain, Keyboard, PlayCircle, Radio } from "lucide-react";

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
        videoId: "mIYzpCGtdes",
        icon: Keyboard,
        color: "#f59e0b" // amber-500
    }
];

export default function LofiPlayer() {
    const [activeStation, setActiveStation] = useState<Station>(STATIONS[0]);

    return (
        <div className="w-full max-w-6xl mx-auto glassmorphism rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
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
                            key={activeStation.id} // Forces iframe reload on station change
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${activeStation.videoId}?autoplay=1&controls=1&mute=0&loop=1&playlist=${activeStation.videoId}`}
                            title={activeStation.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-none"
                        />
                    </div>

                    <div className="mt-8 flex items-center gap-5 w-full">
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
                </div>

                {/* Right: Station List */}
                <div className="w-full lg:w-96 p-6 flex flex-col gap-3">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">Available Stations</h3>
                    <div className="flex flex-col gap-3">
                        {STATIONS.map((station) => {
                            const isActive = activeStation.id === station.id;
                            const Icon = station.icon;

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
                                            <Disc3 size={20} className="animate-[spin_3s_linear_infinite]" style={{ color: station.color }} />
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
    );
}
