"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOut, LayoutDashboard, FolderKanban, Wrench, User, Home } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Skills", href: "/admin/skills", icon: Wrench },
    { name: "Profile", href: "/admin/profile", icon: User },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const router = useRouter();
    const pathname = usePathname();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email ?? null);
            }
        };
        getUser();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh(); // Force refresh to trigger middleware explicitly if needed
    };

    return (
        <div className="min-h-screen bg-[var(--bg-space)] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white/5 border-r border-white/10 backdrop-blur-xl flex flex-col hidden md:flex">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-white">
                        <span className="text-[var(--accent-cyan)]">Admin</span>Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-white/10 text-[var(--accent-cyan)] border border-white/10 shadow-[0_0_15px_rgba(0,245,212,0.1)]"
                                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="mb-4 px-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Logged in as</p>
                        <p className="text-sm text-gray-300 truncate" title={userEmail || ""}>
                            {userEmail || "Loading..."}
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                    <Link
                        href="/"
                        className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all border border-transparent"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--accent-purple)] rounded-full blur-[150px] opacity-10 pointer-events-none" />
                <div className="relative z-10 p-6 md:p-10 h-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
