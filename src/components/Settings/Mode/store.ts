import type { Setter } from "solid-js";
import { createSignal } from "solid-js";

const MODE_KEY = "mode";

export enum Mode {
  GameOfLife = "GameOfLife",
  Drops = "Drops",
}

const [mode, _setMode] = createSignal<Mode>(storeMode());

const setMode: Setter<Mode> = (value) => {
  return _setMode((prev) => storeMode(typeof value === "function" ? value(prev) : value));
};

export { mode, setMode };

function storeMode(mode?: Mode): Mode {
  if (!mode) {
    const storedMode = localStorage.getItem(MODE_KEY);

    mode = storedMode === Mode.Drops ? Mode.Drops : Mode.GameOfLife;
  }

  localStorage.setItem(MODE_KEY, mode);

  return mode;
}
