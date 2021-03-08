import React, { useEffect } from 'react';
import { myTechnologies } from '../common/data';
import RainStage from '../components/RainStage';
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
