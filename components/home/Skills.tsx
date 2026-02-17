"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Container from "@/components/ui/Container";
import { clsx } from "clsx";

const skills = [
    { name: "Flutter", category: "Mobile", size: "col-span-1 row-span-1", bg: "bg-[#027DFD]/10" },
    { name: "Vue.js 3", category: "Frontend", size: "col-span-1 row-span-1", bg: "bg-[#42B883]/10" },
    { name: "React / Next.js", category: "Frontend", size: "col-span-2 row-span-2", bg: "bg-gradient-to-br from-blue-900/40 to-cyan-900/40" },
    { name: "Node.js", category: "Backend", size: "col-span-1 row-span-2", bg: "bg-[#339933]/10" },
    { name: ".NET 8 (C#)", category: "Backend", size: "col-span-1 row-span-1", bg: "bg-[#512BD4]/10" },
    { name: "PostgreSQL", category: "Database", size: "col-span-1 row-span-1", bg: "bg-[#336791]/10" },
    { name: "Supabase", category: "BaaS", size: "col-span-1 row-span-1", bg: "bg-[#3ECF8E]/10" },
    { name: "Three.js / R3F", category: "Creative", size: "col-span-2 row-span-1", bg: "bg-gradient-to-r from-orange-500/10 to-yellow-500/10" },
    { name: "OpenAI API", category: "AI", size: "col-span-1 row-span-1", bg: "bg-[#10A37F]/10" },
    { name: "Docker", category: "DevOps", size: "col-span-1 row-span-1", bg: "bg-[#2496ED]/10" },
];

export default function Skills() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        try {
                            const elements = document.querySelectorAll(".skill-card");
                            if (elements.length > 0) {
                                animate(".skill-card", {
                                    opacity: [0, 1],
                                    scale: [0.8, 1],
                                    translateY: [20, 0],
                                    delay: stagger(100),
                                    easing: "easeOutExpo",
                                    duration: 800,
                                });
                            }
                        } catch (e) {
                            console.error("Animation error", e);
                        }
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (gridRef.current) observer.observe(gridRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="py-32 relative">
            <Container>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-20 text-center">
                    Tech <span className="text-gradient-cyan">Arsenal</span>
                </h2>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-[800px] md:h-[600px] max-w-5xl mx-auto"
                >
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className={clsx(
                                "skill-card glass rounded-3xl p-6 relative overflow-hidden group hover:border-[var(--accent-cyan)] transition-colors duration-300 opacity-0 transform-gpu",
                                skill.size,
                                skill.bg
                            )}
                        >
                            <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay"></div>
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <span className="text-sm font-mono text-gray-400 mb-1 opacity-60 uppercase tracking-wider">{skill.category}</span>
                                <h3 className="text-2xl font-display font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">
                                    {skill.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
