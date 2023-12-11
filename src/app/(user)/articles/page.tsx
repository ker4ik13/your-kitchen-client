import ArticlesPage from "@/pages/ArticlesPage";
import UserArticleService from "@/services/UserArticleService";
import { renderSeo } from "@/shared/renderSeo";
import { type IArticle } from "@/types/IArticle";

export const metadata = renderSeo({
  title: "Статьи",
  description: "Статьи",
  keywords: "Статьи",
});

const getArticles = async (): Promise<IArticle[]> => {
  return await UserArticleService.getArticles();
};

const page = async () => {
  const articles = await getArticles();
  return <ArticlesPage articles={articles} />;
};

export default page;
