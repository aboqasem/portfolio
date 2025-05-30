export namespace config {
	const API_URL = new URL(import.meta.env.PUB_API_URL);

	export const API_HEALTH_URL = new URL(API_URL);
	API_HEALTH_URL.pathname = import.meta.env.PUB_API_HEALTH_PATH;

	const API_WS_URL = new URL(API_URL);
	API_WS_URL.protocol = API_URL.protocol === "https:" ? "wss:" : "ws:";

	export const API_WS_HUBS_URL = new URL(API_WS_URL);
	API_WS_HUBS_URL.pathname = `/ws${import.meta.env.PUB_API_HUBS_PATH}`;
}
