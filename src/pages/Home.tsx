import React, { Component } from 'react';
import RainStage from '../components/RainStage';

export class Home extends Component {
  render = (): JSX.Element => {
    return (
      <>
        <RainStage />
        <div className="p-5 rounded-xl shadow-md md:shadow-xl sm:p-7 md:p-10" style={{ backdropFilter: 'blur(8px)' }}>
          <p className="text-xl  mb-4 sm:text-2xl md:text-3xl" style={{ color: '#664D33' }}>
            Hey, I'm Mohammad Al Zouabi.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl">
            An enthusiastic software developer who stands for quality, consistency, and attention to details.
          </p>
        </div>
      </>
    );
  };
}

export default Home;
