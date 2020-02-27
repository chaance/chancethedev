import React from 'react';
import VH from '@reach/visually-hidden';
import { useThemeContext, Themes } from '$lib/providers';
import { getBem } from '$lib/utils';
import { ThemeToggleProps, ThemeGraphicProps } from './index';
import './ThemeToggle.scss';

let bem = getBem('ThemeToggle');

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const { theme, toggleDarkMode } = useThemeContext();
  let label = `Switch to ${theme === Themes.Dark ? 'light' : 'dark'} mode`;
  return (
    <button className={bem(className)} {...props} onClick={toggleDarkMode}>
      <VH>{label}</VH>
      <span className={bem({ el: 'inner', theme })} aria-hidden>
        <ThemeGraphic />
      </span>
    </button>
  );
};

const ThemeGraphic: React.FC<ThemeGraphicProps> = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={bem({ el: 'graphic' })}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <circle className="mask" cx="38" cy="34" r="54" fill="black" />
        </mask>
      </defs>
      <circle
        className="shape"
        preserveAspectRatio="xMidYMid meet"
        id="donut"
        cx="50"
        cy="50"
        r="50"
        mask="url(#hole)"
      />
    </svg>
  );
};

export default ThemeToggle;
