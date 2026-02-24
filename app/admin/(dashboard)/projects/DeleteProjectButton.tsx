"use client";

import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/projects.action";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            setIsDeleting(true);
            try {
                await deleteProject(projectId);
                toast.success("Project deleted successfully");
            } catch (err: any) {
                console.error(err);
                toast.error("Error deleting project", {
                    description: err.message || "Failed to delete project.",
                });
                setIsDeleting(false);
            }
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-red-500/20 hover:border hover:border-red-500/30 transition-all group disabled:opacity-50"
            title="Delete Project"
        >
            <Trash2 className="w-4 h-4 group-hover:text-red-400" />
        </button>
    );
}
