import { cellsTickSpeed, maxColsOrRowsCount } from "@/components/Settings/GameOfLifeStage/store";
import type { CellInfo } from "@/components/stages/GameOfLifeStage/store";
import {
	cellsColsCount,
	cellsInfos,
	cellsRowsCount,
	setCellDimension,
	setCellsColsCount,
	setCellsInfos,
	setCellsRowsCount,
	setExtraHeight,
	setExtraWidth,
} from "@/components/stages/GameOfLifeStage/store";
import type { Accessor } from "solid-js";
import { batch, createEffect } from "solid-js";

// This is needed to mark the positions as stale if the `ResizeObserver` timeout got cleared before
// updating the positions (i.e. when the stage is unmounted).
let shouldInitPositions: boolean;

let currentStageHeight = Number.NaN;
let currentStageWidth = Number.NaN;

let tickSpeed = 0;

createEffect(() => {
	tickSpeed = cellsTickSpeed();
});

export function startStageAnimation(stage: HTMLDivElement): () => void {
	let initPositionsTimeoutId: number | undefined;

	const initPositionsObserver = new ResizeObserver(() => {
		clearTimeout(initPositionsTimeoutId);

		shouldInitPositions = true;

		initPositionsTimeoutId = setTimeout(
			() => {
				requestAnimationFrame(() => {
					currentStageHeight = stage.parentElement!.offsetHeight;
					currentStageWidth = stage.parentElement!.offsetWidth;
					stage.style.height = `${currentStageHeight}px`;
					stage.style.width = `${currentStageWidth}px`;
					initializePositions();
					shouldInitPositions = false;
				});
			},
			// initialize immediately in the first run
			initPositionsTimeoutId === undefined ? 0 : 100,
		) as unknown as number;
	});
	initPositionsObserver.observe(stage.parentElement!);

	let shouldAnimate = true;

	let tickTimeoutId: ReturnType<typeof setTimeout>;

	const start = () => {
		if (tickSpeed > 0) {
			updatePositions();
		}
		if (shouldAnimate) {
			tickTimeoutId = setTimeout(start, 300 / (tickSpeed || 1000));
		}
	};

	tickTimeoutId = setTimeout(start);

	return () => {
		clearTimeout(tickTimeoutId);
		initPositionsObserver.disconnect();
		clearTimeout(initPositionsTimeoutId);
		shouldAnimate = false;
	};
}

let lastInitStageWidth = Number.NaN;
let lastInitStageHeight = Number.NaN;

function initializePositions() {
	if (currentStageWidth === lastInitStageWidth && currentStageHeight === lastInitStageHeight) {
		return;
	}

	lastInitStageWidth = currentStageWidth;
	lastInitStageHeight = currentStageHeight;

	let iconDimension: number;
	let numColumns: number;
	let numRows: number;
	if (currentStageWidth > currentStageHeight) {
		numColumns = maxColsOrRowsCount;
		iconDimension = Math.ceil(currentStageWidth / numColumns);
		numRows = Math.ceil(currentStageHeight / iconDimension);
	} else {
		numRows = maxColsOrRowsCount;
		iconDimension = Math.ceil(currentStageHeight / numRows);
		numColumns = Math.ceil(currentStageWidth / iconDimension);
	}

	batch(() => {
		setCellDimension(iconDimension);
		setCellsColsCount(numColumns);
		setCellsRowsCount(numRows);
		setExtraWidth(numColumns * iconDimension - currentStageWidth);
		setExtraHeight(numRows * iconDimension - currentStageHeight);
	});
}

// offsets of the neighbors of a cell, hardcoded to avoid the unnecessary overhead of a loop in each tick
// biome-ignore format: looks better
const neighborIndicesOffsets = [
  -1, -1, // top-left
  -1, 0, // top
  -1, 1, // top-right
  0, -1, // left
  0, 1, // right
  1, -1, // bottom-left
  1, 0, // bottom
  1, 1, // bottom-right
] as const;
const neighborIndicesOffsetsLength = 16;
const neighborIndicesOffsetsStep = 2;

let colsCount = Number.NaN;
let rowsCount = Number.NaN;

createEffect(() => {
	colsCount = cellsColsCount();
	rowsCount = cellsRowsCount();
});

function cellIndexAt(col: number, row: number) {
	return row * colsCount + col;
}

function updatePositions() {
	if (shouldInitPositions) {
		// if an initialization is pending
		return;
	}

	batch(updatePositionsBatchFn);
}

const updatePositionsBatchFn: Accessor<void> = () => {
	for (let row = rowsCount - 1; row >= 0; --row) {
		for (let col = colsCount - 1; col >= 0; --col) {
			const cellIndex = cellIndexAt(col, row);

			let aliveNeighbors = 0;
			for (let i = 0; i < neighborIndicesOffsetsLength; i += neighborIndicesOffsetsStep) {
				const neighborRow = row + neighborIndicesOffsets[i]!;
				const neighborCol = col + neighborIndicesOffsets[i + 1]!;
				if (
					neighborRow >= 0 &&
					neighborRow < rowsCount &&
					neighborCol >= 0 &&
					neighborCol < colsCount &&
					cellsInfos[cellIndexAt(neighborCol, neighborRow)]!.alive &&
					++aliveNeighbors > 3
				) {
					break;
				}
			}

			const cellInfo = cellsInfos[cellIndex]!;
			let toLive = cellInfo.alive;

			if (toLive) {
				if (aliveNeighbors < 2 || aliveNeighbors > 3) {
					toLive = false;
				}
			} else if (aliveNeighbors === 3) {
				toLive = true;
			}

			setCellsInfos(cellIndex, "toLive", cellInfo.toLive || toLive);
		}
	}

	for (let row = rowsCount - 1; row >= 0; --row) {
		for (let col = colsCount - 1; col >= 0; --col) {
			const cellIndex = cellIndexAt(col, row);
			setCellsInfos(cellIndex, cellInfoAliveSetter);
		}
	}
};

const cellInfoAliveSetter = (cellInfo: CellInfo) => ({
	alive: cellInfo.toLive,
	toLive: false,
});
