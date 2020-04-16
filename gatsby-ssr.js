import React from 'react';
import { webFonts, FontProvider } from './src/lib/providers';
import { uniq } from 'lodash';
import './src/lib/styles/app.scss';

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    ...uniq(Object.values(webFonts)).map((val) => (
      <link key={val} rel="stylesheet" href={val} />
    )),
  ]);
};

export const wrapRootElement = ({ element }) => {
  return <FontProvider>{element}</FontProvider>;
};
