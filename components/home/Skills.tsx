"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import { X, Code2, Server, Database, Smartphone, Cloud, Cpu } from "lucide-react";

interface Skill {
    name: string;
    category: "Frontend" | "Backend" | "Database" | "Mobile" | "DevOps" | "AI";
    descriptor: string;
    level: "Advanced" | "Intermediate";
    projectsCount: number;
    icon: any;
    details: {
        responsibilities: string[];
        pattern: string;
    };
}

const skills: Skill[] = [
    // Frontend
    {
        name: "Vue 3",
        category: "Frontend",
        descriptor: "Reactive UI with Composition API",
        level: "Advanced",
        projectsCount: 5,
        icon: Code2,
        details: {
            responsibilities: ["Component Architecture", "State Management (Pinia)", "Performance Optimization"],
            pattern: "Composition API, Atomic Design"
        }
    },
    {
        name: "React / Next.js",
        category: "Frontend",
        descriptor: "SSR, Server Components & Hooks",
        level: "Advanced",
        projectsCount: 4,
        icon: Code2,
        details: {
            responsibilities: ["SEO Optimization", "Server-Side Rendering", "Client-Side Routing"],
            pattern: "App Router, Server Actions"
        }
    },
    // Backend
    {
        name: "Node.js",
        category: "Backend",
        descriptor: "Scalable REST APIs & Microservices",
        level: "Advanced",
        projectsCount: 6,
        icon: Server,
        details: {
            responsibilities: ["API Design", "Middleware Development", "Async processing"],
            pattern: "MVC, Event-Driven Architecture"
        }
    },
    {
        name: ".NET 8",
        category: "Backend",
        descriptor: "High-performance Web APIs",
        level: "Intermediate",
        projectsCount: 2,
        icon: Server,
        details: {
            responsibilities: ["Entity Framework Core", "Dependency Injection", "Authentication"],
            pattern: "Clean Architecture, CQRS"
        }
    },
    // Database
    {
        name: "PostgreSQL",
        category: "Database",
        descriptor: "Complex Queries & Optimization",
        level: "Advanced",
        projectsCount: 5,
        icon: Database,
        details: {
            responsibilities: ["Schema Design", "Indexing Strategy", "JSONB Data Handling"],
            pattern: "Relational Modeling, Normalization"
        }
    },
    {
        name: "Supabase",
        category: "Database",
        descriptor: "BaaS with Realtime & Edge Functions",
        level: "Advanced",
        projectsCount: 3,
        icon: Cloud,
        details: {
            responsibilities: ["Row Level Security (RLS)", "Realtime Subscriptions", "Auth Integration"],
            pattern: "Serverless, BaaS"
        }
    },
    // Mobile
    {
        name: "Flutter",
        category: "Mobile",
        descriptor: "Cross-platform Native Performance",
        level: "Intermediate",
        projectsCount: 2,
        icon: Smartphone,
        details: {
            responsibilities: ["UI Implementation", "State Management (Riverpod)", "Native Integration"],
            pattern: "BLoC / Riverpod, Clean Architecture"
        }
    },
    // DevOps/Other
    {
        name: "Docker",
        category: "DevOps",
        descriptor: "Containerization & Deployment",
        level: "Intermediate",
        projectsCount: 3,
        icon: Cpu,
        details: {
            responsibilities: ["Dockerfile Optimization", "Compose Orchestration", "CI/CD Pipelines"],
            pattern: "Microservices Containerization"
        }
    }
];

export default function Skills() {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

    return (
        <section id="skills" className="py-32 relative min-h-screen">
            <Container>
                {/* Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white">
                        Tech <span className="text-gradient-cyan inline-block animate-pulse-slow">Arsenal</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Technologies I use to build <span className="text-white font-medium">scalable</span> and <span className="text-white font-medium">modern</span> applications.
                    </p>
                </div>

                {/* Categorized Grid */}
                <div className="space-y-16">
                    {["Frontend", "Backend", "Database", "Mobile", "DevOps"].map((category) => {
                        const categorySkills = skills.filter((s) => {
                            if (category === "Database") {
                                return s.category === "Database" || (s.category as any) === "BaaS";
                            }
                            return s.category === category;
                        });

                        if (categorySkills.length === 0) return null;

                        return (
                            <div key={category}>
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-2xl font-display font-semibold text-white/80">{category}</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categorySkills.map((skill) => (
                                        <motion.div
                                            layoutId={`card-${skill.name}`}
                                            key={skill.name}
                                            onClick={() => setSelectedSkill(skill)}
                                            whileHover={{ y: -5, borderColor: "rgba(0, 245, 212, 0.4)" }}
                                            className="group relative bg-[#0f0f1a]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 cursor-pointer overflow-hidden transition-all duration-300"
                                        >
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--accent-cyan)]/30 transition-colors">
                                                        <skill.icon className="w-6 h-6 text-[var(--accent-cyan)]" />
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-xs font-mono px-2 py-1 rounded-full border ${skill.level === 'Advanced' ? 'border-[var(--accent-purple)]/50 text-[var(--accent-purple)] bg-[var(--accent-purple)]/10' : 'border-blue-500/50 text-blue-400 bg-blue-500/10'}`}>
                                                            {skill.level}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-cyan)] transition-colors">{skill.name}</h4>
                                                <p className="text-sm text-gray-400 mb-6 flex-grow">{skill.descriptor}</p>

                                                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 pt-4 border-t border-white/5">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    Used in {skill.projectsCount} Projects
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedSkill && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`card-${selectedSkill.name}`}
                            className="w-full max-w-lg bg-[#0a0a12] border border-[var(--accent-cyan)]/30 rounded-3xl p-8 relative z-10 shadow-2xl shadow-[var(--accent-cyan)]/10"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedSkill(null); }}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6 flex items-center gap-4">
                                <div className="p-4 rounded-2xl bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30">
                                    <selectedSkill.icon className="w-8 h-8 text-[var(--accent-cyan)]" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-white italic">{selectedSkill.name}</h3>
                                    <span className="text-gray-400 text-sm">{selectedSkill.category} Architect</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-mono">Architecture Pattern</h4>
                                    <p className="text-white text-lg border-l-2 border-[var(--accent-purple)] pl-4">
                                        {selectedSkill.details.pattern}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3 font-mono">Key Responsibilities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSkill.details.responsibilities.map((resp, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm">
                                                {resp}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Mastery Level</span>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((lvl) => (
                                            <div key={lvl} className={`w-8 h-1.5 rounded-full ${lvl <= (selectedSkill.level === 'Advanced' ? 5 : 3) ? 'bg-[var(--accent-cyan)]' : 'bg-gray-800'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
