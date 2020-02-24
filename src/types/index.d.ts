/* eslint-disable no-duplicate-imports */
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
    image?: string;
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

declare module '@reach/slider' {
  export enum SliderAlignment {
    center = 'center',
    contain = 'contain',
  }

  export enum SliderOrientation {
    horizontal = 'horizontal',
    vertical = 'vertical',
  }

  export const SLIDER_ORIENTATION_HORIZONTAL: SliderOrientation.horizontal;

  export const SLIDER_ORIENTATION_VERTICAL: SliderOrientation.vertical;

  export const SLIDER_HANDLE_ALIGN_CENTER: SliderAlignment.center;

  export const SLIDER_HANDLE_ALIGN_CONTAIN: SliderAlignment.contain;

  type SliderChildrenRender = (props: {
    hasFocus?: boolean;
    id?: string;
    sliderId?: string;
    max?: number;
    min?: number;
    value?: number;
    valueText?: string;
  }) => void;

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#slider-props
   */
  export type SliderProps = Omit<
    React.HTMLProps<HTMLDivElement>,
    'onChange'
  > & {
    /**
     * `Slider` can accept `SliderMarker` children to enhance display of specific
     * values along the track.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-children
     */
    children?: React.ReactNode;
    /**
     * The defaultValue is used to set an initial value for an uncontrolled
     * Slider.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-defaultvalue
     */
    defaultValue?: number;
    /**
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-disabled
     */
    disabled?: boolean;
    /**
     * Whether or not the slider should be disabled from user interaction.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-value
     */
    value?: number;
    /**
     * A function used to set human readable value text based on the slider's
     * current value.
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-getvaluetext
     */
    getValueText?(value: number): string;
    /**
     * When set to `center`, the slider's handle will be positioned directly
     * centered over the slider's curremt value on the track. This means that when
     * the slider is at its min or max value, a visiable slider handle will extend
     * beyond the width (or height in vertical mode) of the slider track. When set
     * to `contain`, the slider handle will always be contained within the bounds
     * of the track, meaning its position will be slightly offset from the actual
     * value depending on where it sits on the track.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-handlealignment
     */
    handleAlignment?: 'center' | 'contain' | SliderAlignment;
    /**
     * The maximum value of the slider. Defaults to `100`.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-max
     */
    max?: number;
    /**
     * The minimum value of the slider. Defaults to `0`.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-min
     */
    min?: number;
    /**
     * If the slider is used as a form input, it should accept a `name` prop to
     * identify its value in context of the form.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-name
     */
    name?: string;
    /**
     * Callback that fires when the slider value changes. When the `value` prop is
     * set, the Slider state becomes controlled and `onChange` must be used to
     * update the value in response to user interaction.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-onchange
     */
    onChange?(
      newValue: number,
      props?: {
        min?: number;
        max?: number;
        handlePosition?: string;
      }
    ): void;
    /**
     * Sets the slider to horizontal or vertical mode.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-orientation
     */
    orientation?: 'horizontal' | 'vertical' | SliderOrientation;
    /**
     * The step attribute is a number that specifies the granularity that the
     * value must adhere to as it changes. Step sets minimum intervals of change,
     * creating a "snap" effect when the handle is moved along the track.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slider-step
     */
    step?: number;
  };

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#sliderinput-props
   */
  export type SliderInputProps = Omit<SliderProps, 'children'> & {
    /**
     * Slider expects `<SliderTrack>` as its child; The track will accept all
     * additional slider sub-components as children. It can also accept a
     * function/render prop as its child to expose some of its internal state
     * variables.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#sliderinput-children
     */
    children: React.ReactNode | SliderChildrenRender;
  };

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#slidertrack-props
   */
  export type SliderTrackProps = React.HTMLProps<HTMLDivElement> & {
    /**
     * `SliderTrack` expects `<SliderHandle>`, at minimum, for the Slider to
     * function. All other Slider subcomponents should be passed as children
     * inside the `SliderTrack`.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slidertrack-children
     */
    children: React.ReactNode;
  };

  /**
   * `SliderTrackHighlight` accepts any props that a HTML div component accepts.
   * `SliderTrackHighlight` will not accept or render any children.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#slidertrackhighlight-props
   */
  export type SliderTrackHighlightProps = React.HTMLProps<HTMLDivElement>;

  /**
   * `SliderTrackHighlight` accepts any props that a HTML div component accepts.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#sliderhandle-props
   */
  export type SliderHandleProps = React.HTMLProps<HTMLDivElement>;

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#slidermarker-props
   */
  export type SliderMarkerProps = React.HTMLProps<HTMLDivElement> & {
    /**
     * The value to denote where the marker should appear along the track.
     *
     * @see Docs https://reacttraining.com/reach-ui/slider#slidermarker-value
     */
    value: number;
  };

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#slider
   */
  export const Slider: React.FunctionComponent<SliderProps>;

  /**
   * @see Docs https://reacttraining.com/reach-ui/slider#slidertrack
   */
  export const SliderTrack: React.FunctionComponent<SliderTrackProps>;

  /**
   * The (typically) highlighted portion of the track that represents the space
   * between the slider's `min` value and its current value.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#slidertrackhighlight
   */
  export const SliderTrackHighlight: React.FunctionComponent<SliderTrackHighlightProps>;

  /**
   * The handle that the user drags along the track to set the slider value.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#sliderhandle
   */
  export const SliderHandle: React.FunctionComponent<SliderHandleProps>;

  /**
   * The parent component of the slider interface. This is a lower level component
   * if you need more control over styles or rendering the slider's inner
   * components.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#sliderinput
   */
  export const SliderInput: React.FunctionComponent<SliderInputProps>;

  /**
   * A fixed value marker. These can be used to illustrate a range of steps or
   * highlight important points along the slider track.
   *
   * @see Docs https://reacttraining.com/reach-ui/slider#slidermarker
   */
  export const SliderMarker: React.FunctionComponent<SliderMarkerProps>;

  export default Slider;
}
