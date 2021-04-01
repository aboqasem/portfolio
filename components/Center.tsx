import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode | ReactNode[];
}

const Center = ({ children }: IProps) => {
  const { pathname } = useRouter();

  return (
    <div className={`max-w-2xl mx-auto ${pathname === '/' ? 'pt-14' : 'pt-5'} pb-8 px-10 md:px-0`}>{children}</div>
  );
};

export default Center;
