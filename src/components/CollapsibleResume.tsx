import React, { useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ResumePdf from '../assets/Resume_Mohammad_Al_Zouabi.pdf';

const CollapsibleResume = (): JSX.Element => {
  const [isResumeShown, setIsResumeShown] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const toggleResume = () => {
    setIsResumeShown((state) => !state);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className="relative w-full h-full transition-spacing"
        style={{ paddingTop: isResumeShown ? '75%' : '0' }}
        ref={resumeRef}
      >
        <iframe className="w-full h-full absolute left-0 top-0" src={`${ResumePdf}#view=FitV`}></iframe>
      </div>

      <div
        className="w-full flex flex-col items-center text-2xl rounded-b-lg pt-3 cursor-pointer sm:text-3xl md:text-4xl"
        title={`${isResumeShown ? 'Hide Resume' : 'Show Resume'}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
        onClick={toggleResume}
      >
        {isResumeShown ? <IoIosArrowUp className="animate-bounce" /> : <IoIosArrowDown className="animate-bounce" />}
      </div>
    </div>
  );
};

export default CollapsibleResume;
