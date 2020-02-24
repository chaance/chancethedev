import React from 'react';
import { webFonts, FontProvider, ThemeProvider } from './src/lib/providers';
import { uniq } from 'lodash';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    ...uniq(Object.values(webFonts)).map(val => (
      <link key={val} rel="stylesheet" href={val} />
    )),
  ]);
};

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <FontProvider>{element}</FontProvider>
    </ThemeProvider>
  );
};
