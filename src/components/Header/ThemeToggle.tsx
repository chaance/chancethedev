import React from 'react';
import cx from 'classnames';
import VH from '@reach/visually-hidden';
import { useThemeContext, Themes } from '$lib/providers';
import { ThemeToggleProps, ThemeGraphicProps } from './index';

const styles = require('./ThemeToggle.module.scss');

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const { theme, toggleDarkMode } = useThemeContext();
  let label = `Switch to ${theme === Themes.Dark ? 'light' : 'dark'} mode`;
  return (
    <button
      className={cx(className, 'ThemeToggle', styles.button)}
      {...props}
      onClick={toggleDarkMode}
    >
      <VH>{label}</VH>
      <span className={styles.inner} aria-hidden>
        <ThemeGraphic />
      </span>
    </button>
  );
};

const ThemeGraphic: React.FC<ThemeGraphicProps> = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={styles.graphic}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <mask id="hole">
          <rect width="100%" height="100%" fill="white" />
          <circle className={styles.mask} cx="38" cy="34" r="54" fill="black" />
        </mask>
      </defs>
      <circle
        className={styles.shape}
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
