import { ModeSettings } from "@/components/Settings/Mode";
import { Mode, mode } from "@/components/Settings/Mode/store";
import { ThemeSettings } from "@/components/Settings/Theme";
import FiSettings from "@lib/icons/fi/FiSettings";
import type { Component } from "solid-js";
import { Show, Suspense, createEffect, createMemo, createSignal, lazy } from "solid-js";

const GameOfLifeStageSettings = lazy(() =>
	import("@/components/Settings/GameOfLifeStage").then((m) => ({
		default: m.GameOfLifeStageSettings,
	})),
);
const DropsStageSettings = lazy(() =>
	import("@/components/Settings/DropsStage").then((m) => ({
		default: m.DropsStageSettings,
	})),
);

const SettingsElementSkeleton: Component = () => {
	return (
		<div class="animate-pulse p-2">
			<div class="h-4 w-full rounded bg-zinc-300 dark:bg-zinc-700" />

			<div class="mt-1 h-7 rounded bg-zinc-300 dark:bg-zinc-700" />
		</div>
	);
};

export const [isSettingsDisabled, setIsSettingsDisabled] = createSignal(true);

const width = "12rem";

export const Settings: Component = () => {
	const [isShown, setIsShown] = createSignal(false);

	const hint = createMemo(() => `${isShown() ? "Hide" : "Show"} settings`);

	createEffect(() => {
		setIsSettingsDisabled(!isShown());
	});

	return (
		<div
			style={{ "--settings-width": width }}
			class={`fixed top-2 flex animate-bounce-x items-start [animation-iteration-count:2] motion-safe:transition-[right] ${
				isShown() ? "right-0" : "-right-[--settings-width]"
			}`}
		>
			<button
				type="button"
				title={hint()}
				class="group absolute -left-12 inline-flex items-center rounded-l-xl border border-r-0 border-transparent bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:bg-blue-600 dark:text-zinc-100 dark:hover:bg-blue-700"
				onClick={() => setIsShown((show) => !show)}
			>
				<FiSettings class="group h-6 w-6 motion-safe:group-hover:animate-[spin_2s_linear_infinite]" />
				<span class="sr-only">{hint()}</span>
			</button>

			<div class="w-[--settings-width] divide-y rounded-bl-xl border bg-white dark:divide-zinc-500 dark:border-zinc-500 dark:bg-zinc-950">
				<ThemeSettings />

				<ModeSettings />

				<Show when={mode() === Mode.GameOfLife}>
					<Suspense fallback={<SettingsElementSkeleton />}>
						<GameOfLifeStageSettings />
					</Suspense>
				</Show>
				<Show when={mode() === Mode.Drops}>
					<Suspense fallback={<SettingsElementSkeleton />}>
						<DropsStageSettings />
					</Suspense>
				</Show>
			</div>
		</div>
	);
};
