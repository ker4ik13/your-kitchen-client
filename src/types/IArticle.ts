export interface IArticle {
  _id: string;
  title: string;
  description: string;
  preview: string;
  content: string;
  onMainPage: boolean;
  viewCount: number;
  author: string;
}