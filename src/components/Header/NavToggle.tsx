import React from 'react';
import cx from 'classnames';
import BurgerButton from '$components/BurgerButton';
import { Element } from '$lib/types';

const styles = require('./NavToggle.module.scss');

const NavToggle: React.FC<NavToggleProps> = ({
  className,
  navIsActive,
  setNavIsActive,
}) => {
  return (
    <BurgerButton
      className={cx(className, 'NavToggle', styles.button)}
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
