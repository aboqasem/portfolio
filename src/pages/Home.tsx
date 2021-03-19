import React, { useEffect } from 'react';
import { myTechnologies } from '../common/data';
import RainStage from '../components/RainStage';
import MyCard from '../components/MyCard';
import Center from '../components/Center';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <Center>
      <RainStage icons={myTechnologies} />
      <MyCard />
    </Center>
  );
};

export default Home;
