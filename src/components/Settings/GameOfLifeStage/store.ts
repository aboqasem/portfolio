import type { Setter } from "solid-js";
import { createSignal } from "solid-js";

const GOL_TICK_SPEED_KEY = "golTickSpeed";

export const maxColsOrRowsCount = (() => {
	const windowWidth = window.innerWidth;
	const isSm = windowWidth <= 640;
	const isMd = windowWidth <= 768;
	const isLg = windowWidth <= 1024;

	return isSm ? 35 : isMd ? 40 : isLg ? 45 : 50;
})();

export const minTickSpeed = 0;

export const maxTickSpeed = 10;

export const tickSpeedStep = 1;

const defaultTickSpeed = window.matchMedia("(prefers-reduced-motion)").matches ? 0 : 4;

const [cellsTickSpeed, _setCellsTickSpeed] = createSignal<number>(storeCellsTickSpeed());

const setCellsTickSpeed: Setter<number> = (value) => {
	return _setCellsTickSpeed((prev) => storeCellsTickSpeed(typeof value === "function" ? value(prev) : value));
};

export { cellsTickSpeed, setCellsTickSpeed };

function storeCellsTickSpeed(speed?: number): number {
	if (typeof speed !== "number" || Number.isNaN(speed)) {
		const storedSpeed = +(localStorage.getItem(GOL_TICK_SPEED_KEY) ?? Number.NaN);

		speed = Number.isNaN(storedSpeed) ? defaultTickSpeed : storedSpeed;
	}

	speed = Math.max(minTickSpeed, Math.min(maxTickSpeed, speed));

	localStorage.setItem(GOL_TICK_SPEED_KEY, speed.toString());

	return speed;
}
