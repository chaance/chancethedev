import React from 'react';
import styled from '@emotion/styled';
import { rem } from 'polished';
import Code from './Code';
import { H1, H2, H3, H4, H5, H6 } from '$components/Heading';
import { breakpoint } from '$lib/styles';
import { Element } from '$lib/types';
import { fonts, rhythm } from '$lib/typography';

export default {
  h1: (props: Element<'h1'>) => <H1 level={1} {...props} />,
  h2: (props: Element<'h2'>) => <H2 level={2} {...props} />,
  h3: (props: Element<'h2'>) => <H3 level={3} {...props} />,
  h4: (props: Element<'h2'>) => <H4 level={4} {...props} />,
  h5: (props: Element<'h2'>) => <H5 level={5} {...props} />,
  h6: (props: Element<'h2'>) => <H6 level={6} {...props} />,
  blockquote: (props: Element<'blockquote'>) => <Blockquote {...props} />,
  code: Code,
  pre: (props: Element<'pre'>) => <pre {...props} />,
};

const Blockquote = styled.blockquote`
  margin: ${rhythm(1)} 0;
  font-size: ${rem(22)};
  font-family: ${fonts.serif};
  font-weight: bold;
  font-style: inherit;
  letter-spacing: -0.012em;
  line-height: 1.48;

  p {
    margin: ${rhythm(1 / 2)} 0;
  }

  ${breakpoint('medium')} {
    font-size: ${rem(30)};
  }

  cite {
    display: block;
    font-size: ${rem(14)};

    ${breakpoint('medium')} {
      font-size: ${rem(16)};
      font-style: normal;
      font-weight: 400;
      margin-top: ${rhythm(1 / 2)};
      letter-spacing: 1;
    }

    span {
      display: inline-block;
      position: relative;

      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        opacity: 0.2;
        background-color: transparent;
        background-image: linear-gradient(
          180deg,
          ${({ theme }) => `${theme.colors.green20}, ${theme.colors.green30}`}
        );
        mix-blend-mode: multiply;
        pointer-events: none;
      }
    }
  }
`;
