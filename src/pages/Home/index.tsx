import React from 'react';
import Hero from './Hero';
import About from './About';
import Education from './Education';
import Achievements from './Achievements';
import Projects from './Projects';
import Contact from './Contact';

const Home = (): JSX.Element => {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Achievements />
      <Projects />
      <Contact />
    </>
  );
};

export default Home;
