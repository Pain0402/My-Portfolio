"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            const supabase = createClient();
            const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
            if (data) {
                setProjects(data);
            }
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (projects.length === 0 || isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [projects, isHovered]);

    if (isLoading) {
        return (
            <section id="projects" className="relative bg-[var(--bg-space)] pt-32 pb-20 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-[var(--accent-cyan)]">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <span className="text-xl">Loading projects from database...</span>
                </div>
            </section>
        );
    }

    if (projects.length === 0) return null;

    const activeProject = projects[activeIndex];

    return (
        <section id="projects" className="relative bg-transparent pt-32 pb-32 min-h-screen overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[var(--accent-cyan)] rounded-full blur-[120px] opacity-10 md:opacity-20 animate-pulse mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[var(--accent-purple)] rounded-full blur-[100px] opacity-10 md:opacity-20 mix-blend-screen pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
                    Selected <span className="text-gradient">Works</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    A showcase of my recent projects, from functional apps to creative web experiences.
                </p>
            </div>

            <div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative flex flex-col items-center z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Active Project Card (Reverted to original horizontal style) */}
                <div className="w-full h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[450px] relative flex justify-center mb-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`absolute inset-0 w-full md:w-[95%] lg:w-[1000px] mx-auto h-full rounded-[2.5rem] ${activeProject.background_gradient || 'bg-white/5'} border border-white/10 overflow-hidden shadow-2xl group flex-shrink-0 cursor-default`}
                        >
                            {activeProject.cover_image_url && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity duration-500"
                                    style={{ backgroundImage: `url(${activeProject.cover_image_url})` }}
                                ></div>
                            )}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500" />

                            {/* Logo positioned top-left */}
                            <div className="absolute top-6 left-6 md:top-8 md:left-8 w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-xl p-2 flex items-center justify-center border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <img src={activeProject.logo_url || '/globe.svg'} alt={`${activeProject.title} Logo`} className="w-full h-full object-contain drop-shadow-md" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full bg-gradient-to-t from-black/95 via-black/80 to-transparent">
                                <div className="flex justify-between items-end">
                                    <div className="flex-1 mr-4 md:mr-8">
                                        <span className="text-[var(--accent-cyan)] font-mono text-xs md:text-sm tracking-widest uppercase mb-2 block">{activeProject.category}</span>
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">{activeProject.title}</h3>

                                        {/* Tech Stack & Description - Visible on Hover */}
                                        <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 md:delay-100 mt-2">
                                            <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">{activeProject.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {activeProject.tech_stack?.slice(0, 5).map((tech: string) => (
                                                    <span key={tech} className="text-[10px] md:text-xs font-mono bg-white/10 text-[var(--accent-cyan)] px-2 py-1 rounded border border-white/5 backdrop-blur-md">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <span className="text-gray-400 font-light text-sm block mt-2 group-hover:hidden transition-all duration-300">{activeProject.year}</span>
                                    </div>
                                    <Link href={`/projects/${activeProject.slug}`} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-[var(--accent-cyan)] hover:text-black transition-all duration-300 transform md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex-shrink-0 z-20 tooltip-trigger">
                                        <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* MacBook Dock - The Taskbar Wrapper */}
                <div className="w-full max-w-[100vw] overflow-x-auto no-scrollbar pt-12 pb-6 -mt-8 relative z-50">
                    <div className="mx-auto w-max px-6 py-4 bg-[rgba(255,255,255,0.05)] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4 transition-all">
                        {projects.map((project, idx) => (
                            <button
                                key={project.id}
                                onClick={() => setActiveIndex(idx)}
                                className="relative group/dock-item focus:outline-none flex-shrink-0"
                            >
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 transform origin-bottom hover:scale-125 hover:-translate-y-2 hover:bg-white/20 hover:border-white/30 hover:backdrop-blur-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] ${idx === activeIndex
                                        ? 'bg-white/20 border-white/40 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                        : 'bg-white/5 border-white/10 backdrop-blur-sm opacity-70 hover:opacity-100'
                                    }`}>
                                    <img src={project.logo_url || '/globe.svg'} alt={project.title} className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg transition-transform duration-300 group-hover/dock-item:scale-110" />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111] font-medium border border-white/10 text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover/dock-item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-[100]">
                                    {project.title}
                                    {/* Tooltip Arrow */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111] border-b border-r border-white/10 transform rotate-45"></div>
                                </div>

                                {/* Active Indicator Dot */}
                                {idx === activeIndex && (
                                    <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--accent-cyan)] md:bg-white rounded-full shadow-[0_0_8px_var(--accent-cyan)] md:shadow-[0_0_8px_white]"></div>
                                )}
                            </button>
                        ))}

                        <div className="w-[2px] h-8 md:h-10 bg-white/10 mx-2 md:mx-4 rounded-full flex-shrink-0"></div>

                        {/* Extra View All Link */}
                        <Link href="/admin/projects" className="group/alltext flex flex-col items-center justify-center flex-shrink-0">
                            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm opacity-70 hover:opacity-100 hover:bg-white/20 hover:backdrop-blur-xl transition-all duration-300 transform origin-bottom hover:scale-125 hover:-translate-y-2">
                                <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111] font-medium border border-white/10 text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover/alltext:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-[100]">
                                All Projects
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111] border-b border-r border-white/10 transform rotate-45"></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
