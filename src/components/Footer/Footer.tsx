import React from 'react';
import styled from '@emotion/styled';
import { rem } from 'polished';
import Link from '$components/Link';
import { MenuItemData } from '$components/Menu';
import { breakpoint, GLOBAL_MARGIN } from '$lib/styles';
import { fonts, rhythm } from '$src/lib/typography';
import config from '$src/../config';
import { FooterProps } from './index';

const Footer: React.FC<FooterProps> = ({ ...props }) => (
  <StyledFooter {...props}>
    <nav>
      <Menu>
        {MENU_ITEMS.map(({ id, to, label }) => (
          <MenuItem key={id}>
            <Link to={to}>{label}</Link>
          </MenuItem>
        ))}
      </Menu>
    </nav>
    <Copyright>
      {`\u00A9 ${new Date().getFullYear()}`} Zero Rights Reserved
    </Copyright>
  </StyledFooter>
);

export default Footer;

const MENU_ITEMS: MenuItemData[] = [
  {
    id: 1,
    label: 'Twitter',
    to: config.twitter,
  },
  {
    id: 2,
    label: 'GitHub',
    to: config.github,
  },
  {
    id: 3,
    label: 'Stack Overflow',
    to: config.stackOverflow,
  },
  {
    id: 4,
    label: 'LinkedIn',
    to: config.linkedin,
  },
];

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
export const StyledFooter = styled.footer`
  padding-top: ${rhythm(GLOBAL_MARGIN / 2)};
  font-size: ${rem(14)};
  font-family: ${fonts.sans};
  font-weight: bold;
  line-height: 1;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  ${breakpoint('medium')} {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;

  ${breakpoint('medium')} {
    flex-direction: row;
  }
`;

export const MenuItem = styled.li`
  ${breakpoint('medium')} {
    margin: 0;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;

export const Copyright = styled('div')`
  color: ${({ theme }) => theme.colors.link};
`;
