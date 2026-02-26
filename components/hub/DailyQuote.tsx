"use client";
import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";

const quotes = [
    "It's not a bug. It's an undocumented feature. - Anonymous",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Code is like humor. When you have to explain it, it’s bad. - Cory House",
    "Make it work, make it right, make it fast. - Kent Beck",
    "Clean code always looks like it was written by someone who cares. - Robert C. Martin",
    "Simplicity is the soul of efficiency. - Austin Freeman",
    "There are two ways to write error-free programs; only the third one works. - Alan Perlis",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde"
];

export default function DailyQuote() {
    const [quote, setQuote] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);

        let i = 0;
        setIsTyping(true);
        const typingInterval = setInterval(() => {
            if (i < randomQuote.length) {
                setDisplayedText(randomQuote.substring(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="w-full max-w-[1400px] mb-8 glassmorphism p-4 rounded-xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex items-center gap-4 z-10 overflow-hidden relative group shadow-[0_4px_30px_rgba(0,245,212,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)]/5 to-[var(--accent-purple)]/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 p-2 bg-black/20 rounded-md border border-[var(--accent-cyan)]/20 shadow-[0_0_15px_rgba(0,245,212,0.15)]">
                <Terminal size={20} className="text-[var(--accent-cyan)] shrink-0" />
            </div>

            <div className="font-mono text-sm md:text-base text-gray-300 relative z-10 font-medium tracking-wide flex items-center">
                <span className="text-[var(--accent-pink)] mr-3 font-bold">{">"}</span>
                {displayedText}
                {isTyping && <span className="ml-1 w-2 h-4 bg-[var(--accent-cyan)] inline-block animate-pulse align-middle"></span>}
            </div>
        </div>
    );
}
