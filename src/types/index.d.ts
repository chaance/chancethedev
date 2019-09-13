/* eslint-disable no-undef */
declare module 'gatsby-plugin-transition-link' {
  // TODO: Add real type declarations. We're just stopping errors for now
  export interface TransitionLinkProps<P, S> {
    [key: string]: any;
  }

  export class TransitionLink<
    P extends TransitionLinkProps<P, S>,
    S = any
  > extends React.Component<TransitionLinkProps<P, S>> {}

  export class TransitionState<
    P extends TransitionLinkProps<P, S>,
    S = any
  > extends React.Component<TransitionLinkProps<P, S>> {}
}

declare module 'gatsby-plugin-mdx' {
  export interface MDXRendererProps {
    children: React.ReactNode;
    components?: { wrapper: React.ReactNode };
    scope?: any;
  }

  export class MDXRenderer<
    P extends MDXRendererProps,
    S = any
  > extends React.Component<P, S> {}
}

declare module '@mdx-js/react' {
  // https://github.com/mdx-js/mdx/blob/master/packages/babel-plugin-html-attributes-to-jsx/translations.js
  export interface MDXComponents {
    [key: string]: React.Component<any, any> | React.FC<any>;
  }
  export interface MDXProviderProps {
    children: React.ReactNode;
    components: { wrapper: React.ReactNode };
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}

declare module 'react-helmet' {
  type LinkProps = JSX.IntrinsicElements['link'];

  type MetaProps = JSX.IntrinsicElements['meta'];

  interface TagUpdates {
    baseTag: Array<any>;
    linkTags: Array<HTMLLinkElement>;
    metaTags: Array<HTMLMetaElement>;
    noscriptTags: Array<any>;
    scriptTags: Array<HTMLScriptElement>;
    styleTags: Array<HTMLStyleElement>;
  }

  export interface HelmetProps {
    async?: boolean;
    base?: any;
    bodyAttributes?: Object;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: any;
    onChangeClientState?: (
      newState: any,
      addedTags: TagUpdates,
      removedTags: TagUpdates
    ) => void;
    link?: LinkProps[];
    meta?: MetaProps[];
    noscript?: Array<any>;
    script?: Array<any>;
    style?: Array<any>;
    title?: string;
    titleAttributes?: Object;
    titleTemplate?: string;
  }

  export class Helmet extends React.Component<HelmetProps> {
    static peek(): HelmetData;
    static rewind(): HelmetData;
    static renderStatic(): HelmetData;
    static canUseDOM: boolean;
  }

  export interface HelmetData {
    base: HelmetDatum;
    bodyAttributes: HelmetHTMLBodyDatum;
    htmlAttributes: HelmetHTMLElementDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    noscript: HelmetDatum;
    script: HelmetDatum;
    style: HelmetDatum;
    title: HelmetDatum;
    titleAttributes: HelmetDatum;
  }

  export interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any>;
  }

  export interface HelmetHTMLBodyDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLBodyElement>;
  }

  export interface HelmetHTMLElementDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLElement>;
  }

  export const peek: () => HelmetData;
  export const rewind: () => HelmetData;
  export const renderStatic: () => HelmetData;
  export const canUseDOM: boolean;
  export default Helmet;
}

declare module '@chancethedev/colors' {
  export type Blues = 10 | 20 | 30 | 50 | 40 | 60;

  export type Greens = 10 | 20 | 30 | 40 | 50 | 60;

  export type Grays = 10 | 20 | 30 | 40 | 50 | 60;

  export type Reds = 10 | 20 | 30 | 40 | 50 | 60;

  export type Yellows = 10 | 20 | 30 | 40 | 50 | 60;

  export type Blacks = 100;

  export type Whites = 0;

  export type ColorKeys =
    | Blacks
    | Blues
    | Grays
    | Greens
    | Reds
    | Whites
    | Yellows;

  export type Colors = {
    [key in ColorKeys]: {
      [i in key]: string;
    };
  };

  export const colors: Colors;
  export const rgba: (hexcode: string, opacity: number) => string;
  export const black: string;
  export const black100: string;
  export const blue: string;
  export const blue10: string;
  export const blue20: string;
  export const blue30: string;
  export const blue50: string;
  export const blue40: string;
  export const blue60: string;
  export const gray: string;
  export const gray10: string;
  export const gray20: string;
  export const gray30: string;
  export const gray40: string;
  export const gray50: string;
  export const gray60: string;
  export const green: string;
  export const green10: string;
  export const green20: string;
  export const green30: string;
  export const green40: string;
  export const green50: string;
  export const green60: string;
  export const red: string;
  export const red10: string;
  export const red20: string;
  export const red30: string;
  export const red40: string;
  export const red50: string;
  export const red60: string;
  export const white: string;
  export const white0: string;
  export const yellow: string;
  export const yellow10: string;
  export const yellow20: string;
  export const yellow30: string;
  export const yellow40: string;
  export const yellow50: string;
  export const yellow60: string;
}

declare module '$src/../config' {
  export type Author = {
    id: string;
    name: string;
    email: string;
    bio?: string;
  };
  export interface Config {
    pathPrefix: string;
    siteTitle: string;
    siteTitleAlt: string;
    siteTitleShort: string;
    siteUrl: string;
    siteLanguage: 'en';
    siteLogo: string;
    siteDescription: string;
    author: Author;
    organization: string;

    siteFBAppID?: string;
    itunesAppId: string;
    userTwitter: string;
    ogSiteName: string;
    ogLanguage: 'en_US';
    typekitId: string;
    podcastID: string;

    themeColor: string;
    backgroundColor: string;

    twitter: string;
    twitterHandle: string;
    github: string;
    stackOverflow: string;
    linkedin: string;
  }
  const config: Config;
  export default config;
}

declare module '@emotion/styled' {
  import { CreateStyled } from '@emotion/styled/types/index';
  import { EmotionTheme } from '$providers/theme';
  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<EmotionTheme>;
  export default customStyled;
}
