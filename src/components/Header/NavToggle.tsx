import React from 'react';
import styled from '@emotion/styled';
import BurgerButton from '$components/BurgerButton';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { rhythm } from '$src/lib/typography';

const NavToggle: React.FC<NavToggleProps> = ({
  navIsActive,
  setNavIsActive,
}) => {
  return (
    <StyledButton setActive={setNavIsActive} active={navIsActive}>
      {navIsActive ? 'Close site navigation' : 'Open site navigation'}
    </StyledButton>
  );
};

export default NavToggle;

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const StyledButton = styled(BurgerButton)`
  margin-left: ${rhythm(GLOBAL_MARGIN / 2)};

  ${breakpoint('large')} {
    display: none;
  }
`;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface NavToggleProps {
  navIsActive: boolean;
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
