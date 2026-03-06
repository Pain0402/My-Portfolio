"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/components/ui/Container";
import { Menu, X } from "lucide-react";

// Characters used for the Glitch/Decode effect
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()";

export default function Navbar() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Easter Egg State
    const [clicks, setClicks] = useState<number[]>([]);

    // 5. Decode Effect State
    const originalLogoText = "GIANG";
    const [logoText, setLogoText] = useState(originalLogoText);
    const decodeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const runDecodeEffect = () => {
        let iteration = 0;
        if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);

        decodeIntervalRef.current = setInterval(() => {
            setLogoText(originalLogoText.split("").map((letter, index) => {
                if (index < iteration) {
                    return originalLogoText[index];
                }
                return LETTERS[Math.floor(Math.random() * LETTERS.length)];
            }).join(""));

            if (iteration >= originalLogoText.length) {
                if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Initial decode trigger after a short delay
        const timeout = setTimeout(runDecodeEffect, 800);

        // Scroll Spy Logic
        const observer = new IntersectionObserver(
            (entries) => {
                let currentActive = "";
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        currentActive = entry.target.id;
                    }
                });
                if (currentActive) {
                    setActiveSection(currentActive);
                }
            },
            { rootMargin: "-30% 0px -70% 0px" } // Adjust margins so active state triggers smoothly in the middle
        );

        const sections = ["about", "projects", "skills", "contact"];
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
            if (decodeIntervalRef.current) clearInterval(decodeIntervalRef.current);
            observer.disconnect();
        };
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [mobileMenuOpen]);

    const handleSecretClick = () => {
        const now = Date.now();
        const recentClicks = clicks.filter(time => now - time < 2000);
        const newClicks = [...recentClicks, now];
        setClicks(newClicks);

        if (newClicks.length >= 5) {
            router.push("/hub");
            setClicks([]);
        }
    };

    const navLinks = ["About", "Projects", "Skills", "Contact"];

    return (
        <>
            {/* 1. Floating Capsule Navbar */}
            <header
                className={cn(
                    "fixed top-0 w-full z-50 flex justify-center transition-all duration-700 pointer-events-none",
                    scrolled ? "pt-4 px-4" : "pt-0 px-0"
                )}
            >
                <nav
                    className={cn(
                        "relative flex items-center justify-between w-full transition-all duration-700 pointer-events-auto overflow-hidden",
                        scrolled
                            ? "max-w-3xl py-3 px-6 lg:px-8 rounded-full bg-[rgba(10,10,25,0.6)] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-white/5"
                            : "max-w-7xl py-6 px-4 sm:px-6 lg:px-8 rounded-none border-transparent bg-transparent"
                    )}
                >
                    {/* Animated gradient border for scrolled state */}
                    {scrolled && (
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[var(--accent-cyan)]/0 via-[var(--accent-purple)]/10 to-[var(--accent-pink)]/0 opacity-50 pointer-events-none animate-pulse-slow"></div>
                    )}

                    {/* Logo Section w/ Decode effect & Secret Trigger */}
                    <div
                        className="relative z-10 text-2xl font-bold font-display tracking-wider flex items-center cursor-pointer select-none group"
                        onMouseEnter={runDecodeEffect}
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            runDecodeEffect();
                            handleSecretClick();
                        }}
                        title="v2.1"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 transition-all duration-300 group-hover:from-[var(--accent-cyan)] group-hover:to-[var(--accent-purple)] w-auto min-w-[4.2rem]">
                            {logoText}
                        </span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 relative z-10">
                        {navLinks.map((item) => {
                            const sectionId = item.toLowerCase();
                            const isActive = activeSection === sectionId;

                            return (
                                <a
                                    key={item}
                                    href={`#${sectionId}`}
                                    className={cn(
                                        "font-light text-sm tracking-widest transition-colors uppercase group relative py-1",
                                        isActive ? "text-[var(--accent-cyan)] font-medium" : "text-gray-300 hover:text-white"
                                    )}
                                >
                                    {item}
                                    <span className={cn(
                                        "absolute -bottom-1 right-0 w-0 h-[1px] transition-all duration-300",
                                        isActive ? "w-full left-0 bg-[var(--accent-cyan)] drop-shadow-[0_0_8px_var(--accent-cyan)]" : "group-hover:w-full group-hover:left-0",
                                        !isActive && scrolled && "bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]",
                                        !isActive && !scrolled && "bg-[var(--accent-cyan)]"
                                    )}></span>
                                </a>
                            );
                        })}
                    </div>

                    {/* 4. Mobile Menu Toggle Button */}
                    <button
                        className="md:hidden relative z-10 p-2 -mr-2 text-gray-300 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open Mobile Menu"
                    >
                        <Menu size={24} />
                    </button>
                </nav>
            </header>

            {/* 4. Fullscreen Mobile Overlay with Clip Path Transition */}
            <div
                className="fixed inset-0 z-[100] bg-[rgba(3,0,20,0.95)] backdrop-blur-2xl flex flex-col items-center justify-center pointer-events-none"
                style={{
                    clipPath: mobileMenuOpen ? 'circle(150% at calc(100% - 2.5rem) 2.5rem)' : 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
                    transition: 'clip-path 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
                    pointerEvents: mobileMenuOpen ? 'auto' : 'none'
                }}
            >
                {/* Decorative glowing orb in mobile menu */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent-purple)] rounded-full blur-[100px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--accent-cyan)] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                <button
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-all hover:rotate-90 duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Mobile Menu"
                >
                    <X size={32} />
                </button>

                <div className="flex flex-col items-center space-y-10 relative z-10 w-full px-6">
                    {navLinks.map((item, i) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                transitionDelay: `${mobileMenuOpen ? 200 + (i * 100) : 0}ms`,
                                transitionDuration: '500ms'
                            }}
                            className={cn(
                                "text-4xl sm:text-5xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r uppercase transition-all",
                                mobileMenuOpen
                                    ? "opacity-100 translate-y-0 from-white to-gray-400 hover:from-[var(--accent-cyan)] hover:to-[var(--accent-purple)]"
                                    : "opacity-0 translate-y-8 from-white to-gray-400"
                            )}
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Overlay Footer Elements */}
                <div
                    className={cn(
                        "absolute bottom-12 flex gap-4 text-gray-500 font-mono text-xs tracking-[0.2em] transition-all duration-700 delay-700",
                        mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                >
                    <span>SYS.ONLINE</span>
                    <span className="text-[var(--accent-pink)]">|</span>
                    <span>V2.1</span>
                </div>
            </div>
        </>
    );
}
