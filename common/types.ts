export interface IBlogPost {
  id: string;
  img: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface IApiBlogPost {
  id: string;
  img?: string;
  title: string;
  content: string;
  createdAt: string;
}

export type BlogPosts = IBlogPost[];

export type ApiBlogPosts = IApiBlogPost[];
