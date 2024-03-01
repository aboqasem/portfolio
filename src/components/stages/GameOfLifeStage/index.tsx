import { ICONS_LENGTH, icons } from "@/components/stages/DropsStage/icons";
import { startStageAnimation } from "@/components/stages/GameOfLifeStage/logic";
import {
	cellDimension,
	cellsColsCount,
	cellsInfos,
	extraHeight,
	extraWidth,
	maxCellIndex,
	setCellsInfos,
} from "@/components/stages/GameOfLifeStage/store";
import type { Component } from "solid-js";
import { Index, Show, onCleanup, onMount } from "solid-js";

export const GameOfLifeStage: Component = () => {
	let stage: HTMLDivElement | undefined;

	onMount(() => {
		const touchMoveHandler = (e: TouchEvent) => {
			if (e.touches.length !== 1) {
				return;
			}

			e.preventDefault();

			const { clientX, clientY } = e.touches[0]!;

			document.elementsFromPoint(clientX, clientY).find((el) => {
				if (!(el instanceof HTMLDivElement)) {
					return false;
				}

				const cellIndex = Number(el.dataset.cellIndex);
				if (Number.isNaN(cellIndex)) {
					return false;
				}

				!cellsInfos[cellIndex]?.alive && setCellsInfos(cellIndex, "toLive", true);

				return true;
			});
		};

		stage!.addEventListener("touchmove", touchMoveHandler, { passive: false });

		const stop = startStageAnimation(stage!);

		onCleanup(() => {
			stage!.removeEventListener("touchmove", touchMoveHandler);

			stop();
		});
	});

	let holdingPress = false;

	return (
		<div
			ref={stage}
			class="absolute inset-0 grid cursor-cell place-content-start place-items-start"
			style={{
				"margin-top": `-${extraHeight() / 2}px`,
				"margin-left": `-${extraWidth() / 2}px`,
				"grid-template-columns": `repeat(${cellsColsCount()}, ${cellDimension()}px)`,
			}}
			onMouseDown={() => {
				holdingPress = true;
			}}
			onMouseUp={() => {
				holdingPress = false;
			}}
			onMouseLeave={() => {
				holdingPress = false;
			}}
		>
			<Show when={!Number.isNaN(maxCellIndex())}>
				<Index each={cellsInfos}>
					{(cellInfo, i) => {
						const icon = icons[i % ICONS_LENGTH]!;

						return (
							<Show when={i <= maxCellIndex()}>
								{/* biome-ignore lint/a11y/useKeyWithMouseEvents: This is a mouse-only interaction */}
								<div
									data-cell-index={i}
									class="select-none p-[10%] ring-[0.25px] ring-zinc-900/60 dark:ring-zinc-50/60 sm:p-[14%]"
									classList={{
										"bg-zinc-900 text-zinc-50 dark:text-zinc-900 dark:bg-zinc-50":
											cellInfo().alive || cellInfo().toLive,
										"opacity-70": cellInfo().toLive,
									}}
									style={{
										width: `${cellDimension()}px`,
										height: `${cellDimension()}px`,
									}}
									onMouseDown={() => {
										!cellInfo().alive && setCellsInfos(i, "toLive", true);
									}}
									onMouseOver={() => {
										holdingPress && !cellInfo().alive && setCellsInfos(i, "toLive", true);
									}}
								>
									<Show when={cellInfo().alive || cellInfo().toLive}>
										<icon.Icon title={icon.desc} />
									</Show>
								</div>
							</Show>
						);
					}}
				</Index>
			</Show>
		</div>
	);
};
