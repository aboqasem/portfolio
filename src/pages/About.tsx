import React, { useEffect } from 'react';
import { myProjects } from '../common/data';

const About = (): JSX.Element => {
  useEffect(() => {
    document.title = 'About — Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 auto-rows-min">
        <div className="text-dallas text-3xl self-center text-center mb-5 md:text-4xl">Some Mini Side Projects</div>
        {myProjects.map((p, i) => (
          <a href={p.sourceCode || p.url} target="_blank" rel="noreferrer" key={`myProjects@${i}`}>
            <video className="object-cover w-full h-full rounded-xl shadow-xl" autoPlay loop muted playsInline>
              <source src={p.preview} type="video/webm" />
              {p.previewMp4 && <source src={p.previewMp4} type="video/mp4" />}
              Your browser does not support the <code>video</code> element.
            </video>
          </a>
        ))}
      </div>
    </>
  );
};

export default About;
