import React from 'react';
import VH from '@reach/visually-hidden';
import { useThemeContext } from '$lib/providers';
import { getBem } from '$lib/utils';
import { ThemeToggleProps, ThemeGraphicProps } from './index';
import './ThemeToggle.scss';

let bem = getBem('ThemeToggle');

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const { theme, toggleDarkMode } = useThemeContext();
  return (
    <button className={bem(className)} {...props} onClick={toggleDarkMode}>
      <VH>
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </VH>
      <span className={bem({ el: 'inner' })} aria-hidden>
        <ThemeGraphic />
      </span>
    </button>
  );
};

const ThemeGraphic: React.FC<ThemeGraphicProps> = props => {
  const { theme } = useThemeContext();
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
                theme === 'dark' ? `0.2, 0.6, 0.4, 1` : `1, 0.4, 0.6, 2`
              })`,
              transform: `translate(${
                theme === 'dark' ? '0, 0' : '-100%, -70%'
              }) scale(${theme === 'dark' ? `1` : `0.5`})`,
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
        fill={theme === 'dark' ? '#fff' : '#ffb000'}
        style={{
          transition: `fill 1s ease`,
        }}
      />
    </svg>
  );
};

export default ThemeToggle;
