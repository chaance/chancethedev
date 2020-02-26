import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Menu, { MenuItemData } from '$components/Menu';
import Link from '$components/Link';

import { Element } from '$lib/types';
import { getBem } from '$lib/utils';
import { useBreakpoint } from '$lib/hooks';

import ThemeToggle from './ThemeToggle';
import NavToggle from './NavToggle';
import './Header.scss';

let bem = getBem('Header');

const Header: React.FC<HeaderProps> = ({
  navIsActive,
  setNavIsActive,
  usesToggleNav,
  children,
  className,
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
    <header className={bem(className)} {...props}>
      <div className={bem({ el: 'inner' })}>
        <div>
          <Link className={bem({ el: 'home-link' })} to="/">
            {isTinyScreen ? 'Chance' : 'Chance the Developer'}
          </Link>
          {!usesToggleNav && <NavMenu navIsActive={false} items={items} />}
        </div>
        <div className={bem({ el: 'button-group' })}>
          <ThemeToggle />
          <NavToggle
            navIsActive={navIsActive}
            setNavIsActive={setNavIsActive}
          />
          {usesToggleNav && (
            <NavMenu
              setNavIsActive={setNavIsActive}
              usesToggleNav
              navIsActive={navIsActive}
              items={items}
            />
          )}
        </div>
      </div>
    </header>
  );
};

function NavMenu({
  usesToggleNav,
  setNavIsActive = () => {},
  navIsActive,
  items,
}: any) {
  return (
    <div
      className={bem({
        el: 'menu-wrapper',
        'nav-active': usesToggleNav ? navIsActive : false,
      })}
    >
      <nav>
        <Menu
          className={bem({ el: 'menu' })}
          toggle={() => setNavIsActive(!navIsActive)}
          togglable={usesToggleNav}
          toggleActive={usesToggleNav ? navIsActive : false}
          items={items}
        />
      </nav>
    </div>
  );
}

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
// TYPES
////////////////////////////////////////////////////////////////////////////////
export interface HeaderProps extends Element<'header'> {
  usesToggleNav: boolean;
  navIsActive: boolean;
  setNavIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
