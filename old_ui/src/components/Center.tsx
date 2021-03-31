import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: ReactNode | ReactNode[];
}

const Center = ({ children }: IProps): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <div className={`max-w-2xl mx-auto ${pathname === '/' ? 'pt-14' : 'pt-5'} pb-8 px-10 md:px-0`}>{children}</div>
  );
};

export default Center;
