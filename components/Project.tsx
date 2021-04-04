import { BsCodeSlash } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';

import { IProject } from '@/store/commonData';

interface IProps {
  project: IProject;
}

const Project = ({ project: { title, description, preview, previewMp4, url, sourceCode } }: IProps) => {
  return (
    <div className="relative">
      <video className="object-cover w-full h-full shadow-xl rounded-xl" autoPlay loop muted playsInline>
        <source src={preview} type="video/webm" />
        {previewMp4 && <source src={previewMp4} type="video/mp4" />}
        Your browser does not support the <code>video</code> element.
      </video>
      <div
        className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full text-white transition-opacity bg-black opacity-0 cursor-pointer group rounded-xl focus:outline-none focus:opacity-100"
        tabIndex={1}
      >
        <div className="grid grid-flow-row p-4 text-base text-center md:text-lg">
          <p className="font-bold">{title}</p>
          <p>{description}</p>
        </div>
        <div className="grid grid-flow-col">
          {url && (
            <a
              className="m-3 text-3xl rounded-lg pointer-events-none group-focus:pointer-events-auto md:m-2 md:rounded"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              <MdOpenInNew />
            </a>
          )}
          {sourceCode && (
            <a
              className="m-3 text-3xl rounded-lg pointer-events-none group-focus:pointer-events-auto md:m-2 md:rounded"
              href={sourceCode}
              target="_blank"
              rel="noreferrer"
            >
              <BsCodeSlash />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
