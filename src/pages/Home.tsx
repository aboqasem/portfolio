import React, { useEffect } from 'react';
import RainStage from '../components/RainStage';
import { myContacts, myTechnologies } from '../common/data';

const Home = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <RainStage icons={myTechnologies} />
      <div
        className="p-5 rounded-xl shadow-md bg-gradient-to-tr from-vista-white md:shadow-xl sm:p-7 md:p-10"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      >
        <p className="text-dallas text-xl mb-4 sm:text-2xl md:text-3xl">Hey, I'm Mohammad Al Zouabi.</p>
        <p className="text-lg sm:text-xl md:text-2xl">
          An enthusiastic software developer who stands for quality, consistency, and attention to details.
        </p>

        <div className="grid text-2xl grid-flow-col-dense justify-evenly mt-4 sm:text-4xl">
          {myContacts.map((c, i) => (
            <a href={c.url} key={`myContacts@${i}`} className={`hover:text-${c.color}`}>
              <c.icon />
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
