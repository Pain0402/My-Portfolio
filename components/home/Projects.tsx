"use client";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";

import { projects } from "@/data/projects";

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
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                                    {/* Logo positioned top-left */}
                                    <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <img src={project.logo} alt={`${project.title} Logo`} className="w-full h-full object-contain" />
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-10 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                        <div className="flex justify-between items-end">
                                            <div className="flex-1 mr-8">
                                                <span className="text-[var(--accent-cyan)] font-mono text-sm tracking-widest uppercase mb-2 block">{project.category}</span>
                                                <h3 className="text-4xl font-display font-bold text-white mb-2">{project.title}</h3>

                                                {/* Tech Stack & Description - Visible on Hover */}
                                                <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 delay-100">
                                                    <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {project.techStack.map((tech) => (
                                                            <span key={tech} className="text-xs font-mono bg-white/10 text-[var(--accent-cyan)] px-2 py-1 rounded border border-white/5">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <span className="text-gray-400 font-light block mt-2 group-hover:hidden transition-all duration-300">{project.year}</span>
                                            </div>
                                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--accent-cyan)] group-hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex-shrink-0">
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
