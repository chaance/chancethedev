import React from 'react';
import cx from 'classnames';
import Link from '$components/Link';
import { MenuItemData } from '$components/Menu';
import config from '$src/../config';
import { FooterProps } from './index';

const styles = require('./Footer.module.scss');

const Footer: React.FC<FooterProps> = ({ className, ...props }) => (
  <footer className={cx(className, styles.footer)} {...props}>
    <nav>
      <ul className={styles.menu}>
        {MENU_ITEMS.map(({ id, to, label }) => (
          <li key={id} className={styles.menuItem}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className={styles.copyright}>
      {`\u00A9 ${new Date().getFullYear()}`} Zero Rights Reserved
    </div>
  </footer>
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
