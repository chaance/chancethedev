import React, { forwardRef, useRef } from 'react';
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

const MenuList = forwardRef<HTMLUListElement, MenuListProps>(
  (
    {
      children,
      className,
      active,
      setActive,
      setChildIsActive: _setChildIsActive,
      childIsActive: _childIsActive,
      ...props
    },
    ref
  ) => {
    const [childIsActive, setChildIsActive] = React.useState(false);
    const clones = React.Children.map(
      children as any,
      (child: React.ReactElement<MenuItemProps>, index) =>
        child && React.cloneElement(child, { setChildIsActive, childIsActive })
    );
    return (
      <ul
        ref={ref}
        className={cx(className, 'MenuList', { active: childIsActive })}
        {...props}
      >
        {clones}
      </ul>
    );
  }
);

export const Menu: React.FC<MenuProps> = ({
  className,
  items,
  togglable,
  toggleActive,
  active,
  setActive,
  setChildIsActive,
  childIsActive,
  toggle,
  ...props
}) => {
  const ref = useRef<HTMLUListElement>(null);
  const renderSubMenu = (subItems: MenuItemData[]) => {
    if (subItems && subItems.length) {
      return (
        <MenuList ref={ref} {...props}>
          {renderMenuItems(subItems)}
        </MenuList>
      );
    }
    return null;
  };

  const renderMenuItems = (nestedItems: MenuItemData[]) =>
    nestedItems.map((item, index, arr) => {
      const {
        id,
        to,
        options = {},
        children = [] as any,
        className: itemClassName,
        onClick,
        redirect,
        linkProps,
      } = item;
      const { target, hideLabel } = options;

      return (
        <MenuItem
          key={id}
          className={cx(itemClassName, 'MenuItem', { active })}
          hasChildren={!!(children && children.length)}
          tabIndex={-1}
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
  return (
    <MenuList
      className={cx(className, 'Menu')}
      ref={ref}
      onBlur={() => {
        requestAnimationFrame(() => {
          // When the user is toggling away from the last item in the menu, we
          // we want to close the menu as they navigate away. This way they
          // don't have to back-tab all the way back up the menu tree to the
          // toggle button (if they want to get back to the toggle button to
          // reopen the menu, it's only a single back-tab since we assign
          // tabIndex of -1 to menu links when it's closed).
          if (
            toggle &&
            ref.current &&
            !ref.current.contains(document.activeElement)
          ) {
            toggle();
          }
        });
      }}
      {...props}
    >
      {renderMenuItems(items)}
    </MenuList>
  );
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
      <Link
        to={to}
        target={target}
        rel={rel}
        getProps={isPartiallyActive}
        {...props}
      >
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
