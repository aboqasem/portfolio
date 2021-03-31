import React, { useEffect } from 'react';
import { myProjects } from '../common/data';
import Center from '../components/Center';
import Project from '../components/Project';

const About = (): JSX.Element => {
  useEffect(() => {
    document.title = 'About — Mohammad Al Zouabi';

    return () => {
      document.title = 'Mohammad Al Zouabi';
    };
  }, []);

  return (
    <Center>
      <div className="grid grid-cols-1 gap-4 auto-rows-min md:grid-cols-2 md:gap-2">
        <div className="self-center mb-5 text-3xl text-center text-dallas md:text-4xl">Some Mini Side Projects</div>
        {myProjects.map((p, i) => (
          <Project key={i} project={p} />
        ))}
      </div>
    </Center>
  );
};

export default About;
