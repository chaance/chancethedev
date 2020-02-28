import React from 'react';
import cx from 'classnames';
import VH from '@reach/visually-hidden';
import { BurgerButtonProps } from './index';

const styles = require('./BurgerButton.module.scss');

const BurgerButton: React.FC<BurgerButtonProps> = ({
  children,
  className,
  onClick,
  setActive,
  active,
  ...props
}) => {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={cx(className, 'BurgerButton', styles.button)}
      onClick={event => {
        onClick && onClick(event);
        setActive(!active);
      }}
    >
      <VH>{children}</VH>
      <span className={styles.line} aria-hidden />
    </button>
  );
};

export default BurgerButton;
