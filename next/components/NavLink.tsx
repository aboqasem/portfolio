import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { ReactNode } from 'react';

interface IProps {
  href: string;
  children: ReactNode | ReactNode[];
}

const NavLink = ({ href, children }: IProps): JSX.Element => {
  const { pathname } = useRouter();

  return (
    <Link href={href}>
      <a
        className={`p-3 block md:p-4 hover:text-gray-900 ${
          pathname === href ? 'text-gray-800 pointer-events-none' : ''
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
