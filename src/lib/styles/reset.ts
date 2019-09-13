import { css } from '@emotion/core';
import { useTheme } from '$lib/providers';
import typography, { fonts, rhythm } from '$lib/typography';

export const resetStyles = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [theme] = useTheme();
  return css`
    html {
      text-rendering: optimizeLegibility;
      overflow-x: hidden;
      overflow-y: auto !important;
      box-sizing: border-box;
      -ms-overflow-style: scrollbar;
      -webkit-tap-highlight-color: ${theme.colors.blue30};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html,
    body {
      font-style: normal;
      padding: 0;
      margin: 0;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    form {
      margin: 0;
    }

    ul,
    ol {
      list-style-position: inside;
      margin-left: 0;
      font-size: ${typography.options.baseFontSize};
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }

    a {
      transition-duration: 100ms;
      transition-timing-function: ease-out;
      text-decoration: none;
    }

    a:not([href]):not([tabindex]) {
      color: inherit;
      text-decoration: none;

      &:hover,
      &:focus {
        color: inherit;
        text-decoration: none;
      }

      &:focus {
        outline: 0;
      }
    }

    blockquote {
      padding-left: 1rem;
      margin-left: 0;
      margin-right: 0;
      font-style: italic;

      p {
        line-height: ${rhythm(2/3)};
      }
    }

    [tabindex='-1']:focus {
      outline: none !important;
    }

    pre {
      overflow: auto;
    }

    figure {
      margin: 0 0 ${rhythm(1)} 0;
      img {
        vertical-align: middle;
      }
    }

    button,
    [role='button'] {
      cursor: pointer;
    }

    a,
    area,
    button,
    [role='button'],
    input,
    label,
    select,
    summary,
    textarea {
      touch-action: manipulation;
    }

    table {
      border-collapse: collapse;
    }

    caption {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      text-align: center;
      caption-side: bottom;
    }

    th {
      text-align: left;
    }

    label {
      display: inline-block;
      margin-bottom: ${rhythm(1/3)};
    }

    button:focus {
      outline: 1px dotted;
      outline: 5px auto -webkit-focus-ring-color;
    }

    input,
    button,
    select,
    textarea {
      line-height: inherit;
    }

    input[type='date'],
    input[type='time'],
    input[type='datetime-local'],
    input[type='month'] {
      -webkit-appearance: listbox;
    }

    textarea {
      resize: vertical;
    }

    fieldset {
      min-width: 0;
      padding: 0;
      margin: 0;
      border: 0;
    }

    legend {
      display: block;
      width: 100%;
      padding: 0;
      line-height: inherit;
    }

    input[type='search'] {
      -webkit-appearance: none;
    }

    output {
      display: inline-block;
    }

    svg:not(:root) {
      overflow: hidden;
      vertical-align: middle;
    }

    [hidden] {
      display: none !important;
    }
  `;
};

export default resetStyles;
