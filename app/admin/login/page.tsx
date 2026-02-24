"use client";

import { createClient } from "@/utils/supabase/client";
import { Github } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginContent() {
    const supabase = createClient();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            console.error("Login error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    Admin <span className="text-[var(--accent-cyan)]">Portal</span>
                </h1>
                <p className="text-gray-400 text-sm">Sign in to manage your portfolio content.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {error}
                </div>
            )}

            <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white text-black font-medium transition-all hover:bg-gray-200 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Github className="w-5 h-5" />
                )}
                <span>{isLoading ? "Connecting..." : "Continue with GitHub"}</span>
            </button>

            <p className="mt-6 text-center text-xs text-gray-500">
                Secure access restricted to authorized personnel.
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-space)] p-4">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-purple)] rounded-full blur-[150px] opacity-20 pointer-events-none" />

            <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                <LoginContent />
            </Suspense>
        </div>
    );
}
