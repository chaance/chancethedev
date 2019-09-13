import { css, jsx } from '@emotion/core';
import { rhythm } from '$lib/typography';
import { breakpoint } from '$lib/styles';

export const GLOBAL_MARGIN = 1;
export const SMALL_SCREEN_MULTIPLIER = 0.625;
export const MOBILE_NAV_WIDTH = 232;

export const makeContentGrid = (col1: string, col2: string) => css`
  position: relative;
  max-width: ${rhythm(26)};
  ${breakpoint('xxlarge')} {
    max-width: none;
    @supports (display: grid) {
      display: grid;
      grid-template:
        ${`'${col1} ${col2}'`} fit-content(100%) / minmax(${rhythm(12)}, 1.5fr)
        1fr;
      column-gap: ${rhythm(GLOBAL_MARGIN)};
      height: 100%;
    }
  }
`;
