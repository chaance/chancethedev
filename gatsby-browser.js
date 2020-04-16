import React, { useEffect } from 'react';
import { whatInput } from './src/lib/utils';
import { FontProvider } from './src/lib/providers';
import './src/lib/styles/app.scss';

export const wrapRootElement = ({ element }) => {
  return <FontProvider>{element}</FontProvider>;
};

export const onClientEntry = () => {
  if (typeof whatInput === 'function') {
    whatInput();
  }
};
