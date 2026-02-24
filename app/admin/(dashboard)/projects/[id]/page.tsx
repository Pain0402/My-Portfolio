import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditProjectForm from "../EditProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const supabase = await createClient();
    const { data: project, error } = await supabase.from("projects").select("*").eq("id", id).single();

    if (error || !project) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <Link href="/admin/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--accent-cyan)] mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Projects</span>
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-white">Edit <span className="text-[var(--accent-cyan)]">Project</span></h1>
                <p className="text-gray-400 mt-2">Update the details for "{project.title}".</p>
            </div>

            <EditProjectForm project={project} />
        </div>
    );
}
