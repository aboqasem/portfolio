import BsChevronDown from '@lib/icons/bs/BsChevronDown';
import FaLinkedinIn from '@lib/icons/fa/FaLinkedinIn';
import GoMarkGithub from '@lib/icons/go/GoMarkGithub';
import SiGmail from '@lib/icons/si/SiGmail';
import SiTwitter from '@lib/icons/si/SiTwitter';
import { createSignal, For } from 'solid-js';

const links = [
  {
    name: 'GitHub',
    Icon: GoMarkGithub,
    url: 'https://github.com/aboqasem',
    class: 'text-white bg-[#24292E]',
  },
  {
    name: 'LinkedIn',
    Icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/in/zouabi',
    class: 'text-white bg-[#0D66C2]',
  },
  {
    name: 'Twitter',
    Icon: SiTwitter,
    url: 'https://twitter.com/mbalzouabi',
    class: 'text-white bg-[#1DA1F2]',
  },
  {
    name: 'Email',
    Icon: SiGmail,
    url: 'mailto:mb.alzouabi@gmail.com',
    class: 'text-white bg-[#E65A4D]',
  },
];

export function Home() {
  const [isShowing, setIsShowing] = createSignal(true);

  return (
    <div
      class="fixed left-1/2 w-full max-w-2xl -translate-x-1/2 px-10 motion-safe:transition-[top,transform] md:px-0"
      classList={{
        'top-1/2 -translate-y-1/2': isShowing(),
        'top-full -translate-y-[1.5rem] md:-translate-y-[2rem]': !isShowing(),
      }}
    >
      <div class="relative rounded-xl bg-gradient-to-tr from-zinc-200/90 p-5 !pt-11 font-serif shadow-md backdrop-blur-lg dark:from-zinc-900 dark:to-zinc-100/10 sm:p-7 sm:!pt-[3.25rem] md:p-10 md:!pt-16 md:shadow-xl">
        <h1 class="mb-4 text-xl text-zinc-800 dark:text-zinc-50 sm:text-2xl md:text-3xl">
          Hey, I&apos;m Mohammad Al Zouabi.
        </h1>

        <p class="text-lg text-zinc-700 dark:text-zinc-300 sm:text-xl md:text-2xl">
          An enthusiastic software engineer who stands for quality, consistency, and attention to
          details.
        </p>

        <div class="mt-4 grid grid-flow-col-dense justify-evenly text-2xl sm:text-4xl">
          <For each={links}>
            {({ name, url, class: className, Icon }) => (
              <a
                title={name}
                href={isShowing() ? url : undefined}
                target="_blank"
                rel="noreferrer"
                class={`rounded-lg border border-transparent p-1.5 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
              >
                <Icon class="h-6 w-6 md:h-8 md:w-8" aria-hidden />
                <span class="sr-only">{name}</span>
              </a>
            )}
          </For>
        </div>

        <button
          type="button"
          class="absolute left-0 top-0 flex w-full items-center justify-center rounded-t-xl bg-zinc-400 bg-opacity-20 text-zinc-700 ring-inset focus:outline-none focus:ring-2 focus:ring-blue-500 motion-safe:transition-[transform] dark:text-zinc-300"
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          <span class="sr-only">{isShowing() ? 'Hide' : 'Show'}</span>
          <BsChevronDown
            class="h-6 w-6 scale-x-[1.1] scale-y-[0.9] ease-in-out motion-safe:transition-[transform] md:h-8 md:w-8"
            classList={{
              '-scale-y-[0.9]': !isShowing(),
            }}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}
