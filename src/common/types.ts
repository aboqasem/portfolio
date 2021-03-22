import { IconType } from 'react-icons/lib';

export interface IContact {
  name: string;
  icon: IconType;
  url: string;
  color: string;
}

export interface IProject {
  title: string;
  description: string;
  preview: string;
  previewMp4?: string;
  url?: string;
  sourceCode?: string;
}

// export interface IInformation {
//   icon: string; // TODO: svg
//   text: string;
// }
// export interface IAchievement {
//   from: string;
//   logoUrl: string;
//   achievement: string;
//   url: string;
// }
// export interface IEducation {
//   dateFrom: string;
//   dateTo: string;
//   certificate: string;
//   school: string;
//   location: string;
// }
