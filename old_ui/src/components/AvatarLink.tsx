import React from 'react';

interface IProps {
  lg?: boolean;
}

const AvatarLink = ({ lg }: IProps): JSX.Element => {
  return (
    <a
      className="flex items-center text-black no-underline hover:underline"
      href="https://github.com/aboqasem"
      target="_blank"
      rel="noreferrer"
    >
      <img
        alt="Me"
        className={`block rounded-full ${lg ? 'h-10 md:h-12' : 'h-8 md:h-10'}`}
        src="https://github.com/aboqasem.png?size=96"
      />
      <p className={`ml-2 ${lg ? 'text-base md:text-xl' : 'text-sm md:text-lg'}`}>aboqasem</p>
    </a>
  );
};

export default AvatarLink;
