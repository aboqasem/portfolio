import { maxColsOrRowsCount } from "@/components/Settings/GameOfLifeStage/store";
import { createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type CellInfo = {
	alive: boolean;
	toLive: boolean;
};

const cellsInfosLength = maxColsOrRowsCount * maxColsOrRowsCount;
const initialCellsInfos = new Array<CellInfo>(cellsInfosLength);
for (let i = cellsInfosLength - 1; i >= 0; i--) {
	initialCellsInfos[i] = {
		alive: Math.random() < 0.15,
		toLive: false,
	};
}
export const [cellsInfos, setCellsInfos] = createStore<CellInfo[]>(initialCellsInfos);

export function cellIndexAt(col: number, row: number): number {
	return row * cellsColsCount() + col;
}

export const [cellDimension, setCellDimension] = createSignal<number>(NaN);

export const [cellsColsCount, setCellsColsCount] = createSignal<number>(NaN);

export const [cellsRowsCount, setCellsRowsCount] = createSignal<number>(NaN);

export const maxCellIndex = createMemo(() => cellIndexAt(cellsColsCount() - 1, cellsRowsCount() - 1));

export const [extraWidth, setExtraWidth] = createSignal<number>(NaN);

export const [extraHeight, setExtraHeight] = createSignal<number>(NaN);
