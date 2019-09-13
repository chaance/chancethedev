import React from 'react';
// import Helmet from 'react-helmet';
// import cx from 'classnames';
import { FontProvider, ThemeProvider } from './src/lib/providers';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <FontProvider>{element}</FontProvider>
    </ThemeProvider>
  );
};
