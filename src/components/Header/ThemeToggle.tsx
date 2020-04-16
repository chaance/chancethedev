import React from 'react';
import cx from 'classnames';
import useDarkMode from 'use-dark-mode';
import VH from '@reach/visually-hidden';
import { Tooltip } from '@reach/tooltip';
import { ThemeToggleProps, ThemeGraphicProps } from './index';

const styles = require('./ThemeToggle.module.scss');

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, ...props }) => {
  const darkMode = useDarkMode(false);
  let label = `Switch to ${darkMode.value ? 'light' : 'dark'} mode`;
  return (
    <Tooltip label={label}>
      <button
        className={cx(className, 'ThemeToggle', styles.button)}
        {...props}
        onClick={darkMode.toggle}
      >
        <VH>{label}</VH>
        <span className={styles.inner} aria-hidden>
          <ThemeGraphic />
        </span>
      </button>
    </Tooltip>
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
