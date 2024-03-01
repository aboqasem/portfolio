import { icons } from "@/components/stages/DropsStage/icons";
import { startStageAnimation } from "@/components/stages/DropsStage/logic";
import { dropsInfos, setDropsInfos } from "@/components/stages/DropsStage/store";
import type { Component } from "solid-js";
import { Index, onCleanup, onMount } from "solid-js";

export const DropsStage: Component = () => {
	let stage: HTMLDivElement | undefined;

	onMount(() => {
		const stop = startStageAnimation(stage!);

		onCleanup(stop);
	});

	return (
		<div ref={stage} class="absolute inset-0 h-full w-full">
			<Index each={dropsInfos}>
				{(dropInfo, i) => {
					const icon = icons[i]!;

					return (
						// biome-ignore lint/a11y/useKeyWithMouseEvents: This is a mouse-only interaction
						<div
							class="absolute h-6 w-6 select-none text-zinc-900 dark:text-zinc-50 sm:h-8 sm:w-8 md:text-4xl xl:h-9 xl:w-9"
							style={{
								top: `${dropInfo().position.top}px`,
								left: `${dropInfo().position.left}px`,
							}}
							onMouseOver={() => {
								setDropsInfos(i, "hover", true);
							}}
							onMouseOut={() => {
								setDropsInfos(i, "hover", false);
							}}
						>
							<icon.Icon title={icon.desc} />
						</div>
					);
				}}
			</Index>
		</div>
	);
};
