export const metadata = {
    title: 'Admin Dashboard | Creative Portfolio',
}

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-display font-bold text-white mb-2">Welcome Back!</h1>
                <p className="text-gray-400">Here's an overview of your portfolio content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder Stat Cards */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2 font-mono">Total Projects</h3>
                    <p className="text-4xl font-display font-bold text-white">0</p>
                    <div className="mt-4 text-xs text-gray-500">Awaiting database connection...</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2 font-mono">Tech Skills</h3>
                    <p className="text-4xl font-display font-bold text-white">0</p>
                    <div className="mt-4 text-xs text-gray-500">Awaiting database connection...</div>
                </div>

                <div className="bg-white/5 border-t-2 border-t-[var(--accent-cyan)] border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,245,212,0.1)]">
                    <h3 className="text-[var(--accent-cyan)] flex items-center gap-2 text-sm uppercase tracking-wider mb-2 font-mono">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse"></span>
                        System Status
                    </h3>
                    <p className="text-2xl font-display font-semibold text-white">Online</p>
                    <div className="mt-4 text-xs text-green-400">Supabase Connected</div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                <h2 className="text-2xl font-display font-bold text-white mb-4">Quick Limits</h2>
                <ul className="list-disc pl-5 text-gray-400 space-y-2">
                    <li>Create the <code className="bg-white/10 px-1 py-0.5 rounded text-[var(--accent-cyan)]">projects</code> and <code className="bg-white/10 px-1 py-0.5 rounded text-[var(--accent-cyan)]">skills</code> tables in your Supabase dashboard.</li>
                    <li>We will add the detailed management pages next!</li>
                </ul>
            </div>
        </div>
    )
}
