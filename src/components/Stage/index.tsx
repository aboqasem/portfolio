import { icons } from '@/components/Stage/icons';
import { dropsInfos, setDropsInfos, startStageAnimation } from '@/components/Stage/store';
import { Component, Index, onCleanup, onMount } from 'solid-js';

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
            <icon.Icon
              title={icon.desc}
              class="absolute w-6 h-6 select-none sm:w-8 sm:h-8 xl:w-9 xl:h-9 md:text-4xl text-zinc-900 dark:text-zinc-50"
              style={{
                top: `${dropInfo()!.position.top}px`,
                left: `${dropInfo()!.position.left}px`,
              }}
              onMouseOver={() => {
                setDropsInfos(i, 'hover', true);
              }}
              onMouseOut={() => {
                setDropsInfos(i, 'hover', false);
              }}
            />
          );
        }}
      </Index>
    </div>
  );
};
