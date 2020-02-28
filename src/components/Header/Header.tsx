import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import Menu, { MenuItemData } from '$components/Menu';
import Link from '$components/Link';
import { Element } from '$lib/types';
import ThemeToggle from './ThemeToggle';
import NavToggle from './NavToggle';

const styles = require('./Header.module.scss');

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

  return (
    <header className={cx(className, 'Header', styles.header)} {...props}>
      <div className={styles.inner}>
        <div>
          <Link className={styles.homeLink} to="/">
            Chance<span> the Developer</span>
          </Link>
          <NavMenu
            navIsActive={false}
            items={items}
            aria-hidden={usesToggleNav}
          />
        </div>
        <div className={styles.buttonGroup}>
          <ThemeToggle />
          <NavToggle
            navIsActive={navIsActive}
            setNavIsActive={setNavIsActive}
            aria-controls="main-nav"
            aria-hidden={!usesToggleNav}
            tabIndex={!usesToggleNav ? -1 : 0}
          />
          <NavMenu
            id="main-nav"
            setNavIsActive={setNavIsActive}
            usesToggleNav
            navIsActive={navIsActive}
            items={items}
            className="toggle"
            aria-hidden={!usesToggleNav}
          />
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
  className,
  id,
  ...props
}: any) {
  return (
    <div
      className={cx(styles.menuWrapper, className, {
        [styles.navActive]: usesToggleNav ? navIsActive : false,
        [styles.toggle]: usesToggleNav,
      })}
      {...props}
    >
      <nav id={id}>
        <Menu
          className={styles.menu}
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
