import { memo } from '@/utils/react/memo';
import { GoMarkGithub } from 'react-icons/go';
import { SiGmail, SiLinkedin, SiTwitter } from 'react-icons/si';

const links = [
  {
    name: 'GitHub',
    icon: GoMarkGithub,
    url: 'https://github.com/aboqasem',
    className: 'hover:text-[#24292E]',
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    url: 'https://www.linkedin.com/in/zouabi',
    className: 'hover:text-[#0D66C2]',
  },
  {
    name: 'Twitter',
    icon: SiTwitter,
    url: 'https://twitter.com/mbalzouabi',
    className: 'hover:text-[#1DA1F2]',
  },
  {
    name: 'Email',
    icon: SiGmail,
    url: 'mailto:mb.alzouabi@gmail.com',
    className: 'hover:text-[#E65A4D]',
  },
];

export default memo(function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <div className="flex flex-col items-center justify-center max-w-2xl px-10 md:px-0">
        <div className="shadow-md rounded-xl bg-gradient-to-tr from-[#E1DFDC] md:shadow-xl backdrop-blur-lg">
          <div className="p-5 sm:p-7 md:p-10">
            <p className="mb-4 text-xl text-[#664A2D] sm:text-2xl md:text-3xl">
              Hey, I&apos;m Mohammad Al Zouabi.
            </p>

            <p className="text-lg sm:text-xl md:text-2xl">
              An enthusiastic software developer who stands for quality, consistency, and attention
              to details.
            </p>

            <div className="grid grid-flow-col-dense mt-4 text-2xl justify-evenly sm:text-4xl">
              {links.map(({ name, url, className, icon: Icon }) => (
                <a
                  key={name}
                  title={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={`focus:outline-none focus:ring-2 border border-transparent focus:ring-[#664A2D] ${className}`}
                >
                  <Icon aria-hidden />
                  <span className="sr-only">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
