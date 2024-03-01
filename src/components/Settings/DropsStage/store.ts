import type { Setter } from "solid-js";
import { createSignal } from "solid-js";

const DROPS_SPEED_KEY = "dropsSpeed";

export const minDropsSpeed = 0;

export const maxDropsSpeed = 40;

export const dropsSpeedStep = maxDropsSpeed / 10;

const defaultDropsSpeed = window.matchMedia("(prefers-reduced-motion)").matches ? 0 : dropsSpeedStep;

const [dropsSpeed, _setDropsSpeed] = createSignal<number>(storeDropsSpeed());

const setDropsSpeed: Setter<number> = (value) => {
	return _setDropsSpeed((prev) => storeDropsSpeed(typeof value === "function" ? value(prev) : value));
};

export { dropsSpeed, setDropsSpeed };

function storeDropsSpeed(speed?: number): number {
	if (typeof speed !== "number" || Number.isNaN(speed)) {
		const storedDropSpeed = +(localStorage.getItem(DROPS_SPEED_KEY) ?? NaN);

		speed = Number.isNaN(storedDropSpeed) ? defaultDropsSpeed : storedDropSpeed;
	}

	speed = Math.max(minDropsSpeed, Math.min(maxDropsSpeed, speed));

	localStorage.setItem(DROPS_SPEED_KEY, speed.toString());

	return speed;
}
