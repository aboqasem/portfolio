import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { myTechnologiesIcons } from '../common/data';
import Rain from '../components/Rain';
import MyCard from '../components/MyCard';
import Center from '../components/Center';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <Center>
      <Rain
        dropsElements={myTechnologiesIcons.map((icon) => {
          return renderToStaticMarkup(icon({ className: 'text-2xl sm:text-3xl md:text-4xl' }));
        })}
      />
      <MyCard />
    </Center>
  );
};

export default Home;
