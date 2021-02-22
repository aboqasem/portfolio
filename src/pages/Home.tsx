import React, { useEffect } from 'react';
import RainStage from '../components/RainStage';
import { myTechnologies } from '../common/data';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <RainStage icons={myTechnologies} />
      <div
        className="p-5 rounded-xl shadow-md bg-gradient-to-br from-vista-white via-transparent to-vista-white md:shadow-xl sm:p-7 md:p-10"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <p className="text-dallas text-xl mb-4 sm:text-2xl md:text-3xl">Hey, I'm Mohammad Al Zouabi.</p>
        <p className="text-lg sm:text-xl md:text-2xl">
          An enthusiastic software developer who stands for quality, consistency, and attention to details.
        </p>
      </div>
    </>
  );
};

export default Home;
