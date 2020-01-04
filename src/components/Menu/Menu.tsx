import React from 'react';
import cx from 'classnames';
import VH from '@reach/visually-hidden';
import Link from '$components/Link';
import {
  MenuItemData,
  MenuItemProps,
  MenuLinkProps,
  MenuListProps,
  MenuProps,
} from './index';

const MenuList: React.FC<MenuListProps> = ({
  children,
  className,
  active,
  setActive,
  setChildIsActive: _setChildIsActive,
  childIsActive: _childIsActive,
  ...props
}) => {
  const [childIsActive, setChildIsActive] = React.useState(false);
  const clones = React.Children.map(
    children as any,
    (child: React.ReactElement<MenuItemProps>, index) =>
      child && React.cloneElement(child, { setChildIsActive, childIsActive })
  );
  return (
    <ul className={cx(className, { active: childIsActive })} {...props}>
      {clones}
    </ul>
  );
};

export const Menu: React.FC<MenuProps> = ({
  items,
  togglable,
  toggleActive,
  active,
  setActive,
  setChildIsActive,
  childIsActive,
  ...props
}) => {
  const renderSubMenu = (subItems: MenuItemData[]) => {
    if (subItems && subItems.length) {
      return <MenuList {...props}>{renderMenuItems(subItems)}</MenuList>;
    }
    return null;
  };

  const renderMenuItems = (nestedItems: MenuItemData[]) =>
    nestedItems.map(item => {
      const {
        id,
        to,
        options = {},
        children = [] as any,
        className,
        onClick,
        redirect,
        linkProps,
      } = item;
      const { target, hideLabel } = options;

      return (
        <MenuItem
          key={id}
          className={cx(className, { active })}
          hasChildren={!!(children && children.length)}
        >
          <MenuLink
            onClick={onClick}
            redirect={redirect}
            to={to}
            label={hideLabel ? <VH>{item.label}</VH> : item.label}
            target={target}
            tabIndex={togglable && !toggleActive ? -1 : 0}
            {...linkProps}
          />
          {renderSubMenu(children)}
        </MenuItem>
      );
    });
  return <MenuList {...props}>{renderMenuItems(items)}</MenuList>;
};

export const MenuLink: React.FC<MenuLinkProps> = ({
  to,
  target,
  label,
  onClick,
  className,
  rel: relProp,
  redirect,
  active,
  setActive,
  setChildIsActive,
  childIsActive,
  ...props
}) => {
  const isPartiallyActive = ({ isPartiallyCurrent }: any) => {
    if (isPartiallyCurrent) {
      setActive && !active && setActive(true);
      setChildIsActive && !childIsActive && setChildIsActive(true);
      return { className: cx('active', className) };
    }
    return { className };
  };
  const rel =
    relProp || target === '_blank' ? 'noopener noreferrer' : undefined;
  if (onClick) {
    return (
      <button onClick={onClick} type="button" className={className} {...props}>
        {label}
      </button>
    );
  }
  if (to) {
    return (
      <Link to={to} target={target} rel={rel} getProps={isPartiallyActive}>
        {label}
      </Link>
    );
  }
  return <span {...props}>{label}</span>;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  hasChildren = false,
  className,
  setChildIsActive,
  childIsActive,
  ...props
}) => {
  const [active, setActive] = React.useState(false);
  const clones = React.Children.map(
    children as any,
    (child: React.ReactElement<MenuLinkProps>, index) =>
      child &&
      React.cloneElement(child, {
        setActive,
        active,
        setChildIsActive,
        childIsActive,
      })
  );
  return (
    <li className={cx(className, { active })} {...props}>
      {clones}
    </li>
  );
};

export default Menu;
