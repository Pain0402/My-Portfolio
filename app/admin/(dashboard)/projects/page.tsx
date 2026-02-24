export const metadata = {
    title: 'Manage Projects | Admin',
}

export default function ProjectsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-white">Project <span className="text-[var(--accent-cyan)]">Management</span></h1>
                <button className="px-5 py-2.5 bg-[var(--accent-cyan)] text-black font-semibold rounded-xl hover:bg-[#00f5d4]/80 transition-colors">
                    + Add New Project
                </button>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[400px] backdrop-blur-md">
                <p className="text-gray-400 font-mono text-sm mb-4">No projects found in database.</p>
                <p className="text-gray-500 text-xs">Awaiting Giai đoạn 4: Server Actions & Form implementation.</p>
            </div>
        </div>
    )
}
