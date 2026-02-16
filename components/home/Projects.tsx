"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";

const projects = [
    {
        title: "ComicsVerse",
        category: "Mobile App",
        slug: "comics-reading-application",
        year: "2024",
        img: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900",
    },
    {
        title: "TechSage",
        category: "AI SaaS Platform",
        slug: "techsage",
        year: "2024",
        img: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900",
    },
    {
        title: "CoolStyle",
        category: "E-commerce",
        slug: "fashion-ecommerce",
        year: "2024",
        img: "bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900",
    },
    {
        title: "CineVerse",
        category: "Web App",
        slug: "cineverse",
        year: "2023",
        img: "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900",
    },
];

export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} id="projects" className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-20 pl-20 pr-20">
                    <div className="flex flex-col justify-center min-w-[400px]">
                        <h2 className="text-6xl md:text-8xl font-display font-bold text-white mb-6">
                            Selected <br /> <span className="text-gradient">Works</span>
                        </h2>
                        <p className="text-gray-400 text-xl max-w-sm">
                            Discover my recent projects, from mobile apps to full-stack platforms.
                        </p>
                    </div>

                    {projects.map((project) => (
                        <div key={project.slug} className="group relative w-[800px] h-[500px] flex-shrink-0">
                            <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                                <div
                                    className={`w-full h-full rounded-3xl ${project.img} border border-white/10 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]`}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                                    <div className="absolute bottom-0 left-0 p-10 w-full bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-[var(--accent-cyan)] font-mono text-sm tracking-widest uppercase mb-2 block">{project.category}</span>
                                                <h3 className="text-4xl font-display font-bold text-white mb-2">{project.title}</h3>
                                                <span className="text-gray-400 font-light">{project.year}</span>
                                            </div>
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--accent-cyan)] group-hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                                <ArrowUpRight className="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
