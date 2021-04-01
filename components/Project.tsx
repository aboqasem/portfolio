import { BsCodeSlash } from 'react-icons/bs';
import { MdOpenInNew } from 'react-icons/md';

import { IProject } from '@/store/commonData';

interface IProps {
  project: IProject;
}

const Project = ({ project: { preview, previewMp4, url, sourceCode } }: IProps) => {
  return (
    <div className="relative">
      <video className="object-cover w-full h-full shadow-xl rounded-xl" autoPlay loop muted playsInline>
        <source src={preview} type="video/webm" />
        {previewMp4 && <source src={previewMp4} type="video/mp4" />}
        Your browser does not support the <code>video</code> element.
      </video>
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-6xl transition-opacity bg-black opacity-0 rounded-xl md:text-3xl hover:opacity-100">
        {url && (
          <a className="m-3 text-white rounded-lg md:m-2 md:rounded" href={url} target="_blank" rel="noreferrer">
            <MdOpenInNew />
          </a>
        )}
        {sourceCode && (
          <a className="m-3 text-white rounded-lg md:m-2 md:rounded" href={sourceCode} target="_blank" rel="noreferrer">
            <BsCodeSlash />
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
