import React from 'react';
import VH from '@reach/visually-hidden';
import { getBem } from '$lib/utils';
import { BurgerButtonProps } from './index';
import './BurgerButton.scss';

let bem = getBem('BurgerButton');

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
      className={bem(className)}
      onClick={event => {
        onClick && onClick(event);
        setActive(!active);
      }}
    >
      <VH>{children}</VH>
      <span className={bem({ el: 'line' })} aria-hidden />
    </button>
  );
};

export default BurgerButton;
