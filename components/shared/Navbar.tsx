"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/components/ui/Container";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 py-4",
                scrolled ? "bg-[rgba(3,0,20,0.85)] backdrop-blur-md border-b border-[var(--glass-border)]" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="text-2xl font-bold font-display tracking-wider">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">GIANG</span>
                    <span className="text-[var(--accent-cyan)]">.</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    {["About", "Projects", "Skills", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="font-light text-sm tracking-widest text-gray-300 hover:text-[var(--accent-cyan)] transition-colors uppercase group relative"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-cyan)] transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
