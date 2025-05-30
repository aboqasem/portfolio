import { Background } from "@/components/Background";
import { Settings } from "@/components/Settings";
import { Home } from "@/pages";
import { type Component, lazy } from "solid-js";

const Cursors = lazy(() =>
	import("@/components/Cursors").then((m) => ({
		default: m.Cursors,
	})),
);

export const App: Component = () => {
	return (
		<>
			<Background />

			<Home />

			<Settings />

			<Cursors />
		</>
	);
};
