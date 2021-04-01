import Head from 'next/head';
import { useSelector } from 'react-redux';

import { Project } from '@/components';
import Center from '@/components/Center';
import { selectCommonDataState } from '@/store';

const About = () => {
  const { projects } = useSelector(selectCommonDataState);

  return (
    <>
      <Head>
        <title>About — Mohammad Al Zouabi</title>
      </Head>
      <Center>
        <div className="grid grid-cols-1 gap-4 auto-rows-min md:grid-cols-2 md:gap-2">
          <div className="self-center mb-5 text-3xl text-center text-dallas md:text-4xl">Some Mini Side Projects</div>
          {projects.map((p, i) => (
            <Project key={i} project={p} />
          ))}
        </div>
      </Center>
    </>
  );
};

export default About;
