import React, { useEffect } from 'react';
import RainStage from '../components/RainStage';
import { myTechnologies } from '../common/data';
import MyCard from '../components/MyCard';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <RainStage icons={myTechnologies} />
      <MyCard />
    </>
  );
};

export default Home;
