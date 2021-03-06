import React, { useEffect } from 'react';
import { whatInput } from './src/lib/utils';
import { FontProvider, ThemeProvider } from './src/lib/providers';
import './src/lib/styles/app.scss';

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
