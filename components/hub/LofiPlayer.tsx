"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, X, Disc3, Music } from "lucide-react";

export default function LofiPlayer() {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Lofi Girl stream: jfKfPfyJRdk
    const videoId = "jfKfPfyJRdk";

    if (!isVisible) return null;

    return (
        <motion.div
            drag
            dragConstraints={{ top: -500, left: -1000, right: 0, bottom: 0 }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileDrag={{ scale: 1.02, cursor: "grabbing" }}
            className={`fixed bottom-8 right-8 z-[100] glassmorphism rounded-2xl border border-[var(--glass-border)] bg-[rgba(10,10,10,0.8)] backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 ${isMinimized ? 'w-[200px]' : 'w-[320px]'}`}
            style={{ cursor: "grab" }}
        >
            {/* Header / Drag Handle */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5 group relative">
                <div className="flex items-center gap-2 z-10">
                    <Disc3 size={16} className={`animate-[spin_4s_linear_infinite] ${isMinimized ? 'text-gray-400' : 'text-[var(--accent-pink)]'}`} />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300 select-none">Lofi Station</span>
                </div>
                <div className="flex items-center gap-3 z-10" onPointerDownCapture={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                    >
                        {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                    </button>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-400 hover:text-red-400 transition-colors focus:outline-none"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content (Hidden when Minimized) */}
            <div className={`transition-all duration-300 flex flex-col items-center bg-black/40 ${isMinimized ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100 p-4'}`}>

                <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black relative" onPointerDownCapture={(e) => e.stopPropagation()}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&mute=1&loop=1&playlist=${videoId}`}
                        title="Lofi Radio"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-none pointer-events-auto"
                    />
                </div>

                <div className="mt-4 flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-pink)]/10 flex items-center justify-center border border-[var(--accent-pink)]/20 shadow-[0_0_15px_rgba(247,37,133,0.3)] shrink-0">
                        <Music size={18} className="text-[var(--accent-pink)] animate-pulse" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white leading-tight font-display tracking-widest uppercase">Lofi Girl Live</p>
                        <p className="text-[10px] text-[var(--accent-cyan)] tracking-widest uppercase mt-0.5">Beats to relax/study</p>
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
