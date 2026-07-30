import type { Icon } from "..";

const VscVscode: Icon = (props) => {
	return (
		<svg
			stroke="currentColor"
			fill="currentColor"
			stroke-width="0"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>{props.title}</title>
			<path
				d="M15.434 1.729 12.14.145a1 1 0 0 0-.431-.098c-.356 0-.529.165-.554.182a.7.7 0 0 0-.151.11l-6.306 5.75-2.747-2.084a.664.664 0 0 0-.851.038l-.881.8a.665.665 0 0 0-.001.986L2.6 8 .217 10.17a.665.665 0 0 0 .001.985l.881.802a.665.665 0 0 0 .851.038l2.747-2.084 6.306 5.75s.069.068.152.11c.024.017.198.18.554.18a1 1 0 0 0 .432-.097l3.294-1.584a1 1 0 0 0 .566-.901V2.629a1 1 0 0 0-.566-.901zm-8.217 6.27 4.785-3.63v7.26z"
				stroke="none"
			/>
		</svg>
	);
};

export default VscVscode;
