import React from 'react';
import BurgerButton from '$components/BurgerButton';
import { getBem } from '$lib/utils';
import './NavToggle.scss';
import { Element } from '$lib/types';

let bem = getBem('NavToggle');

const NavToggle: React.FC<NavToggleProps> = ({
  className,
  navIsActive,
  setNavIsActive,
}) => {
  return (
    <BurgerButton
      className={bem(className)}
      setActive={setNavIsActive}
      active={navIsActive}
    >
      {navIsActive ? 'Close site navigation' : 'Open site navigation'}
    </BurgerButton>
  );
};

export default NavToggle;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface NavToggleProps extends Element<'button'> {
  navIsActive: boolean;
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
