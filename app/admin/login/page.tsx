"use client";

import { createClient } from "@/utils/supabase/client";
import { Mail, Shield, ArrowRight, Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

// Hardcoded personal email of the owner
const ADMIN_EMAIL = "tranhuugiang1213@gmail.com";

function LoginContent() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorMsg = searchParams.get("error");

    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSendMagicLink = async () => {
        setIsLoading(true);
        // Supabase built-in Magic Link OTP
        const { error } = await supabase.auth.signInWithOtp({
            email: ADMIN_EMAIL,
            options: {
                shouldCreateUser: false, // Prevents creating a new user if it doesn't exist
                emailRedirectTo: `${window.location.origin}/auth/callback?next=/hub`, // Callback to exchange code for session
            }
        });

        if (error) {
            console.error("Login error:", error);
            toast.error(error.message);
        } else {
            setIsEmailSent(true);
            toast.success(`Magic Link sent to your email!`);
        }
        setIsLoading(false);
    };

    return (
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(76,201,240,0.1)]">
            <div className="text-center mb-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-[#0a0a12] border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent-cyan)]/20">
                    {isEmailSent ? (
                        <CheckCircle2 className="w-8 h-8 text-green-400" />
                    ) : (
                        <Shield className="w-8 h-8 text-[var(--accent-cyan)]" />
                    )}
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    {isEmailSent ? "Check Your Mail" : "Restricted "}
                    {!isEmailSent && <span className="text-[var(--accent-cyan)]">Area</span>}
                </h1>
                <p className="text-gray-400 text-sm">
                    {isEmailSent
                        ? `A secure sign-in link has been sent to ${ADMIN_EMAIL}.`
                        : "Authorized personnel only. Request a Magic Link to proceed."}
                </p>
            </div>

            {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                    {errorMsg}
                </div>
            )}

            {!isEmailSent ? (
                <button
                    onClick={handleSendMagicLink}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-white font-semibold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none group"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Mail className="w-5 h-5" />
                    )}
                    <span>{isLoading ? "Sending Link..." : "Send Magic Link"}</span>
                </button>
            ) : (
                <div className="flex flex-col gap-4">
                    <p className="text-center text-gray-300 text-sm bg-black/30 p-4 border border-white/10 rounded-xl">
                        Click the secure link in your email to automatically sign in.
                    </p>
                    <button
                        type="button"
                        onClick={() => setIsEmailSent(false)}
                        className="text-gray-500 text-xs hover:text-white transition-colors mt-2"
                    >
                        Did not receive? Click here to try again
                    </button>
                </div>
            )}

            <p className="mt-8 text-center text-[10px] uppercase tracking-widest text-gray-600 font-mono">
                System Security v2.1
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-space)] p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-cyan)] rounded-full blur-[200px] opacity-10 pointer-events-none animate-pulse" />

            {/* Grid background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <Suspense fallback={<div className="text-white text-center flex gap-2"><Loader2 className="animate-spin" /> Loading Security Mod...</div>}>
                <LoginContent />
            </Suspense>
        </div>
    );
}
