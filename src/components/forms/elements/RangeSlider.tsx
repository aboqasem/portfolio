import { CustomEvent } from "@piwikpro/tracking-base-library";
import type { Component } from "solid-js";
import { createMemo, createUniqueId, onCleanup, onMount } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";

export type RangeSliderProps = JSX.IntrinsicElements["input"] & {
	label: string;
};

export const RangeSlider: Component<RangeSliderProps> = (props) => {
	const id = createMemo(() => props.id ?? createUniqueId());
	let inputElRef: HTMLInputElement | undefined;

	onMount(() => {
		const inputEl = inputElRef!;
		const abortController = new AbortController();

		inputEl.addEventListener(
			"input",
			() => CustomEvent.trackEvent("Slider", "Change", props.label, inputEl.valueAsNumber),
			{ signal: abortController.signal },
		);

		onCleanup(() => abortController.abort());
	});

	return (
		<div>
			<label for={id()} class="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
				{props.label}
			</label>

			<div class="mt-1">
				<input
					ref={inputElRef}
					type="range"
					class={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 ${props.class}`}
					{...props}
					id={id()}
				/>
			</div>
		</div>
	);
};
