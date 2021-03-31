import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IProps {
  to: string;
  children: ReactNode | ReactNode[];
}

const NavLink = ({ to, children }: IProps): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={`p-3 block md:p-4 hover:text-gray-900 ${pathname === to ? 'text-gray-800 pointer-events-none' : ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
