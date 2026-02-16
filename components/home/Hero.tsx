"use client";
import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Typewriter from "@/components/ui/Typewriter";

export default function Hero() {
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // Check if refs are current before animating
        if (!headlineRef.current || !subheadRef.current || !ctaRef.current) return;

        const tl = createTimeline();

        tl.add(headlineRef.current, {
            opacity: [0, 1],
            translateY: [50, 0],
            delay: 300,
            easing: "easeOutExpo",
            duration: 1000,
        })
            .add(subheadRef.current, {
                opacity: [0, 1],
                translateY: [30, 0],
                easing: "easeOutExpo",
                duration: 1000,
            }, "-=600")
            .add(ctaRef.current, {
                opacity: [0, 1],
                scale: [0.9, 1],
                easing: "easeOutExpo",
                duration: 1000,
            }, "-=600");

        // Decorative floating elements
        const shapes = document.querySelectorAll(".floating-shape");
        if (shapes.length > 0) {
            animate(".floating-shape", {
                translateY: 20,
                direction: "alternate",
                loop: true,
                duration: 2000,
                easing: "easeInOutSine",
                delay: stagger(200),
            });
        }
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent-purple)] rounded-full blur-[120px] opacity-20 animate-pulse mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent-cyan)] rounded-full blur-[100px] opacity-20 mix-blend-screen pointer-events-none" />

            <Container className="relative z-10 text-center">
                <h1
                    ref={headlineRef}
                    className="font-display font-bold text-5xl md:text-8xl tracking-tight opacity-0 leading-tight"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">
                        Building Intelligent
                    </span> <br />
                    <span className="block h-[1.2em] md:h-[1.5em] overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                        <Typewriter
                            words={["Fullstack Systems", "AI Solutions", "Interactive Webs"]}
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </span>
                </h1>

                <p
                    ref={subheadRef}
                    className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto opacity-0 font-light"
                >
                    Creative Developer & UI/UX Engineer crafting immersive 3D web experiences with modern technologies.
                </p>

                <div className="mt-10 flex justify-center gap-4">
                    <button
                        ref={ctaRef}
                        className="group relative px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium overflow-hidden transition-all hover:bg-white/20 hover:scale-105 opacity-0 active:scale-95 cursor-pointer"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>
                </div>
            </Container>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--accent-cyan)] to-transparent"></div>
            </div>
        </section>
    );
}
