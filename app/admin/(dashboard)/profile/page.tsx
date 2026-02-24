export const metadata = {
    title: 'Profile Settings | Admin',
}

export default function ProfilePage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-display font-bold text-white">Profile <span className="text-gray-400">Settings</span></h1>
                <button className="px-5 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                    Save Changes
                </button>
            </div>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[400px] backdrop-blur-md">
                <p className="text-gray-400 font-mono text-sm mb-4">Profile forms will be rendered here.</p>
                <p className="text-gray-500 text-xs">Waiting for Supabase 'profile' table integration.</p>
            </div>
        </div>
    )
}
