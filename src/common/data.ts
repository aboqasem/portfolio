import {
  SiJavascript,
  SiDart,
  SiCplusplus,
  SiC,
  SiJava,
  SiGnubash,
  SiMongodb,
  SiArduino,
  SiNodeDotJs,
  SiFlutter,
  SiReact,
  SiRust,
  SiLinkedin,
  SiWhatsapp,
  SiGmail,
  SiTypescript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';
import { GoMarkGithub } from 'react-icons/go';
import { FaVuejs } from 'react-icons/fa';
import { IContact, IProject } from './types';

export const myContacts: IContact[] = [
  {
    name: 'GitHub',
    icon: GoMarkGithub,
    url: 'https://github.com/aboqasem',
    color: 'blue-charcoal',
  },
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    url: 'https://www.linkedin.com/in/aboqasem/',
    color: 'denim',
  },
  {
    name: 'WhatsApp',
    icon: SiWhatsapp,
    url: 'https://wa.me/60176495945',
    color: 'spring-green',
  },
  {
    name: 'Email',
    icon: SiGmail,
    url: 'mailto:mb.alzouabi@gmail.com',
    color: 'flamingo',
  },
];

export const myTechnologies = [
  SiJavascript,
  SiTypescript,
  SiDart,
  SiJava,
  SiCplusplus,
  SiC,
  SiRust,
  SiGnubash,
  GoMarkGithub,
  SiNodeDotJs,
  SiMongodb,
  SiFlutter,
  SiReact,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  FaVuejs,
  SiArduino,
];

const githubUrl = 'https://github.com/aboqasem';
const githubRawContentUrl = 'https://raw.githubusercontent.com/aboqasem';
const previewUrlOf = (repo: string) => `${githubRawContentUrl}/${repo}/main/docs/preview.webm`;
const previewMp4UrlOf = (repo: string) => `${githubRawContentUrl}/${repo}/main/docs/preview.mp4`;

export const myProjects: IProject[] = [
  {
    title: 'AI Luminance',
    description: 'Simple color luminance detector using neural networks from brain.js.',
    preview: previewUrlOf('ai-luminance'),
    previewMp4: previewMp4UrlOf('ai-luminance'),
    url: 'https://ai-luminance.aboqasem.dev/',
    sourceCode: `${githubUrl}/ai-luminance`,
  },
  {
    title: 'Time Progress',
    description: 'Various time progress bars.',
    preview: previewUrlOf('time_progress'),
    previewMp4: previewMp4UrlOf('time_progress'),
    url: 'https://time-progress.aboqasem.dev/',
    sourceCode: `${githubUrl}/time_progress`,
  },
  {
    title: 'Ants and Bugs',
    description: 'Simple Java Swing simulation game applying design patterns.',
    preview: previewUrlOf('ants-and-bugs'),
    previewMp4: previewMp4UrlOf('ants-and-bugs'),
    sourceCode: `${githubUrl}/ants-and-bugs`,
  },
  {
    title: 'FiRecorder',
    description: 'A simple sound recorder/player with Firebase auth and storage.',
    preview: previewUrlOf('firecorder'),
    previewMp4: previewMp4UrlOf('firecorder'),
    sourceCode: `${githubUrl}/firecorder`,
  },
  {
    title: 'International Checkers',
    description: 'Simple C++ implementation of international checkers in the command-line.',
    preview: previewUrlOf('international-checkers'),
    previewMp4: previewMp4UrlOf('international-checkers'),
    sourceCode: `${githubUrl}/international-checkers`,
  },
];

// export const myInformation: IInformation[] = [
//   {
//     icon: 'Home', // TODO: svg
//     text: 'From Daraa, Syria',
//   },
//   {
//     icon: 'PersonPin', // TODO: svg
//     text: 'In Cyberjaya, Malaysia',
//   },
//   {
//     icon: 'LocalLibrary', // TODO: svg
//     text: "Pursuing Bachelor's at Multimedia University",
//   },
//   {
//     icon: 'Language', // TODO: svg
//     text: 'Arabic, English, and basics of Turkish',
//   },
// ];

// const myAchievements: IAchievement[] = [
//   {
//     from: 'Multimedia University',
//     logoUrl: 'https://www.mmu.edu.my/wp-content/themes/mmu2018/assets/images/cropped-mmulogo-only-192x192.png',
//     achievement: "Dean's List Trimester 2, 2019/2020",
//     url: 'https://www.mmu.edu.my/cyberjaya/undergraduate/information-technology/bachelor-of-computer-science-hons/',
//   },
//   {
//     from: 'Udemy',
//     logoUrl: 'https://www.udemy.com/staticx/udemy/images/v6/favicon-96x96.png',
//     achievement: 'The Complete 2020 Web Development Bootcamp',
//     url: 'https://www.udemy.com/certificate/UC-df9853fa-31a9-4d62-bbfe-d0d9269f4d6a/',
//   },
//   {
//     from: 'Udemy',
//     logoUrl: 'https://www.udemy.com/staticx/udemy/images/v6/favicon-96x96.png',
//     achievement: 'The Complete 2020 Flutter Development Bootcamp with Dart',
//     url: 'https://www.udemy.com/certificate/UC-268bcbe8-7826-4c72-8b2b-c42ad3391789/',
//   },
//   {
//     from: 'Coursera',
//     logoUrl: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/icon-blue-96x96.png',
//     achievement: 'Information Systems Auditing, Controls and Assurance',
//     url: 'https://coursera.org/share/7c98c3912365fbff6985da0aeac98ddf',
//   },
// ];

// const myEducation: IEducation[] = [
//   {
//     dateFrom: 'Early 2017',
//     dateTo: 'November 2017',
//     certificate: 'High School Diploma',
//     school: 'Amjad Aloroba School',
//     location: 'Istanbul, Turkey',
//   },
//   {
//     dateFrom: 'April 2018',
//     dateTo: 'March 2022',
//     certificate: 'Bachelor of Computer Science (Software Engineering)',
//     school: 'Multimedia University',
//     location: 'Cyberjaya, Malaysia',
//   },
// ];
