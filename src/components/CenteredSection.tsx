import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode | ReactNode[];
}

const CenteredSection = (props: IProps): JSX.Element => {
  return <div className="max-w-xl mx-auto py-14 px-10 md:px-0">{props.children}</div>;
};

export default CenteredSection;
