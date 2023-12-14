import $api from "@/http";
import type { IArticle } from "@/types/IArticle";
import type { AxiosResponse } from "axios";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';


export default class ArticleService {
  static async getMainArticles (): Promise<IArticle[]> {
    const response = await axios.get<IArticle[]>(`${NEXT_PUBLIC_API_URL}/api/articles-main`);

    const returnArticles = [...response.data];
    const articlesWithPhotos: IArticle[] = returnArticles.map((article) => {
      const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${article.preview}`;
      article.preview = articlePhoto;
      return article;
    })

    return articlesWithPhotos;
  }

  static async viewArticle (id: string): Promise<IArticle> {
    const response = await axios.get<IArticle>(`${NEXT_PUBLIC_API_URL}/api/articles-view/${id}`);

    const returnArticle = {...response.data};
    const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${returnArticle.preview}`;

    returnArticle.preview = articlePhoto;
    return returnArticle;
  }

  static async getArticles (): Promise<IArticle[]> {
    const response = await axios.get<IArticle[]>(`${NEXT_PUBLIC_API_URL}/api/articles`);

    const returnArticles = [...response.data];
    const articlesWithPhotos: IArticle[] = returnArticles.map((article) => {
      const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${article.preview}`;
      article.preview = articlePhoto;
      return article;
    })

    return articlesWithPhotos;
  }

  static async getArticle (id: string | string[] | undefined): Promise<IArticle> {
    const response = await axios.get<IArticle>(`${NEXT_PUBLIC_API_URL}/api/articles/${id}`);

    const returnArticle = {...response.data};
    const articlePhoto = `${NEXT_PUBLIC_API_URL}/images/${returnArticle.preview}`;

    returnArticle.preview = articlePhoto;
    return returnArticle;
  }

  static async addArticle (body: object): Promise<AxiosResponse<IArticle>> {
    return await $api.post<IArticle>(`/articles`, body);
  }

  static async deleteArticle (id: string): Promise<AxiosResponse<IArticle>> {
    return await $api.delete<IArticle>(`/articles/${id}`);
  }

  static async updateArticle (id: string, body: object): Promise<AxiosResponse<IArticle>> {
    return await $api.patch<IArticle>(`/articles/${id}`, body);
  }

}