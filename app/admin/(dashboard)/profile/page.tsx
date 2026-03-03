import { getProfile } from "@/app/actions/profile.action";
import ProfileForm from "./ProfileForm";

export const metadata = {
    title: 'About Me Settings | Admin',
}

export default async function ProfilePage() {
    const profile = await getProfile();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">About <span className="text-gray-400">Me</span></h1>
                    <p className="text-gray-500 text-sm mt-1">Edit your portfolio&apos;s About Me section</p>
                </div>
            </div>

            {profile ? (
                <ProfileForm profile={profile} />
            ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center min-h-[400px] backdrop-blur-md">
                    <p className="text-gray-400 font-mono text-sm mb-4">⚠️ Profile table not found.</p>
                    <p className="text-gray-500 text-xs mb-6">Please run the SQL migration script in Supabase first.</p>
                    <div className="bg-black/30 border border-white/10 rounded-xl p-4 max-w-lg w-full">
                        <p className="text-xs text-gray-400 font-mono">
                            Go to Supabase Dashboard → SQL Editor → New Query → <br />
                            Paste the contents of: <br />
                            <span className="text-[var(--accent-cyan)]">supabase/migrations/create_profile_table.sql</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
