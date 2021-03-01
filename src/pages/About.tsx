import React, { useEffect } from 'react';
import { myProjects } from '../common/data';
import Project from '../components/Project';

const About = (): JSX.Element => {
  useEffect(() => {
    document.title = 'About — Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-2">
        <div className="text-dallas text-3xl self-center text-center mb-5 md:text-4xl">Some Mini Side Projects</div>
        {myProjects.map((p, i) => (
          <Project key={i} project={p} />
        ))}
      </div>
    </>
  );
};

export default About;
