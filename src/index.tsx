/* @refresh reload */
import { App } from "@/App";
import "@/styles/globals.css";
import PiwikPro from "@piwikpro/tracking-base-library";
import { render } from "solid-js/web";

if (import.meta.env.PROD) {
	PiwikPro.initialize(import.meta.env.VITE_PIWIK_CONTAINER_ID, import.meta.env.VITE_PIWIK_CONTAINER_URL);
}

render(() => <App />, document.getElementById("root")!);
