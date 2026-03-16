import { useState, useEffect, useCallback } from 'react';

// Hook to manage a simple dark/light theme with localStorage persistence.
export function useTheme() {
  // Determine initial theme: localStorage -> system preference -> light
  const getInitialTheme = () => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('media_tracker_theme') : null;
      if (saved === 'dark' || saved === 'light') return saved;
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    } catch {
      return 'light';
    }
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to documentElement and persist
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('media_tracker_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  // Return current theme, setter (optional) and a toggle function
  return [theme, setTheme, toggleTheme];
}
