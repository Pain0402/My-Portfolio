"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject, uploadMedia } from "@/app/actions/projects.action";
import { ArrowLeft, Upload, Loader2, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const GRADIENTS = [
    { name: "Purple-Blue", class: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900" },
    { name: "Emerald-Cyan", class: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900" },
    { name: "Rose-Purple", class: "bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900" },
    { name: "Amber-Red", class: "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900" },
    { name: "Slate-Black", class: "bg-gradient-to-br from-slate-800 via-gray-900 to-black" },
];

export default function EditProjectForm({ project }: { project: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Fallback if background_gradient not set
    const initialGradient = project.background_gradient || GRADIENTS[0].class;

    const [selectedGradient, setSelectedGradient] = useState(initialGradient);

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(project.logo_url || null);

    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(project.cover_image_url && project.cover_image_url.startsWith('http') ? project.cover_image_url : null);

    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        if (type === 'logo') {
            setLogoFile(file);
            setLogoPreview(previewUrl);
        } else {
            setCoverFile(file);
            setCoverPreview(previewUrl);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formElement = e.currentTarget;
            const textFormData = new FormData(formElement);

            // Upload Logo if new file selected
            let finalLogoUrl = project.logo_url;
            if (logoFile) {
                const logoData = new FormData();
                logoData.append("file", logoFile);
                finalLogoUrl = await uploadMedia(logoData);
            }

            // Upload Cover if new file selected
            let finalCoverUrl = project.cover_image_url;
            if (coverFile) {
                const coverData = new FormData();
                coverData.append("file", coverFile);
                finalCoverUrl = await uploadMedia(coverData);
            }

            if (finalLogoUrl) textFormData.set("logo_url", finalLogoUrl);
            if (finalCoverUrl) textFormData.set("cover_image_url", finalCoverUrl);

            textFormData.set("background_gradient", selectedGradient);

            await updateProject(project.id, textFormData);
        } catch (err: any) {
            if (err.message && err.message.includes('NEXT_REDIRECT')) {
                return;
            }
            console.error(err);
            setError(err.message || "Failed to edit project.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Basic Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-xl font-display font-semibold text-white mb-6 border-b border-white/10 pb-4">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Project Title <span className="text-red-400">*</span></label>
                        <input defaultValue={project.title} required type="text" name="title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">URL Slug <span className="text-red-400">*</span></label>
                        <input defaultValue={project.slug} required type="text" name="slug" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category <span className="text-red-400">*</span></label>
                        <select defaultValue={project.category} required name="category" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all">
                            <option value="Fullstack">Fullstack Application</option>
                            <option value="Frontend">Frontend Development</option>
                            <option value="Backend">Backend & API</option>
                            <option value="Mobile">Mobile App</option>
                            <option value="AI">AI Integration</option>
                            <option value="Web App">Web App</option>
                            <option value="E-commerce">E-commerce</option>
                            <option value="AI SaaS Platform">AI SaaS Platform</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Year <span className="text-red-400">*</span></label>
                        <input defaultValue={project.year} required type="text" name="year" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all" />
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium text-gray-300">Short Description</label>
                    <textarea defaultValue={project.description} name="description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all"></textarea>
                </div>

                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium text-gray-300">Tech Stack (comma separated)</label>
                    <input defaultValue={project.tech_stack?.join(', ')} type="text" name="tech_stack" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all" />
                </div>
            </div>

            {/* Media */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-xl font-display font-semibold text-white mb-6 border-b border-white/10 pb-4">Media & Design</h2>

                <div className="mb-8 space-y-3">
                    <label className="text-sm font-medium text-gray-300">Background Gradient <span className="text-gray-500 font-normal">(Used as card background)</span></label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {GRADIENTS.map((grad) => (
                            <button
                                key={grad.name}
                                type="button"
                                onClick={() => setSelectedGradient(grad.class)}
                                className={`relative h-24 rounded-xl border-2 transition-all overflow-hidden ${selectedGradient === grad.class ? 'border-[var(--accent-cyan)] scale-105 shadow-[0_0_15px_rgba(0,245,212,0.3)]' : 'border-white/10 hover:border-white/30'}`}
                            >
                                <div className={`absolute inset-0 ${grad.class}`}></div>
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-xs text-center text-white backdrop-blur-sm truncate">
                                    {grad.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">Project Logo</label>
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-[var(--accent-cyan)]/50 transition-all relative overflow-hidden group/logo">
                            {logoPreview ? (
                                <Image src={logoPreview} alt="Logo preview" fill className="object-contain p-2" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <ImageIcon className="w-8 h-8 text-gray-500 mb-3 group-hover/logo:text-[var(--accent-cyan)] transition-colors" />
                                    <p className="text-sm text-gray-500"><span className="font-semibold text-gray-300">Click to upload</span> or drag and drop</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                        </label>
                    </div>

                    {/* Cover Upload */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300">Cover Image</label>
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-[var(--accent-cyan)]/50 transition-all relative overflow-hidden group/cover">
                            {coverPreview ? (
                                <Image src={coverPreview} alt="Cover preview" fill className="object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 text-gray-500 mb-3 group-hover/cover:text-[var(--accent-cyan)] transition-colors" />
                                    <p className="text-sm text-gray-500"><span className="font-semibold text-gray-300">Click to upload</span> or drag and drop</p>
                                </div>
                            )}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
                        </label>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-xl font-display font-semibold text-white mb-6 border-b border-white/10 pb-4">External Links</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">GitHub Repository URL</label>
                        <input defaultValue={project.repo_url} type="url" name="repo_url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Live Demo URL</label>
                        <input defaultValue={project.demo_url} type="url" name="demo_url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all" />
                    </div>
                </div>
            </div>

            {/* Detailed Content */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md">
                <h2 className="text-xl font-display font-semibold text-white mb-6 border-b border-white/10 pb-4">Detailed Content</h2>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Overview</label>
                        <textarea defaultValue={project.overview} name="overview" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all font-mono text-sm"></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Problem Statement</label>
                        <textarea defaultValue={project.problem_statement} name="problem_statement" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all font-mono text-sm"></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Architecture & Technical Decisions</label>
                        <textarea defaultValue={project.architecture} name="architecture" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all font-mono text-sm"></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Key Learnings</label>
                        <textarea defaultValue={project.learnings} name="learnings" rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--accent-cyan)] transition-all font-mono text-sm"></textarea>
                    </div>
                </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-end gap-4">
                <Link href="/admin/projects" className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 bg-[var(--accent-cyan)] text-black font-semibold rounded-xl hover:bg-[#00f5d4]/80 transition-all disabled:opacity-70 disabled:pointer-events-none shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:shadow-[0_0_25px_rgba(0,245,212,0.5)]"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {isLoading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
