import UserArticleService from '@/services/UserArticleService';
import { CLIENT_URL, pagesData, pagesLinks } from '@/shared/constants';

const siteRoutes = ['', pagesLinks.portfolio, pagesLinks.articles];

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
		url: `${CLIENT_URL}${route}`,
		lastModified: new Date().toISOString(),
		priority: 1.0,
	}));

	// Статьи
	const articles = articlesLinks.map((article) => ({
		url: `${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
		lastModified: article.lastModify,
	}));

	return [...routes, ...articles];
}
