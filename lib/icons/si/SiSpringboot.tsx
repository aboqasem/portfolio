import type { Icon } from '..';

const SiSpringboot: Icon = (props) => {
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
        d="m23.693 10.706-4.73-8.185c-.41-.71-1.417-1.294-2.24-1.294h-9.45c-.82 0-1.831.584-2.24 1.294L.306 10.706c-.41.71-.41 1.873 0 2.584l4.725 8.189c.41.71 1.417 1.294 2.24 1.294h9.455c.82 0 1.826-.584 2.24-1.294l4.726-8.19c.41-.71.41-1.873 0-2.583zM10.976 5.755c0-.537.438-.975.974-.975s.975.438.975.975v5.821a.976.976 0 0 1-1.948 0zm.974 12.43a6.616 6.616 0 0 1-6.607-6.609A6.638 6.638 0 0 1 8.01 6.272a.866.866 0 0 1 1.214.18.866.866 0 0 1-.178 1.213 4.876 4.876 0 0 0 5.812 7.827 4.875 4.875 0 0 0 1.967-3.916 4.897 4.897 0 0 0-1.986-3.925.87.87 0 0 1-.183-1.214.87.87 0 0 1 1.214-.183 6.631 6.631 0 0 1 2.687 5.322 6.613 6.613 0 0 1-6.608 6.608z"
        stroke="none"
      />
    </svg>
  );
};

export default SiSpringboot;
