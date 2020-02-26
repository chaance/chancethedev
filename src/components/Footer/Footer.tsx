import React from 'react';
import Link from '$components/Link';
import { MenuItemData } from '$components/Menu';
import { getBem } from '$lib/utils';
import config from '$src/../config';
import { FooterProps } from './index';
import './Footer.scss';

let bem = getBem('Footer');

const Footer: React.FC<FooterProps> = ({ className, ...props }) => (
  <footer className={bem(className)} {...props}>
    <nav>
      <ul className={bem({ el: 'menu' })}>
        {MENU_ITEMS.map(({ id, to, label }) => (
          <li key={id} className={bem({ el: 'menu-item' })}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
    <div className={bem({ el: 'copyright' })}>
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
