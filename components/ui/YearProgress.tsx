'use client';

import React, { useState, useEffect } from 'react';
import { CalendarDays, Moon } from 'lucide-react';

export function YearProgress({ className = "absolute bottom-6 left-6 z-50 w-72" }: { className?: string }) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const [percentage, setPercentage] = useState(0);
    const [targetType, setTargetType] = useState<'solar' | 'lunar'>('solar');

    useEffect(() => {
        const updateTimer = () => {
            const now = new Date();
            let newYearDate: Date;
            let startOfYearDate: Date;

            if (targetType === 'solar') {
                newYearDate = new Date(`January 1, 2027 00:00:00`);
                startOfYearDate = new Date(`January 1, 2026 00:00:00`);
            } else {
                newYearDate = new Date(`February 6, 2027 00:00:00`); // Tet 2027
                startOfYearDate = new Date(`February 17, 2026 00:00:00`); // Tet 2026
            }

            const totalYearMs = newYearDate.getTime() - startOfYearDate.getTime();
            const elapsedMs = now.getTime() - startOfYearDate.getTime();
            const difference = newYearDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });

                const currentPercentage = (elapsedMs / totalYearMs) * 100;
                setPercentage(Math.min(Math.max(currentPercentage, 0), 100));
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setPercentage(100);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetType]);

    return (
        <div className={`glassmorphism p-6 border border-[var(--glass-border)] rounded-2xl bg-[rgba(255,255,255,0.05)] backdrop-blur-md ${className} transition-all duration-500 relative overflow-hidden group`}>
            {targetType === 'lunar' && <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-all duration-700 pointer-events-none"></div>}
            {targetType === 'solar' && <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--accent-cyan)]/10 blur-3xl rounded-full"></div>}

            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                    {targetType === 'solar' ? (
                        <CalendarDays size={16} className="text-[var(--accent-cyan)]" />
                    ) : (
                        <Moon size={16} className="text-red-400" />
                    )}
                    <h3 className="text-white font-display font-bold uppercase tracking-widest text-xs">
                        {targetType === 'solar' ? 'Journey to 2027' : 'Tết Đinh Mùi 2027'}
                    </h3>
                </div>
                <button
                    onClick={() => setTargetType(prev => prev === 'solar' ? 'lunar' : 'solar')}
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border transition-colors ${targetType === 'solar'
                        ? 'bg-[var(--accent-cyan)]/20 border-[var(--accent-cyan)]/40 text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/40'
                        : 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/40'
                        }`}
                >
                    {targetType === 'solar' ? 'Solar' : 'Lunar'}
                </button>
            </div>

            <div className="flex gap-4 sm:gap-8 justify-center sm:justify-between text-center mb-8 relative z-10 font-display">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 glassmorphism bg-black/40 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-2">
                        <span className="text-3xl sm:text-5xl font-bold text-white tracking-widest">{timeLeft.days}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em]">Days</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 glassmorphism bg-black/40 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)] mb-2">
                        <span className="text-3xl sm:text-5xl font-bold text-white tracking-widest">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-[0.2em]">Hrs</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 glassmorphism bg-black/40 border border-[var(--accent-pink)]/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(247,37,133,0.1)] mb-2">
                        <span className="text-3xl sm:text-5xl font-bold text-[var(--accent-pink)] tracking-widest">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[var(--accent-pink)]/70 uppercase tracking-[0.2em]">Min</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 glassmorphism bg-black/40 border border-[var(--accent-cyan)]/20 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(76,201,240,0.1)] mb-2">
                        <span className="text-3xl sm:text-5xl font-bold text-[var(--accent-cyan)] tracking-widest">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-[var(--accent-cyan)]/70 uppercase tracking-[0.2em]">Sec</span>
                </div>
            </div>

            <div className="space-y-1 relative z-10">
                <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/60">{targetType === 'solar' ? '2026' : 'Bính Ngọ'}</span>
                    <span className="text-white font-bold">{percentage.toFixed(4)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-linear ${targetType === 'solar'
                            ? 'bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-cyan)]'
                            : 'bg-gradient-to-r from-orange-400 to-red-500'
                            }`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
