"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
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
        <section id="projects" className="relative bg-[var(--bg-space)] pt-32 pb-32 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
                    Selected <span className="text-gradient">Works</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    A showcase of my recent projects, from functional apps to creative web experiences.
                </p>
            </div>

            <div
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative flex flex-col items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Active Project Glass Card */}
                <div className="w-full h-[60vh] min-h-[500px] mb-12 relative flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className={`absolute inset-0 w-full md:w-[95%] lg:w-[1000px] mx-auto h-full rounded-[2.5rem] border border-white/10 ${activeProject.background_gradient || 'bg-white/5'} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row group`}
                        >
                            {/* Info side (Left on Desktop, Bottom/Text on Mobile) */}
                            <div className="relative z-10 w-full md:w-5/12 p-8 lg:p-12 flex flex-col justify-between h-full bg-gradient-to-t md:bg-gradient-to-r from-[#030014]/95 via-[#030014]/80 to-transparent md:to-transparent backdrop-blur-[2px] md:backdrop-blur-none order-2 md:order-1">
                                <div>
                                    <div className="flex items-center gap-4 mb-4 md:mb-6 mt-8 md:mt-0">
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl p-2 md:p-3 border border-white/10 shadow-lg backdrop-blur-md">
                                            <img src={activeProject.logo_url || '/globe.svg'} alt={activeProject.title} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-[var(--accent-cyan)] font-mono text-xs md:text-sm tracking-widest uppercase">{activeProject.category}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">{activeProject.title}</h3>
                                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 font-light">{activeProject.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-8 hidden md:flex">
                                        {activeProject.tech_stack?.slice(0, 4).map((tech: string) => (
                                            <span key={tech} className="text-xs font-mono bg-[#111111]/80 text-[var(--accent-cyan)] px-3 py-1.5 rounded-full border border-[var(--accent-cyan)]/30 backdrop-blur-md">
                                                {tech}
                                            </span>
                                        ))}
                                        {activeProject.tech_stack?.length > 4 && <span className="text-xs font-mono bg-white/5 text-gray-400 px-3 py-1.5 rounded-full border border-white/5">+{activeProject.tech_stack.length - 4}</span>}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <Link href={`/projects/${activeProject.slug}`} className="inline-flex items-center justify-center md:justify-start w-full md:w-auto gap-3 bg-[var(--accent-cyan)] border border-[var(--accent-cyan)] text-black shadow-[0_0_20px_rgba(0,245,212,0.3)] px-8 py-3.5 rounded-full font-semibold hover:bg-[var(--accent-cyan)]/90 transition-all group/btn">
                                        View Project
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Image Side (Right on Desktop, Background on Mobile) */}
                            <div className="absolute inset-0 md:relative md:w-7/12 h-[60%] md:h-full order-1 md:order-2 overflow-hidden">
                                {activeProject.cover_image_url && (
                                    <motion.div
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-90 transition-transform duration-700 hover:scale-105"
                                        style={{ backgroundImage: `url(${activeProject.cover_image_url})` }}>
                                    </motion.div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-[#030014]/20 to-[#030014]/95 pointer-events-none" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* MacBook Dock - The Taskbar */}
                <div className="fixed bottom-6 w-[90vw] md:w-auto overflow-x-auto no-scrollbar left-1/2 -translate-x-1/2 z-50 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:mt-8 px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-start md:justify-center gap-4 transition-all hover:bg-white/10 hover:border-white/20">
                    {projects.map((project, idx) => (
                        <button
                            key={project.id}
                            onClick={() => setActiveIndex(idx)}
                            className="relative group/dock-item focus:outline-none flex-shrink-0"
                        >
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 transform origin-bottom hover:scale-125 hover:-translate-y-2 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] ${idx === activeIndex
                                    ? 'bg-white/20 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                    : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
                                }`}>
                                <img src={project.logo_url || '/globe.svg'} alt={project.title} className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg transition-transform duration-300 group-hover/dock-item:scale-110" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111111] font-medium border border-white/10 text-white text-xs px-3 py-2 rounded-xl opacity-0 group-hover/dock-item:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                                {project.title}
                                {/* Tooltip Arrow */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111111] border-b border-r border-white/10 transform rotate-45"></div>
                            </div>

                            {/* Active Indicator Dot */}
                            {idx === activeIndex && (
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                            )}
                        </button>
                    ))}

                    <div className="w-[2px] h-10 bg-white/10 mx-2 rounded-full hidden md:block"></div>

                    {/* Extra View All Link */}
                    <Link href="/admin/projects" className="group/alltext hidden md:flex flex-col items-center justify-center ml-2">
                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 opacity-70 hover:opacity-100 hover:bg-white/20 transition-all duration-300 transform origin-bottom hover:scale-125 hover:-translate-y-2">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
