import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLink from './NavLink';
import LogoImg from '../assets/logo.png';

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <header
      className="bg-transparent px-6 py-3 flex flex-wrap md:px-14 md:py-4"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div className="flex-1 flex items-center select-none">
        <Link
          to="/"
          className={`font-nova-mono text-kilamanjaro text-lg sm:text-3xl md:text-4xl ${
            pathname === '/' ? 'pointer-events-none' : ''
          }`}
        >
          {'{ '}
          <img className="h-8 sm:h-10 md:h-12 inline-block transform -translate-y-1" src={LogoImg} alt="Logo" />
          {' }'}
        </Link>
      </div>

      <nav className="w-auto flex text-gray-700 select-none">
        <ul className="text-sm flex sm:text-xl md:text-2xl">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
