import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeName = 'galaxy' | 'spiderman';

export interface ThemeColors {
    bgSpace: string;
    bgDeep: string;
    accentPrimary: string;   // Was purple/red
    accentSecondary: string; // Was cyan/blue
    accentTertiary: string;  // Was pink/dark blue
}

export const themes: Record<ThemeName, ThemeColors> = {
    galaxy: {
        bgSpace: '#030014',
        bgDeep: '#0a0a0a',
        accentPrimary: '#7b2cbf', // Purple
        accentSecondary: '#00f5d4', // Cyan
        accentTertiary: '#f72585', // Pink
    },
    spiderman: {
        bgSpace: '#020617', // Very dark blue/black for space
        bgDeep: '#0f172a', // Slate 900
        accentPrimary: '#ef4444', // Red 500
        accentSecondary: '#3b82f6', // Blue 500
        accentTertiary: '#1e3a8a', // Blue 900
    }
};

interface ThemeState {
    themeName: ThemeName;
    colors: ThemeColors;
    setTheme: (name: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            themeName: 'galaxy',
            colors: themes.galaxy,
            setTheme: (name) => set({ themeName: name, colors: themes[name] }),
        }),
        {
            name: 'portfolio-theme-storage',
        }
    )
);
