import React from 'react';
import { whatInput } from './src/lib/utils';
import { FontProvider, ThemeProvider } from './src/lib/providers';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <FontProvider>{element}</FontProvider>
    </ThemeProvider>
  );
};

export const onClientEntry = () => {
  if (typeof whatInput === 'function') {
    whatInput();
  }
};
