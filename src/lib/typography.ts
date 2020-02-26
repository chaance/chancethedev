import Typography from 'typography';
import { fonts, fontLists } from '$lib/providers/fonts';

export { fonts };

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.6,
  headerLineHeight: 1.3,
  headerFontFamily: fontLists.sans,
  bodyFontFamily: fontLists.sans,
  scaleRatio: 2,
  overrideStyles: () => ({
    'code, kbd, samp': {
      fontFamily: fonts.mono,
    },
  }),
});

if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export const rhythm = typography.rhythm;
export const scale = typography.scale;
export default typography;
