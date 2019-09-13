import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import deepmerge from 'deepmerge';
// import { lighten, darken } from 'polished';
import colors, { ColorMap } from '$lib/colors';
import { DeepPartial } from '$lib/types';

const THEME_KEY = 'chance_the_dev_theme';

const themes: Themes = {
  default: {
    colors: {
      primary: colors.blue30,
      text: colors.black,
      lightText: colors.gray50,
      bodyBg: colors.white,
      link: colors.gray50,
      linkHover: colors.blue30,
      border: colors.gray20,
      ...colors,
    },
  },
  dark: {
    colors: {
      primary: colors.blue20,
      text: colors.white,
      lightText: colors.gray20,
      bodyBg: colors.black,
      link: colors.gray20,
      linkHover: colors.blue20,
      border: colors.gray60,
      ...colors,
    },
  },
};

const themeInitialState: ThemeContextProps = {
  theme: themes.default,
  themeName: 'default',
  setTheme: (arg: any) => ({}),
  toggleDarkMode: () => ({}),
};

const ThemeContext = createContext<ThemeContextProps>(themeInitialState);

const ThemeProvider: React.FC = ({ children }) => {
  const initializeTheme = (): ThemeNames => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(THEME_KEY) ||
        window.matchMedia('(prefers-color-scheme: dark)').matches === true
        ? 'dark'
        : 'default';
    }
    return 'default';
  };
  const [themeName, setTheme] = useState<ThemeNames>(initializeTheme);
  const theme = themes[themeName];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, themeName);
    }
  }, [themeName]);

  const toggleDarkMode = () =>
    setTheme(themeName === 'dark' ? 'default' : 'dark');

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        theme,
        setTheme,
        toggleDarkMode,
      }}
    >
      <EmotionThemeProvider
        theme={{ activeTheme: themeName, themes, ...theme }}
      >
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = (overrides?: DeepPartial<Themes>): UseThemeContext => {
  const theme = React.useContext(ThemeContext);
  const result = React.useMemo<ThemeContextProps>(
    () =>
      theme && overrides ? deepmerge(theme, overrides) : theme || overrides,
    [theme, overrides]
  );
  const { theme: _theme, ...rest } = result;
  return [_theme, rest];
};

export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  themes,
  themeInitialState,
  colors,
};

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export type ThemeNames = 'default' | 'dark';

export interface Colors extends Partial<ColorMap> {
  primary: string;
  text: string;
  lightText: string;
  bodyBg: string;
  link: string;
  linkHover: string;
  border: string;
}

export interface Theme {
  colors: Colors;
}

export type Themes = {
  [key in ThemeNames]: Theme;
};

export interface ThemeState {
  theme: Theme;
  themeName: ThemeNames;
}

export interface EmotionTheme extends Theme {
  activeTheme: ThemeNames;
  themes: Themes;
}

export interface ThemeContextProps extends ThemeState {
  setTheme(arg: ThemeNames): any;
  toggleDarkMode(): any;
}

export type UseThemeContext = [Theme, Omit<ThemeContextProps, 'theme'>];
