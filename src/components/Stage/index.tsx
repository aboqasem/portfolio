import { icons } from '@/components/Stage/icons';
import { startStageAnimation } from '@/components/Stage/logic';
import { dropsInfos, setDropsInfos } from '@/store/stage';
import type { Component } from 'solid-js';
import { Index, onCleanup, onMount } from 'solid-js';

export const Stage: Component = () => {
  let stage: HTMLDivElement | undefined;

  onMount(() => {
    const stop = startStageAnimation(stage!);

    onCleanup(stop);
  });

  return (
    <div ref={stage} class="absolute inset-0 w-full h-full">
      <Index each={dropsInfos}>
        {(dropInfo, i) => {
          const icon = icons[i]!;

          return (
            <div
              class="absolute w-6 h-6 select-none sm:w-8 sm:h-8 xl:w-9 xl:h-9 md:text-4xl text-zinc-900 dark:text-zinc-50"
              style={{
                top: `${dropInfo().position.top}px`,
                left: `${dropInfo().position.left}px`,
              }}
              onMouseOver={() => {
                setDropsInfos(i, 'hover', true);
              }}
              onMouseOut={() => {
                setDropsInfos(i, 'hover', false);
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
