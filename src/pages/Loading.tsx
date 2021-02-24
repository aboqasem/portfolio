import React from 'react';
import LoadingIcon from '../svgs/LoadingIcon';

const Loading = (): JSX.Element => {
  return (
    <div className="flex justify-center">
      <LoadingIcon className="w-16 h-16 animate-spin sm:w-20 sm:h-20 md:w-24 md:h-24" />
    </div>
  );
};

export default Loading;
