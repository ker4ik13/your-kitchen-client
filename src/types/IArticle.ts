export interface IArticle {
  _id: string;
  title: string;
  preview: string;
  content: string;
  onMainPage: boolean;
  viewCount: number;
}