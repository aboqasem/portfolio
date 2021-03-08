import React from 'react';
import { myContacts } from '../common/data';
import CollapsibleResume from './CollapsibleResume';

const MyCard = (): JSX.Element => {
  return (
    <div
      className="rounded-xl shadow-md bg-gradient-to-tr from-vista-white md:shadow-xl"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div className="p-5 sm:p-7 md:p-10">
        <p className="text-dallas text-xl mb-4 sm:text-2xl md:text-3xl">Hey, I'm Mohammad Al Zouabi.</p>
        <p className="text-lg sm:text-xl md:text-2xl">
          An enthusiastic software developer who stands for quality, consistency, and attention to details.
        </p>

        <div className="grid text-2xl grid-flow-col-dense justify-evenly mt-4 sm:text-4xl">
          {myContacts.map((c, i) => (
            <a href={c.url} target="_blank" rel="noreferrer" key={i} className={`hover:text-${c.color}`}>
              <c.icon />
            </a>
          ))}
        </div>
      </div>
      <CollapsibleResume />
    </div>
  );
};

export default MyCard;
