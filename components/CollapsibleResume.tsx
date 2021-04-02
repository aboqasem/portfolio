import { useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const CollapsibleResume = () => {
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
        <iframe className="absolute top-0 left-0 w-full h-full" src="/assets/Resume.pdf#view=FitV"></iframe>
      </div>

      <div
        className="flex flex-col items-center w-full pt-3 text-2xl rounded-b-lg cursor-pointer sm:text-3xl md:text-4xl"
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
