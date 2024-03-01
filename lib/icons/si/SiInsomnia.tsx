import type { Icon } from "..";

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
				d="M12.136 3.458a8.542 8.542 0 1 1-7.9 5.286A3.322 3.322 0 1 0 8.88 4.1a8.5 8.5 0 0 1 3.256-.642M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m0 1.22c5.953 0 10.78 4.827 10.78 10.78S17.953 22.78 12 22.78 1.22 17.953 1.22 12 6.047 1.22 12 1.22"
				stroke="none"
			/>
		</svg>
	);
};

export default SiInsomnia;
