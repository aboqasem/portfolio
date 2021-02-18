import React from 'react';
import { myInformation } from '../common/data';

const About = (): JSX.Element => {
  return (
    <>
      <p>Software engineering student who is eager to learn. Here is some information about me:</p>
      <br />
      <ul>
        {myInformation.map((v, i) => (
          <li key={`myInformation@${i}`}>{v.text}</li>
        ))}
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
    </>
  );
};

export default About;
