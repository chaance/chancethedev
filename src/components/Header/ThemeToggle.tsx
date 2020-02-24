import React from 'react';
import styled from '@emotion/styled';
import VH from '@reach/visually-hidden';
import { useTheme } from '$lib/providers';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm } from '$lib/typography';
import { ThemeToggleProps, ThemeGraphicProps } from './index';

const ThemeToggle: React.FC<ThemeToggleProps> = props => {
  const [, { themeName, toggleDarkMode }] = useTheme();
  console.log('FROM TOGGLE', { themeName });
  return (
    <StyledButton {...props} onClick={toggleDarkMode}>
      <VH>
        {themeName === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </VH>
      <ButtonInner aria-hidden>
        <ThemeGraphic />
      </ButtonInner>
    </StyledButton>
  );
};

const ThemeGraphic: React.FC<ThemeGraphicProps> = props => {
  const [_, { themeName }] = useTheme();
  console.log('FROM GRAPHIC', { themeName });
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        width: 'inherit',
        height: 'inherit',
      }}
    >
      <defs>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <circle
            cx="38"
            cy="34"
            r="54"
            fill="black"
            style={{
              transition: `transform 1s cubic-bezier(${
                themeName === 'dark' ? `0.2, 0.6, 0.4, 1` : `1, 0.4, 0.6, 2`
              })`,
              transform: `translate(${
                themeName === 'dark' ? '0, 0' : '-100%, -70%'
              }) scale(${themeName === 'dark' ? `1` : `0.5`})`,
            }}
          />
        </mask>
      </defs>
      <circle
        preserveAspectRatio="xMidYMid meet"
        id="donut"
        cx="50"
        cy="50"
        r="50"
        mask="url(#hole)"
        fill={themeName === 'dark' ? '#fff' : '#ffb000'}
        style={{
          transition: `fill 1s ease`,
        }}
      />
    </svg>
  );
};

export default ThemeToggle;

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 8px;
  box-shadow: none;
  width: 16px;
  height: 16px;

  ${breakpoint('large')} {
    border-radius: ${rhythm(GLOBAL_MARGIN / 4)};
    width: ${rhythm(GLOBAL_MARGIN / 2)};
    height: ${rhythm(GLOBAL_MARGIN / 2)};
  }
`;

const ButtonInner = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
`;
