export const metadata = {
    title: 'Manage Skills | Admin',
}

export default function SkillsPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-white">Tech <span className="text-[var(--accent-purple)]">Arsenal</span></h1>
                <button className="px-5 py-2.5 bg-[#7b2cbf] text-white font-semibold rounded-xl hover:bg-[#7b2cbf]/80 transition-colors">
                    + Add New Skill
                </button>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[400px] backdrop-blur-md">
                <p className="text-gray-400 font-mono text-sm mb-4">No skills found in database.</p>
                <p className="text-gray-500 text-xs">Waiting for Supabase 'skills' table integration.</p>
            </div>
        </div>
    )
}
