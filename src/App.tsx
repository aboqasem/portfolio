import type { Component } from "solid-js";
import { Background } from "@/components/Background";
import { Settings } from "@/components/Settings";
import { Home } from "@/pages";

export const App: Component = () => {
	return (
		<>
			<Background />

			<Home />

			<Settings />
		</>
	);
};
