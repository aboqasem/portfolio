import { memo } from '@/utils/react/memo';
import { FaLinkedinIn } from 'react-icons/fa';
import { GoMarkGithub } from 'react-icons/go';
import { SiGmail, SiTwitter } from 'react-icons/si';

const links = [
  {
    name: 'GitHub',
    icon: GoMarkGithub,
    url: 'https://github.com/aboqasem',
    className: 'text-white bg-[#24292E]',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/in/zouabi',
    className: 'text-white bg-[#0D66C2]',
  },
  {
    name: 'Twitter',
    icon: SiTwitter,
    url: 'https://twitter.com/mbalzouabi',
    className: 'text-white bg-[#1DA1F2]',
  },
  {
    name: 'Email',
    icon: SiGmail,
    url: 'mailto:mb.alzouabi@gmail.com',
    className: 'text-white bg-[#E65A4D]',
  },
];

export default memo(function Home() {
  return (
    <div className="absolute w-full max-w-2xl px-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:px-0">
      <div className="p-5 font-serif shadow-md rounded-xl bg-gradient-to-tr from-zinc-200/90 dark:from-zinc-900 dark:to-zinc-100/10 md:shadow-xl backdrop-blur-lg sm:p-7 md:p-10">
        <p className="mb-4 text-xl text-zinc-800 sm:text-2xl md:text-3xl dark:text-zinc-50">
          Hey, I&apos;m Mohammad Al Zouabi.
        </p>

        <p className="text-lg sm:text-xl md:text-2xl text-zinc-700 dark:text-zinc-300">
          An enthusiastic software developer who stands for quality, consistency, and attention to
          details.
        </p>

        <div className="grid grid-flow-col-dense mt-4 text-2xl justify-evenly sm:text-4xl">
          {links.map(({ name, url, className, icon: Icon }) => (
            <a
              key={name}
              title={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              className={`p-1.5 rounded-lg border border-transparent hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8" aria-hidden />
              <span className="sr-only">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});
