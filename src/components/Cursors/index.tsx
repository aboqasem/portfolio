import { config } from "@/config";
import { utils } from "@/utils";
import BsCursor from "@lib/icons/bs/BsCursor";
import { Entries } from "@solid-primitives/keyed";
import { createReconnectingWS } from "@solid-primitives/websocket";
import { nanoid } from "nanoid";
import { type Component, Show, createSignal, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";

const id = nanoid(5);

const [height, setHeight] = createSignal(window.innerHeight);
const [width, setWidth] = createSignal(window.innerWidth);

const Cursor = (props: { x: number; y: number }) => {
	return (
		<div
			class="absolute pointer-events-none z-10 w-[25px] h-[25px] transition-[top,left] duration-75"
			style={{
				left: `${props.x * width()}px`,
				top: `${props.y * height()}px`,
			}}
		>
			<div class="relative">
				<BsCursor class="size-[25px] fill-white" />
			</div>
		</div>
	);
};

export const Cursors: Component = () => {
	const ws = createReconnectingWS(config.API_WS_HUBS_URL.toString());
	const [clients, setClients] = createStore<{ [key: string]: { i: string; x?: number; y?: number } }>({});
	const clientsArray = () => {
		console.log(Object.values(clients));
		return Object.values(clients);
	};

	onMount(() => {
		const observer = new ResizeObserver(() => {
			setHeight(window.innerHeight);
			setWidth(window.innerWidth);
		});
		observer.observe(document.body);

		const pointerMoveHandler = utils.throttle((ev: PointerEvent) => {
			ws.send(`{"i":"${id}","x":${(ev.clientX / width()).toFixed(2)},"y":${(ev.clientY / height()).toFixed(2)}}`);
		}, 100);
		document.body.addEventListener("pointermove", pointerMoveHandler);

		const pointerLeaveHandler = () => {
			console.log("pointerLeaveHandler");
			ws.send(`{"i":"${id}"}`);
		};
		document.body.addEventListener("pointerleave", pointerLeaveHandler);

		const wsMessageHandler = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			const arr: { i: string; x?: number; y?: number }[] = Array.isArray(data) ? data : [data];
			for (const v of arr) {
				if (v.i === id) continue;
				if (typeof v.x !== "number") {
					setClients((c) => {
						c[v.i] = { i: v.i };
						return c;
					});
					continue;
				}
				setClients(v.i, v as { i: string; x: number; y: number });
			}
		};
		ws.addEventListener("message", wsMessageHandler);

		onCleanup(() => {
			document.body.removeEventListener("pointermove", pointerMoveHandler);
			pointerMoveHandler.cancel();
			document.body.removeEventListener("pointerleave", pointerLeaveHandler);
			// pointerLeaveHandler.cancel();
			observer.disconnect();
			ws.removeEventListener("message", wsMessageHandler);
			ws.close();
		});
	});

	return (
		<Entries of={clients}>
			{(_key, value) => {
				return (
					<Show when={typeof value().x === "number"}>
						<Cursor x={value().x!} y={value().y!} />
					</Show>
				);
			}}
		</Entries>
	);
};
