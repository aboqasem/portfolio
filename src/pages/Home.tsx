import React, { Component } from 'react';

class Home extends Component {
  // eslint-disable-next-line class-methods-use-this
  render(): JSX.Element {
    return (
      <>
        <p className="text-xl  mb-4 sm:text-2xl md:text-3xl" style={{ color: '#664D33' }}>
          Hey, I'm Mohammad Al Zouabi.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl">
          An enthusiastic software developer who stands for quality, consistency, and attention to details.
        </p>
      </>
    );
  }
}

export default Home;
