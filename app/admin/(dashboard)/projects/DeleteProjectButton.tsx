"use client";

import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/projects.action";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProject(projectId);
            toast.success("Project deleted successfully");
            setShowConfirm(false);
        } catch (err: any) {
            console.error(err);
            toast.error("Error deleting project", {
                description: err.message || "Failed to delete project.",
            });
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-red-500/20 hover:border hover:border-red-500/30 transition-all group disabled:opacity-50"
                title="Delete Project"
            >
                <Trash2 className="w-4 h-4 group-hover:text-red-400" />
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-[#111] border border-white/10 p-6 rounded-3xl w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 font-display">Delete Project?</h3>
                        <p className="text-gray-400 text-sm mb-8">
                            Are you sure you want to delete this project? This action cannot be undone.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConfirm(false)}
                                disabled={isDeleting}
                                className="px-5 py-2.5 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all text-sm disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-all text-sm disabled:opacity-50 flex items-center gap-2"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
