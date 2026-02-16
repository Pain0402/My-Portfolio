import Container from "@/components/ui/Container";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return (
        <main className="min-h-screen bg-[var(--bg-space)] pt-32 pb-20">
            <Container>
                <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                    <span className="text-[var(--accent-cyan)] uppercase tracking-[0.2em] font-light">
                        Selected Project
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white capitalize">
                        {slug.replace(/-/g, " ")}
                    </h1>

                    <div className="flex justify-center gap-6 mt-8">
                        <a
                            href="#"
                            target="_blank"
                            className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                        >
                            View Repository
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            className="px-6 py-3 rounded-full bg-[var(--accent-cyan)] text-black border border-[var(--accent-cyan)] font-semibold hover:bg-[var(--accent-cyan)]/80 transition-colors"
                        >
                            Live Demo
                        </a>
                    </div>
                </div>

                {/* Video Placeholder */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-card mb-20 group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                        <span className="text-white/50 text-2xl group-hover:text-white/80 transition-colors">
                            Project Video Demo Placeholder
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-light text-gray-300">
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-display font-semibold text-white">Overview</h2>
                        <p className="leading-relaxed">
                            Detailed description of the project goes here. Explain the problem, the solution, and the impact.
                            This section is where you tell the story of how you built {slug}.
                        </p>
                        <p className="leading-relaxed">
                            Highlight key challenges faced during development and how they were overcome using modern best practices.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {["Next.js", "TypeScript", "Tailwind CSS", "Supabase"].map((tech) => (
                                    <span key={tech} className="px-3 py-1 text-sm bg-white/5 rounded-full border border-white/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Year</h3>
                            <p>2024</p>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

export async function generateStaticParams() {
    return [
        { slug: "comics-reading-application" },
        { slug: "techsage" },
        { slug: "fashion-ecommerce" },
        { slug: "cineverse" },
    ];
}
