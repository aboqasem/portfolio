import React, { useEffect } from 'react';
import { myTechnologiesDropsElements } from '../common/data';
import Rain from '../components/Rain';
import MyCard from '../components/MyCard';
import Center from '../components/Center';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <Center>
      <Rain dropsElements={myTechnologiesDropsElements} />
      <MyCard />
    </Center>
  );
};

export default Home;
