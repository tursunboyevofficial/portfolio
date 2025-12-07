import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  neonPurple: {
    id: 'neonPurple',
    name: 'Neon Purple',
    icon: '💜',
    colors: {
      primary: '#915eff',
      secondary: '#00cea8',
      accent: '#f272c8',
      background: '#050816',
      backgroundAlt: '#0a0f1e',
      tertiary: '#151030',
      text: '#ffffff',
      textSecondary: '#aaa6c3',
    },
    gradient: 'from-[#915eff] to-[#00cea8]',
    glowColor: 'rgba(145, 94, 255, 0.5)',
  },
  neonCyan: {
    id: 'neonCyan',
    name: 'Neon Cyan',
    icon: '💙',
    colors: {
      primary: '#00d9ff',
      secondary: '#ff00ff',
      accent: '#00ff88',
      background: '#000814',
      backgroundAlt: '#001d3d',
      tertiary: '#003566',
      text: '#ffffff',
      textSecondary: '#90e0ef',
    },
    gradient: 'from-[#00d9ff] to-[#ff00ff]',
    glowColor: 'rgba(0, 217, 255, 0.5)',
  },
  neonGreen: {
    id: 'neonGreen',
    name: 'Neon Matrix',
    icon: '💚',
    colors: {
      primary: '#00ff41',
      secondary: '#39ff14',
      accent: '#ccff00',
      background: '#0d0d0d',
      backgroundAlt: '#1a1a1a',
      tertiary: '#262626',
      text: '#ffffff',
      textSecondary: '#b8ffc8',
    },
    gradient: 'from-[#00ff41] to-[#39ff14]',
    glowColor: 'rgba(0, 255, 65, 0.5)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved || 'neonPurple';
  });

  const currentTheme = themes[theme];

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);

    // Apply CSS variables
    const root = document.documentElement;
    const t = currentTheme.colors;

    root.style.setProperty('--color-primary', t.primary);
    root.style.setProperty('--color-secondary', t.secondary);
    root.style.setProperty('--color-accent', t.accent);
    root.style.setProperty('--color-background', t.background);
    root.style.setProperty('--color-background-alt', t.backgroundAlt);
    root.style.setProperty('--color-tertiary', t.tertiary);
    root.style.setProperty('--color-text', t.text);
    root.style.setProperty('--color-text-secondary', t.textSecondary);
    root.style.setProperty('--glow-color', currentTheme.glowColor);

    // Update body background
    document.body.style.backgroundColor = t.background;
  }, [theme, currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
