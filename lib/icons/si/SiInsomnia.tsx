import type { Icon } from '..';

const SiInsomnia: Icon = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{props.title}</title>
      <path
        d="M12 0C5.417 0 0 5.417 0 12s5.417 12 12 12 12-5.417 12-12S18.583 0 12 0zm0 2.478c5.256 0 9.522 4.266 9.522 9.522S17.256 21.522 12 21.522 2.478 17.256 2.478 12c0-.885.12-1.741.347-2.554a4.76 4.76 0 0 0 3.925 2.066 4.764 4.764 0 0 0 4.762-4.762 4.758 4.758 0 0 0-2.067-3.925A9.526 9.526 0 0 1 12 2.478Z"
        stroke="none"
      />
    </svg>
  );
};

export default SiInsomnia;
