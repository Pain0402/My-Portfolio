"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative min-h-[150vh] py-20"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-space)] via-[var(--bg-deep)]/80 to-[var(--bg-space)] pointer-events-none" />

            <Container className="relative z-10 flex flex-col items-center">
                <motion.div
                    style={{ y, opacity }}
                    className="max-w-4xl text-center space-y-12"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                        <span className="text-[var(--accent-purple)]">/</span> About Me
                    </h2>

                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-300">
                        "Hi, I'm <span className="text-gradient font-semibold">Tran Huu Giang</span>. I turn ideas into interactive digital realities."
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left mt-20">
                        {/* Portrait Card */}
                        <div className="lg:col-span-1 glass p-4 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-[var(--accent-cyan)] transition-colors duration-500">
                            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-800">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                {/* Placeholder for User Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                                    [Insert Portrait Here]
                                </div>
                                {/* <img src="/path/to/portrait.jpg" alt="Tran Huu Giang" className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700" /> */}

                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="block text-xs font-mono text-[var(--accent-cyan)] mb-1">HELLO_WORLD</span>
                                    <h3 className="text-xl font-display font-bold text-white">Giang Tran</h3>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-display font-semibold text-[var(--accent-cyan)] mb-4">Core Strengths</h3>
                                <p className="text-gray-400 leading-7">
                                    My expertise lies at the intersection of **Frontend**, **Backend**, and **Artificial Intelligence**. I enjoy building scalable systems and integrating smart AI solutions into seamless user interfaces.
                                </p>
                            </div>

                            <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
                                <h3 className="text-xl font-display font-semibold text-[var(--accent-pink)] mb-4">Beyond Coding</h3>
                                <p className="text-gray-400 leading-7">
                                    When I'm not debugging, you'll find me **drawing**, **listening to music**, or immersing myself in **anime & movies**. I'm also an avid **gamer**, always appreciating the art and logic behind great games.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
