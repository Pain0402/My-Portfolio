"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { colors } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--bg-space", colors.bgSpace);
        root.style.setProperty("--bg-deep", colors.bgDeep);
        root.style.setProperty("--accent-purple", colors.accentPrimary); // Renaming logical mapping
        root.style.setProperty("--accent-cyan", colors.accentSecondary);
        root.style.setProperty("--accent-pink", colors.accentTertiary);
    }, [colors]);

    return <>{children}</>;
}
