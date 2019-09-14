import { css } from '@emotion/core';
import { Theme } from '$src/lib/providers/theme';
import { fonts, rhythm } from '$lib/typography';
import { breakpoint } from './breakpoints';
import { rem } from 'polished';

export const globalStyles = (theme: Theme) => {
  return css`
    html {
      font-size: 16px;

      ${breakpoint('xxxlarge')} {
        font-size: 18px;
      }
    }

    body {
      background: ${theme.colors.bodyBg};
      color: ${theme.colors.text};
      transition: color 400ms ease-out, background 400ms ease-out;
      overflow-x: hidden;

      ${breakpoint('large')} {
        @supports (display: grid) {
          overflow-x: initial;
        }
      }
    }

    &::selection {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
    }

    a {
      color: ${theme.colors.link};

      &:hover,
      &:focus {
        color: ${theme.colors.linkHover};
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: inherit;
      font-size: inherit;
    }

    hr {
      margin: ${rhythm(2)} 0;
      border: 0;
      border-top: 1px solid ${theme.colors.border};
      background: 0;
      transition: border-color 400ms ease-out;
    }

    input {
      border-radius: 0;
      border: 1px solid ${theme.colors.gray};
      padding: ${rhythm(1 / 3)} ${rhythm(1 / 2)};
      box-shadow: 0;
      font-family: inherit;
      margin: ${rhythm(1)} 0;

      ::placeholder {
        opacity: 0.4;
      }
    }

    pre {
      background-color: ${theme.colors.gray60};
      border-radius: 0;
      font-size: ${rem(16)};
      padding: ${rem(10)};
      overflow-x: auto;

      ::-webkit-scrollbar {
        width: 100%;
        height: ${rem(6)};
        border-radius: 0;
      }

      ::-webkit-scrollbar-track {
        background: ${theme.colors.gray60};
        border-radius: 0;
        border: 0;
      }

      ::-webkit-scrollbar-thumb {
        background: ${theme.colors.gray60};
        border-radius: 0;
      }
    }

    .gatsby-resp-image-image {
      background: none !important;
      box-shadow: 0;
    }

    ul,
    ol {
      font-size: inherit;
    }
  `;
};

export default globalStyles;
