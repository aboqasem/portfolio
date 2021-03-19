import React, { useEffect } from 'react';
import Center from './Center';

const NotFound = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return (
    <Center>
      <p className="text-3xl text-center text-red-800 sm:text-5xl md:text-6xl">Page Not Found</p>
    </Center>
  );
};

export default NotFound;
