import React from 'react';
import { myInformation } from '../common/data';

const About = (): JSX.Element => {
  return (
    <div>
      Software engineering student who is eager to learn. Here is some information about me:
      <br />
      <ul>
        {myInformation.map((value, i) => {
          return <li key={`myInformation@${i}`}>{value.text}</li>;
        })}
      </ul>
      <div>
        <a
          href="https://drive.google.com/file/d/1BC5VROktcMhvsBnkWtApbYVd7gO882o_/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          View Resume
        </a>
      </div>
    </div>
  );
};

export default About;
