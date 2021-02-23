import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <header
      className="bg-transparent px-6 py-3 flex flex-wrap md:px-14 md:py-4"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div className="flex-1 flex items-center select-none">
        <Link to="/" className={`text-xl sm:text-2xl md:text-3xl ${pathname === '/' && 'pointer-events-none'}`}>
          aboqasem<p className="animate-bounce inline-block pl-2">🦅</p>
        </Link>
      </div>

      <nav className="w-auto flex text-gray-700 select-none">
        <ul className="text-lg flex sm:text-xl md:text-2xl">
          <li>
            <Link to="/" className={`p-3 block md:p-4 hover:text-gray-900 ${pathname === '/' && 'hidden'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={`p-3 block md:p-4 hover:text-gray-900 ${pathname === '/about' && 'hidden'}`}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
