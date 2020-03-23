import React, { createContext } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { kebabCase } from 'lodash';
import { usePromise, PromiseStates } from '$lib/hooks/usePromise';
import config from '$src/../config';
import { canUseDOM } from '$lib//utils';

const typekitStylesheet = `https://use.typekit.net/${config.typekitId}.css`;

//const { ffSerif, ffSans, ffMono } = require('../styles/root.scss');
const ffSerif = 'kazimir';
const ffSans = 'nimbus-sans';
const ffMono = 'anonymous-pro';

export { ffSerif, ffSans, ffMono };

// Map of font names to each font's corresponding stylesheet
export const webFonts: {
  [key in Font]: string;
} = {
  [ffSerif]: typekitStylesheet,
  [ffSans]: typekitStylesheet,
  [ffMono]: typekitStylesheet,
};

export const fontLists = {
  serif: [ffSerif, 'georgia', 'serif'],
  sans: [ffSans, 'helvetica', 'arial', 'sans-serif'],
  mono: [
    ffMono,
    '"Consolas"',
    '"Menlo"',
    '"Monaco"',
    '"Andale Mono"',
    '"Ubuntu Mono"',
    'monospace',
  ],
};

export const fonts: Fonts = Object.entries(fontLists)
  .map(([key, family]) => [key, family.join(', ')])
  .reduce(
    (prev, [key, family]) => ({
      ...prev,
      [key]: family,
    }),
    {} as Fonts
  );

const loadFonts = async () => {
  // For SSR, bail
  if (!canUseDOM()) {
    return {
      loaded: false,
      fonts: Object.keys(webFonts),
    };
  }

  const _fonts = Object.keys(webFonts).map(async key => {
    const font = new FontFaceObserver(key);
    const fontName = kebabCase(key);
    try {
      await font.load();
      return { font: fontName, loaded: true };
    } catch (errors) {
      console.error(errors);
      return { font: fontName, loaded: false };
    }
  });
  try {
    const fontStatuses = await Promise.all(_fonts);
    if (fontStatuses.some(({ loaded }) => loaded === false)) {
      return Promise.reject(
        'There was an error loading some web fonts. Reverting to fallbacks.'
      );
    }
    return {
      loaded: true,
      fonts: fontStatuses.map(({ font }) => font as Font),
    };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fontsInitialState: FontState = {
  fonts: [],
  fontsLoaded: false,
  fontsError: undefined,
  fontsLoadingState: undefined,
};

export const FontContext = createContext<FontState>(fontsInitialState);

export const FontProvider: React.FC = ({ children }) => {
  const [
    { loaded: fontsLoaded, fonts: _fonts } = {
      loaded: fontsInitialState.fontsLoaded,
      fonts: fontsInitialState.fonts,
    },
    fontsError,
    fontsLoadingState,
  ] = usePromise(loadFonts(), []);
  return (
    <FontContext.Provider
      value={{ fontsLoaded, fonts: _fonts, fontsError, fontsLoadingState }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFonts = () => {
  return React.useContext<FontState>(FontContext);
};

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface FontState {
  fonts: Font[];
  fontsLoaded: boolean;
  fontsError?: any;
  fontsLoadingState?: PromiseStates;
}

// export type Font = 'ivyjournal' | 'ivystyle-sans' | 'ibm-plex-mono';
export type Font = string;

export type Fonts = {
  [key in FontStyle]: Font;
};

export type FontStyle = 'serif' | 'sans' | 'mono';
