import UserArticleService from "@/services/UserArticleService";

const URL = "https://youkuhnya.ru";
const siteRoutes = ["", "/portfolio", "/articles"];

const getArticlesInfo = async () => {
  const articles = await UserArticleService.getArticles();
  const articlesLinks = articles.map((article) => {
    return {
      link: article.link,
      lastModify: article.updatedAt || article.updatedAt,
    };
  });

  return articlesLinks;
};

export default async function sitemap() {
  const articlesLinks = await getArticlesInfo();

  // Все страницы
  const routes = siteRoutes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: 1.0,
  }));

  // Статьи
  const articles = articlesLinks.map((article) => ({
    url: `${URL}/articles/${article.link}`,
    lastModified: article.lastModify,
  }));

  return [...routes, ...articles];
}
