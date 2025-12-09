
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        return (localStorage.getItem('theme') as Theme) || 'default';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Remove older classes if any
        root.classList.remove('dark', 'light');
        root.removeAttribute('data-theme');

        if (theme === 'dark') {
            root.classList.add('dark');
            root.setAttribute('data-theme', 'dark');
        } else if (theme === 'light') {
            root.classList.add('light'); // Optional, if using class based light mode
            root.setAttribute('data-theme', 'light');
        } else {
            // Default
            root.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const cycleTheme = () => {
        setTheme(prev => {
            if (prev === 'default') return 'dark';
            if (prev === 'dark') return 'light';
            return 'default';
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, cycleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within ThemeProvider");
    return context;
};
