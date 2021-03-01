import React from 'react';
import { BsCodeSlash } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';
import { IProject } from '../common/types';

interface IProps {
  project: IProject;
}

const Project = (props: IProps): JSX.Element => {
  const p = props.project;

  return (
    <div className="relative">
      <video className="object-cover w-full h-full rounded-xl shadow-xl" autoPlay loop muted playsInline>
        <source src={p.preview} type="video/webm" />
        {p.previewMp4 && <source src={p.previewMp4} type="video/mp4" />}
        Your browser does not support the <code>video</code> element.
      </video>
      <div className="text-6xl absolute flex top-0 left-0 w-full h-full opacity-0 rounded-xl bg-black items-center justify-center md:text-3xl hover:opacity-100">
        {p.url && (
          <a className="m-3 text-white rounded-lg md:m-2 md:rounded" href={p.url} target="_blank" rel="noreferrer">
            <MdOpenInNew />
          </a>
        )}
        {p.sourceCode && (
          <a
            className="m-3 text-white rounded-lg md:m-2 md:rounded"
            href={p.sourceCode}
            target="_blank"
            rel="noreferrer"
          >
            <BsCodeSlash />
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
