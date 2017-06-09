import React from 'react';
import classNames from 'classnames';
import navStyles from './nav.sass';

type NavType = {
  children: ReactElement | [ReactElement]
};

export const Nav = ({ children }: NavType) => (
  <nav className={navStyles.nav}>
    {children}
  </nav>
);

type NavRightPropType = {
  children: ReactElement | [ReactElement],
  menu: boolean
};

export const NavRight = ({ children, menu }: NavRightPropType) => (
  <nav
    className={classNames(navStyles['nav-right'], {
      [menu]: navStyles['nav-menu']
    })}
  >
    {children}
  </nav>
);

type NavItemPropType = {
  children: ReactElement | [ReactElement]
};

export const NavItem = ({ children }: NavItemPropType) => (
  <nav className={classNames(navStyles['nav-item'])}>
    {children}
  </nav>
);
