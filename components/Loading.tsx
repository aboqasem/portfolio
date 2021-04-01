import React from 'react';

import LoadingIcon from '@/svgs/LoadingIcon';

import Center from './Center';

const Loading = (): JSX.Element => {
  return (
    <Center>
      <div className="flex justify-center">
        <LoadingIcon className="w-1/6 animate-spin h-1/6 sm:w-1/5 sm:h-1/5 md:w-1/4 md:h-1/4" />
      </div>
    </Center>
  );
};

export default Loading;
