import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode | ReactNode[];
}

const CenteredSection = (props: IProps): JSX.Element => {
  return <div className="mx-10 my-14 max-w-xl md:mx-auto">{props.children}</div>;
};

export default CenteredSection;
