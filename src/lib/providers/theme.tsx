import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import useDarkMode from 'use-dark-mode';
import deepmerge from 'deepmerge';
// import { lighten, darken } from 'polished';
import colors, { ColorMap } from '$lib/colors';
import { DeepPartial } from '$lib/types';

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
  toggleDarkMode: () => ({}),
};

const ThemeContext = createContext<ThemeContextProps>(themeInitialState);

const ThemeProvider: React.FC = ({ children }) => {
  let darkMode = useDarkMode();
  let themeName: ThemeNames = darkMode.value ? 'dark' : 'default';
  console.log({ themeName });
  let theme = themes[darkMode.value ? 'dark' : 'default'];

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        theme,
        toggleDarkMode: darkMode.toggle,
      }}
    >
      <EmotionThemeProvider
        theme={{
          activeTheme: themeName,
          themes,
          ...theme,
        }}
      >
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): UseThemeContext {
  const { theme: _theme, ...rest } = useContext(ThemeContext);
  return [_theme, rest];
}

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
  toggleDarkMode(): any;
}

export type UseThemeContext = [Theme, Omit<ThemeContextProps, 'theme'>];
