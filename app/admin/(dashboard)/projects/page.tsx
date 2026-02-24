import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, FolderKanban } from "lucide-react";
import { deleteProject } from "@/app/actions/projects.action";
import Image from "next/image";
import { DeleteProjectButton } from "./DeleteProjectButton";

export const metadata = {
    title: 'Manage Projects | Admin',
};

export default async function ProjectsPage() {
    const supabase = await createClient();
    const { data: projects, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("Lỗi fetch projects:", error);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                        <FolderKanban className="w-8 h-8 text-[var(--accent-cyan)]" />
                        Project <span className="text-[var(--accent-cyan)]">Management</span>
                    </h1>
                    <p className="text-gray-400 mt-1">Manage your portfolio projects and case studies.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#00f5d4] text-black font-semibold rounded-xl hover:bg-[#00f5d4]/80 transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:shadow-[0_0_25px_rgba(0,245,212,0.5)] hover:-translate-y-0.5"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </Link>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
                {(!projects || projects.length === 0) ? (
                    <div className="p-10 flex flex-col items-center justify-center min-h-[300px]">
                        <FolderKanban className="w-16 h-16 text-gray-500 mb-4 opacity-50" />
                        <p className="text-gray-300 font-medium mb-1">No projects found.</p>
                        <p className="text-gray-500 text-sm">Click "Add New Project" to create your first portfolio entry.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-white/5 border-b border-white/10 text-xs uppercase text-gray-400 whitespace-nowrap">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Project</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Year</th>
                                    <th scope="col" className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white flex items-center gap-4 min-w-[300px]">
                                            {project.logo_url ? (
                                                <div className="w-10 h-10 rounded-lg bg-white/10 overflow-hidden flex-shrink-0 relative">
                                                    <Image src={project.logo_url} alt={project.title} fill className="object-cover" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-[var(--accent-cyan)] flex-shrink-0">
                                                    {project.title.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                {project.title}
                                                <div className="text-xs text-gray-500 font-normal truncate max-w-[250px]">{project.slug}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-white/10 px-2.5 py-1 rounded-md text-xs border border-white/5">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-gray-400">{project.year}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/projects/${project.id}`}
                                                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-[var(--accent-cyan)]/20 hover:border hover:border-[var(--accent-cyan)]/30 transition-all"
                                                    title="Edit Project"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                <DeleteProjectButton projectId={project.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
