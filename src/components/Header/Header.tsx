import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import { rem, lighten, darken } from 'polished';

import Menu, { MenuItemData } from '$components/Menu';
import Link from '$components/Link';

import {
  breakpoint,
  GLOBAL_MARGIN,
  SMALL_SCREEN_MULTIPLIER,
  MOBILE_NAV_WIDTH,
} from '$lib/styles';
import { Element } from '$lib/types';
import { fonts, rhythm } from '$lib/typography';
import { useBreakpoint } from '$lib/hooks';

import ThemeToggle from './ThemeToggle';
import NavToggle from './NavToggle';

const Header: React.FC<HeaderProps> = ({
  navIsActive,
  setNavIsActive,
  children,
  ...props
}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const items = React.useMemo(() => getLinks(data.site.siteMetadata.title), [
    data,
  ]);

  const isTinyScreen = !useBreakpoint(320);

  return (
    <StyledHeader {...props}>
      <HeaderInner>
        <nav>
          <HomeLink to="/">
            {isTinyScreen ? 'Chance' : 'Chance the Developer'}
          </HomeLink>
          <MenuWrapper navIsActive={navIsActive}>
            <StyledMenu items={items} />
          </MenuWrapper>
        </nav>
        <ButtonGroup>
          <ThemeToggle />
          <NavToggle
            navIsActive={navIsActive}
            setNavIsActive={setNavIsActive}
          />
        </ButtonGroup>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;

function getLinks(siteTitle: string): MenuItemData[] {
  return [
    /* {
      id: 1,
      label: 'Talks',
      to: '/talks',
    }, */
    /* {
      id: 2,
      label: 'Workshops',
      to: '/workshops',
    }, */
    {
      id: 3,
      label: 'Podcast',
      to: '/podcast',
      children: [
        /* {
          id: 3.1,
          label: 'RSS',
          to: '/rss',
        }, */
        {
          id: 3.2,
          label: 'Google Play',
          to:
            'https://play.google.com/music/m/I4fuxk6xar5fgy2my2lqpwf7zwq?t=Chance_the_Developer_Podcast',
        },
        {
          id: 3.3,
          label: 'iTunes',
          to:
            'https://itunes.apple.com/us/podcast/chance-the-developer-podcast/id1344502648?mt=2',
        },
        {
          id: 3.4,
          label: 'Pocket Casts',
          to: 'http://pca.st/Cye7',
        },
        {
          id: 3.5,
          label: 'Stitcher',
          to: 'https://www.stitcher.com/s?fid=173075&refid=stpr',
        },
        {
          id: 3.6,
          label: 'Spotify',
          to:
            'https://open.spotify.com/show/50hIkzVe6SHWEOc32wI6yd?si=f7XBveIkSIiti1E1OsnBBA',
        },
        /* {
          id: 3.7,
          label: 'Become a Sponsor',
          to: '/podcast/sponsor',
        }, */
      ],
    },
    {
      id: 4,
      label: 'Blog',
      to: '/blog',
    },
    /* {
      id: 5,
      label: 'About',
      to: '/about',
    }, */
  ];
}

////////////////////////////////////////////////////////////////////////////////
// STYLES
////////////////////////////////////////////////////////////////////////////////
const topLevelMenuStyles = css({
  fontSize: rem(18),
  fontFamily: fonts.sans,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: rhythm(1 / 3),
  lineHeight: 1.15,
});

export const StyledHeader = styled('header')`
  position: relative;
  margin-bottom: ${rhythm(GLOBAL_MARGIN / 2)};
  ${breakpoint('large')} {
    margin-bottom: 0;
  }
`;

export const HeaderInner = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @supports (display: grid) {
    ${breakpoint('large')} {
      position: sticky;
      top: ${rhythm(GLOBAL_MARGIN)};
      height: calc(100vh - ${rhythm(GLOBAL_MARGIN * 2)});
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export const HomeLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  ${topLevelMenuStyles}

  ${breakpoint('medium down')} {
    margin-bottom: 0;
    line-height: 1;
    /* height: 16px; */
  }

  &:hover,
  &:focus {
    color: ${({ theme }) =>
      theme.activeTheme === 'dark'
        ? lighten(0.15, theme.colors.primary!)
        : darken(0.15, theme.colors.primary!)};
  }
`;

export const MenuWrapper = styled('div')<{ navIsActive: boolean }>`
  ${breakpoint('medium down')} {
    position: absolute;
    height: 100%;
    width: ${rem(MOBILE_NAV_WIDTH)};
    top: 0;
    left: calc(100% + 1px);
    padding: 0 ${rhythm(GLOBAL_MARGIN)};
    opacity: ${({ navIsActive }) => (navIsActive ? 1 : 0)};
    transition: opacity 400ms ease-out;

    &:before {
      content: '';
      display: block;
      position: absolute;
      background-color: ${({ theme }) => theme.colors.border};
      height: 100%;
      width: 1px;
      top: 0;
      left: 0;
    }
  }

  ${breakpoint('small down')} {
    padding: 0 ${rhythm(GLOBAL_MARGIN * SMALL_SCREEN_MULTIPLIER)};
  }
`;

export const StyledMenu = styled(Menu)`
  &,
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  /* sub-menu */
  & > li ul {
    margin: ${rhythm(1 / 3)} 0 ${rhythm(1 / 1.5)};
    display: none;
  }
  & > li.active ul,
  & > li ul.active {
    display: block;
  }

  /* top-level menu items */
  & > li {
    ${topLevelMenuStyles}

    > a {
      color: ${({ theme }) => theme.colors.text};
    }

    > a:hover,
    > a:focus {
      color: ${({ theme }) => theme.colors.link};
    }
  }

  /* sub- menu items */
  & > li ul > li {
    font-size: ${rem(14)};
    text-transform: none;
    margin-bottom: ${rhythm(1 / 6)};

    > a {
      color: ${({ theme }) => theme.colors.link};
    }

    > a:hover,
    > a:focus {
      color: ${({ theme }) => theme.colors.linkHover};
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface HeaderProps extends Element<'header'> {
  navIsActive: boolean;
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
