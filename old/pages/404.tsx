import Head from 'next/head';

import Center from '@/components/Center';

const NotFound = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>

      <Center>
        <p className="text-3xl text-center text-red-800 sm:text-5xl md:text-6xl">Page Not Found</p>
      </Center>
    </>
  );
};

export default NotFound;
