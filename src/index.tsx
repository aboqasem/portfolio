/* @refresh reload */
import { App } from "@/App";
import "@/styles/globals.css";
import { render } from "solid-js/web";

if (import.meta.env.PROD) {
	import("@piwikpro/tracking-base-library")
		.then(({ default: PiwikPro }) => {
			PiwikPro.initialize(import.meta.env.VITE_PIWIK_CONTAINER_ID, import.meta.env.VITE_PIWIK_CONTAINER_URL);
		})
		.catch(() => {});
}

render(() => <App />, document.getElementById("root")!);
