import Container from "@/components/ui/Container";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import ProjectGallery from "@/components/project/ProjectGallery";
import { createClient } from "@/utils/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch from Supabase
    const supabase = await createClient();
    const { data: project, error } = await supabase.from("projects").select("*").eq("slug", slug).single();

    if (error || !project) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--bg-space)] pt-32 pb-20">
            <Container>
                {/* Back Button */}
                <Link href="/#projects" className="inline-flex items-center text-gray-400 hover:text-[var(--accent-cyan)] transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Projects
                </Link>

                <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                    <span className="text-[var(--accent-cyan)] uppercase tracking-[0.2em] font-light font-mono text-sm">
                        {project.category} • {project.year}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white capitalize leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex justify-center gap-6 mt-10">
                        {project.repo_url && (
                            <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2"
                            >
                                <Github className="w-5 h-5" />
                                View Repository
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 rounded-full bg-[var(--accent-cyan)] text-black border border-[var(--accent-cyan)] font-semibold hover:bg-[var(--accent-cyan)]/80 transition-all hover:scale-105 flex items-center gap-2"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>

                {/* Media Gallery / Video Carousel */}
                <div className="mb-20">
                    {project.media && project.media.length > 0 ? (
                        <ProjectGallery media={project.media as any[]} projectTitle={project.title} />
                    ) : (
                        /* Fallback Placeholder */
                        <div className={`relative w-full aspect-video rounded-3xl overflow-hidden glass-card group ${project.img}`}>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] group-hover:bg-black/10 transition-colors">
                                <div className="text-center p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                                    <img src={project.logo_url || '/globe.svg'} alt={`${project.title} Logo`} className="w-24 h-24 object-contain mx-auto mb-4" />
                                    <span className="text-white/80 text-xl font-light">
                                        Project Gallery Coming Soon
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-light text-gray-300">
                    <div className="md:col-span-2 space-y-16">
                        {/* Overview */}
                        <div>
                            <h2 className="text-3xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                                <span className="text-[var(--accent-purple)]">/</span> The Story
                            </h2>
                            <p className="leading-8 text-lg text-gray-300">
                                {project.overview}
                            </p>
                        </div>

                        {/* Problem Statement */}
                        {project.problem_statement && (
                            <div>
                                <h2 className="text-3xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="text-[var(--accent-pink)]">/</span> The Problem
                                </h2>
                                <p className="leading-8 text-lg text-gray-300">
                                    {project.problem_statement}
                                </p>
                            </div>
                        )}

                        {/* System Architecture */}
                        {project.architecture && (
                            <div>
                                <h2 className="text-3xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="text-[var(--accent-cyan)]">/</span> System Architecture
                                </h2>
                                <p className="leading-8 text-lg text-gray-300">
                                    {project.architecture}
                                </p>
                            </div>
                        )}

                        {/* Challenges & Solutions */}
                        {project.challenges && (
                            <div>
                                <h2 className="text-3xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="text-orange-500">/</span> Challenges & Solutions
                                </h2>
                                <p className="leading-8 text-lg text-gray-300">
                                    {project.challenges}
                                </p>
                            </div>
                        )}

                        {/* Key Learnings */}
                        {project.learnings && (
                            <div>
                                <h2 className="text-3xl font-display font-semibold text-white mb-6 flex items-center gap-3">
                                    <span className="text-green-400">/</span> Key Learnings
                                </h2>
                                <p className="leading-8 text-lg text-gray-300">
                                    {project.learnings}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-10">
                        <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack?.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 text-sm bg-white/5 rounded-md border border-white/10 text-[var(--accent-cyan)] font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-2xl border border-white/5 bg-white/5">
                            <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Project Info</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Year</span>
                                    <span className="text-white">{project.year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Category</span>
                                    <span className="text-white">{project.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

export async function generateStaticParams() {
    const supabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: projects } = await supabase.from("projects").select("slug");
    return projects?.map((project: { slug: string }) => ({
        slug: project.slug,
    })) || [];
}
