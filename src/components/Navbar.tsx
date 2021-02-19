import React, { useEffect, useRef, useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const Navbar = (props: RouteComponentProps): JSX.Element => {
  const { pathname } = props.location;
  const navRef = useRef<HTMLDivElement>(null);
  const [isMedium, setIsMedium] = useState(window.innerWidth < 768);

  const toggleNavMenu = () => {
    // only work on medium view width
    if (isMedium) navRef.current?.classList.toggle('hidden');
  };

  useEffect(() => {
    window.onresize = () => setIsMedium(window.innerWidth < 768);
    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <header className="bg-transparent px-6 py-3 flex flex-wrap items-center md:px-16 md:py-2">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className={`text-xl select-none md:text-3xl ${pathname === '/' && 'pointer-events-none'}`}>
          aboqasem<p className="animate-bounce inline-block ml-2 md:ml-2">🦅</p>
        </Link>
      </div>
      <p onClick={toggleNavMenu} className="text-2xl cursor-pointer block md:hidden">
        <FiMenu />
      </p>

      <nav ref={navRef} className="hidden w-full md:flex md:items-center md:w-auto">
        <ul className="text-lg text-gray-700 items-center justify-between text-center md:text-xl md:flex pt-4 md:pt-0">
          <li>
            <Link
              to="/"
              onClick={toggleNavMenu}
              className={`py-3 px-0 block md:p-4 hover:text-gray-900 ${
                pathname === '/' ? 'text-black pointer-events-none' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={toggleNavMenu}
              className={`py-3 px-0 block md:p-4 hover:text-gray-900 ${
                pathname === '/about' ? 'text-black pointer-events-none' : 'text-gray-700'
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Navbar);
