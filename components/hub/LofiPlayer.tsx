"use client";
import React, { useState } from "react";
import { Disc3, Music } from "lucide-react";

export default function LofiPlayer() {
    const videoId = "jfKfPfyJRdk";

    return (
        <div
            className={`w-full max-w-4xl mx-auto glassmorphism rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 relative">
                <div className="flex items-center gap-3 z-10">
                    <Disc3 size={20} className={`animate-[spin_4s_linear_infinite] text-[var(--accent-pink)]`} />
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-300 select-none">Lofi Station</span>
                </div>
            </div>

            {/* Content */}
            <div className={`transition-all duration-300 flex flex-col items-center bg-black/20 p-6`}>
                <div className="w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden border border-white/10 bg-black relative shadow-inner">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&mute=0&loop=1&playlist=${videoId}`}
                        title="Lofi Radio"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-none"
                    />
                </div>

                <div className="mt-6 flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-pink)]/10 flex items-center justify-center border border-[var(--accent-pink)]/20 shadow-[0_0_15px_rgba(247,37,133,0.3)] shrink-0">
                        <Music size={20} className="text-[var(--accent-pink)] animate-pulse" />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-white leading-tight font-display tracking-widest uppercase">Lofi Girl Live</p>
                        <p className="text-xs text-[var(--accent-cyan)] tracking-widest uppercase mt-1">Beats to relax/study to</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
