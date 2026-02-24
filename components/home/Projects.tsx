"use client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const ProjectCard = ({ project, i, progress, range, targetScale }: any) => {
    const scale = useTransform(progress, range, [1, targetScale]);

    // Thẻ nằm sau sẽ lùi top xuống một chút để lộ mép của thẻ trước (Stacking effect)
    const topPosition = `calc(15vh + ${i * 30}px)`;

    return (
        <div className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale, top: topPosition }}
                className={`relative w-[90vw] lg:w-[1000px] h-[70vh] rounded-[2.5rem] border border-white/10 ${project.background_gradient || 'bg-white/5'} overflow-hidden shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row group`}
            >
                {/* Info side (Left on Desktop, Bottom/Text on Mobile) */}
                <div className="relative z-10 w-full md:w-5/12 p-8 lg:p-12 flex flex-col justify-between h-full bg-gradient-to-t md:bg-gradient-to-r from-[#030014]/95 via-[#030014]/80 to-transparent md:to-transparent backdrop-blur-[2px] md:backdrop-blur-none order-2 md:order-1">
                    <div>
                        <div className="flex items-center gap-4 mb-4 md:mb-8 mt-12 md:mt-0">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl lg:rounded-2xl p-2 md:p-3 border border-white/10 shadow-lg backdrop-blur-md">
                                <img src={project.logo_url || '/globe.svg'} alt={project.title} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[var(--accent-cyan)] font-mono text-xs md:text-sm tracking-widest uppercase">{project.category}</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 leading-tight">{project.title}</h3>
                        <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 font-light">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-8 hidden md:flex">
                            {project.tech_stack?.slice(0, 4).map((tech: string) => (
                                <span key={tech} className="text-xs font-mono bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/10">
                                    {tech}
                                </span>
                            ))}
                            {project.tech_stack?.length > 4 && <span className="text-xs font-mono bg-white/5 text-gray-400 px-3 py-1.5 rounded-full border border-white/5">+{project.tech_stack.length - 4}</span>}
                        </div>
                    </div>

                    <div>
                        <Link href={`/projects/${project.slug}`} className="inline-flex items-center justify-center md:justify-start w-full md:w-auto gap-3 bg-white/10 border border-white/20 text-white backdrop-blur-md px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all group/btn">
                            View Case Study
                            <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Image Side (Right on Desktop, Background on Mobile) */}
                <div className="absolute inset-0 md:relative md:w-7/12 h-[60%] md:h-full order-1 md:order-2">
                    {project.cover_image_url && (
                        <div className="absolute inset-0 bg-cover bg-center opacity-70 md:opacity-90 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${project.cover_image_url})` }}></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-[#030014]/90 pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
};

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <section id="projects" className="relative bg-[var(--bg-space)] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6">
                    Selected <span className="text-gradient">Works</span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-6">
                    Discover my recent projects, from mobile apps to full-stack platforms.
                </p>
                {isLoading && (
                    <div className="flex justify-center items-center gap-2 text-[var(--accent-cyan)] mt-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading projects from database...</span>
                    </div>
                )}
            </div>

            <div ref={containerRef} className="relative mt-10">
                {projects.map((project, i) => {
                    const targetScale = 1 - ((projects.length - i) * 0.05);
                    return (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            i={i}
                            progress={scrollYProgress}
                            // Chia khoảng tiến độ dựa trên số lượng project
                            range={[i * (1 / projects.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
}
