import UserArticleService from "@/services/UserArticleService";

const URL = "https://youkuhnya.ru";
const siteRoutes = ["", "/portfolio", "/articles"];

const getArticlesInfo = async () => {
  const articles = await UserArticleService.getArticles();
  const articlesId = articles.map((article) => {
    return {
      id: article._id,
      lastModify: article.updatedAt || article.updatedAt,
    };
  });

  return articlesId;
};

export default async function sitemap() {
  const articlesId = await getArticlesInfo();

  // Все страницы
  const routes = siteRoutes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: 1.0,
  }));

  // Статьи
  const articles = articlesId.map((article) => ({
    url: `${URL}/articles/${article.id}`,
    lastModified: article.lastModify,
  }));

  return [...routes, ...articles];
}
