import React, { createContext, useContext, useState, useEffect } from 'react';
import { DeepPartial } from '$lib/types';

const THEME_KEY = 'chance_the_dev_theme';

const themeInitialState: ThemeContextProps = {
  theme: 'default',
  toggleDarkMode: () => ({}),
};

const ThemeContext = createContext<ThemeContextProps>(themeInitialState);

const ThemeProvider: React.FC = ({ children }) => {
  const initializeTheme = (): Themes => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(THEME_KEY) ||
        window.matchMedia('(prefers-color-scheme: dark)').matches === true
        ? 'dark'
        : 'default';
    }
    return 'default';
  };
  const [theme, setTheme] = useState<Themes>(initializeTheme);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const toggleDarkMode = () => setTheme(theme === 'dark' ? 'default' : 'dark');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function useThemeContext() {
  return useContext(ThemeContext);
}

export { ThemeProvider, ThemeContext, useThemeContext, themeInitialState };

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export type Themes = 'default' | 'dark';

export interface ThemeState {
  theme: Themes;
}

export interface ThemeContextProps extends ThemeState {
  toggleDarkMode(): any;
}
