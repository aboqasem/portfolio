import Link from 'next/link';

import NavLink from './NavLink';

const Navbar = () => {
  return (
    <header
      className="flex flex-wrap px-6 py-3 bg-transparent md:px-14 md:py-4"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center flex-1 select-none">
        <Link href="/">
          <a className="text-lg font-nova-mono text-kilamanjaro sm:text-3xl md:text-4xl">
            {'{ '}
            <img
              className="inline-block h-8 transform -translate-y-1 sm:h-10 md:h-12"
              src="/assets/logo.png"
              alt="Logo"
            />
            {' }'}
          </a>
        </Link>
      </div>

      <nav className="flex w-auto text-gray-700 select-none">
        <ul className="flex text-sm sm:text-xl md:text-2xl">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink href="/blog">Blog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
