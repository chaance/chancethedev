import { LinkProps } from '$components/Link';
import { Element } from '$lib/types';

export { default } from './Menu';
export * from './Menu';

////////////////////////////////////////////////////////////////////////////////
// TYPES
////////////////////////////////////////////////////////////////////////////////
interface MenuStates {
  setActive?(state: boolean): void;
  setChildIsActive?(state: boolean): void;
  active?: boolean;
  childIsActive?: boolean;
}

export interface MenuItemData {
  id: string | number;
  active?: boolean;
  to?: string;
  label: string;
  className?: string;
  options?: {
    target?: string;
    hideLabel?: boolean;
  };
  children?: MenuItemData[];
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  linkProps?: {
    [key: string]: any;
  };
}

interface IMenuProps extends Element<'ul'> {
  toggle?(): void;
  togglable?: boolean;
  toggleActive?: boolean;
  items: MenuItemData[];
}

interface IMenuItemProps extends Element<'li'> {
  className?: string;
  children: React.ReactNode;
  hasChildren: boolean;
}

interface IMenuLinkProps extends TMenuLinkProps {
  to?: string;
  label: string | JSX.Element;
  redirect?: string;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export type MenuListProps = Element<'ul'> & MenuStates;

type TMenuLinkProps = Omit<LinkProps, 'onClick'> &
  JSX.IntrinsicElements['button'];

export type MenuProps = IMenuProps & MenuStates;

export type MenuItemProps = IMenuItemProps & MenuStates;

export type MenuLinkProps = IMenuLinkProps & MenuStates;
