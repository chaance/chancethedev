import React from 'react';
import { webFonts, FontProvider, ThemeProvider } from './src/lib/providers';
import { uniq } from 'lodash';
import { Themes } from './src/lib/providers/theme';
import './src/lib/styles/app.scss';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    ...uniq(Object.values(webFonts)).map(val => (
      <link key={val} rel="stylesheet" href={val} />
    )),
  ]);
  setPreBodyComponents([
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            window.__onThemeChange = function() {};
            var storageKey = 'chance_the_dev_theme';
            var themes = ['${Themes.Dark}', '${Themes.Default}'];
            function setTheme(newTheme) {
              window.__theme = newTheme;
              preferredTheme = newTheme;
              themes.forEach(function(theme) {
                if (theme !== preferredTheme) {
                  document.body.classList.remove(theme);
                }
                document.body.classList.add(preferredTheme);
              })
              window.__onThemeChange(newTheme);
            }
            var preferredTheme;
            try {
              preferredTheme = localStorage.getItem(storageKey);
            } catch (err) { }
            window.__setPreferredTheme = function(newTheme) {
              setTheme(newTheme);
              try {
                localStorage.setItem(storageKey, newTheme);
              } catch (err) {}
            }
            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            darkQuery.addListener(function(e) {
              window.__setPreferredTheme(e.matches ? '${Themes.Dark}' : '${Themes.Default}')
            });
            setTheme(preferredTheme || (darkQuery.matches ? '${Themes.Dark}' : '${Themes.Default}'));
          })();
        `,
      }}
    />,
  ]);
};

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <FontProvider>{element}</FontProvider>
    </ThemeProvider>
  );
};
