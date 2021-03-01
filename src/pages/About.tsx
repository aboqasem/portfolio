import React, { useEffect } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import { BsCodeSlash } from 'react-icons/bs';
import { myProjects } from '../common/data';

const About = (): JSX.Element => {
  useEffect(() => {
    document.title = 'About — Mohammad Al Zouabi';
  }, []);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 auto-rows-min md:grid-cols-2 md:gap-2">
        <div className="text-dallas text-3xl self-center text-center mb-5 md:text-4xl">Some Mini Side Projects</div>
        {myProjects.map((p, i) => (
          <div className="relative" key={i}>
            <video className="object-cover w-full h-full rounded-xl shadow-xl" autoPlay loop muted playsInline>
              <source src={p.preview} type="video/webm" />
              {p.previewMp4 && <source src={p.previewMp4} type="video/mp4" />}
              Your browser does not support the <code>video</code> element.
            </video>
            <div className="text-6xl absolute flex top-0 left-0 w-full h-full opacity-0 rounded-xl bg-black items-center justify-center md:text-3xl hover:opacity-100">
              {p.url && (
                <a
                  className="m-3 text-white rounded-lg md:m-2 md:rounded focus:outline-none"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MdOpenInNew />
                </a>
              )}
              {p.sourceCode && (
                <a
                  className="m-3 text-white rounded-lg md:m-2 md:rounded focus:outline-none"
                  href={p.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsCodeSlash />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
