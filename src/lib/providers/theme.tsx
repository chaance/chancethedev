import React, {
  useLayoutEffect,
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

export enum Themes {
  Dark = 'dark',
  Default = 'default',
}

const THEME_KEY = 'chance_the_dev_theme';

const themeInitialState: ThemeContextProps = {
  theme: Themes.Default,
  toggleDarkMode: () => ({}),
};

const ThemeContext = createContext<ThemeContextProps>(themeInitialState);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(() => {
    if (typeof window !== 'undefined') {
      let preferenceFromLocalStorage = window.localStorage.getItem(
        THEME_KEY
      ) as Themes | null;
      let preferenceFromOS = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? Themes.Dark
        : Themes.Default;

      if (
        preferenceFromLocalStorage !== Themes.Dark &&
        preferenceFromLocalStorage !== Themes.Default
      ) {
        preferenceFromLocalStorage = null;
      }

      return preferenceFromLocalStorage
        ? preferenceFromLocalStorage
        : preferenceFromOS;
    }
    return Themes.Default;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  let [, forceUpdate] = useState();
  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    let timeout = window.setTimeout(() => {
      let root = document.querySelector('html');
      root && root.setAttribute('data-initial-load', '');
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const toggleDarkMode = () =>
    setTheme(theme === Themes.Dark ? Themes.Default : Themes.Dark);

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

function addStyleTag(styles: string) {
  let css = document.createElement('style');
  css.type = 'text/css';
  if ((css as any).styleSheet) {
    (css as any).styleSheet.cssText = styles;
  } else {
    css.appendChild(document.createTextNode(styles));
  }
  document.getElementsByTagName('head')[0].appendChild(css);
  return css;
}

export { ThemeProvider, ThemeContext, useThemeContext, themeInitialState };

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////

export interface ThemeState {
  theme: Themes;
}

export interface ThemeContextProps extends ThemeState {
  toggleDarkMode(): any;
}
