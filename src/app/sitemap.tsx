import UserArticleService from '@/services/UserArticleService';
import { CLIENT_URL, pagesData, pagesLinks } from '@/shared/constants';

const siteRoutes = [
	{
		link: '',
		lastModify: '2024-01-25T17:16:55.776Z',
	},
	{
		link: pagesLinks.portfolio,
		lastModify: '2024-01-25T17:16:55.776Z',
	},
	{
		link: pagesLinks.articles,
		lastModify: '2024-01-25T17:16:55.776Z',
	},
	{
		link: pagesLinks.advantages,
		lastModify: new Date(2024, 0, 13, 16, 37).toISOString(),
	},
	{
		link: pagesLinks.furniture,
		lastModify: '2024-01-25T17:16:55.776Z',
	},
];

// Получение информции о статьях
const getArticlesInfo = async () => {
	const articles = await UserArticleService.getArticles();
	const articlesLinks = articles.map((article) => {
		return {
			link: article.link,
			lastModify: article.updatedAt || article.createdAt,
		};
	});

	// Последнее изменение страницы статей
	const lastArticlesUpdated = articlesLinks.reduce((acc, article) => {
		return new Date(article.lastModify).getTime() > new Date(acc).getTime()
			? new Date(article.lastModify).getTime()
			: new Date(acc).getTime();
	}, new Date(articlesLinks[0].lastModify).getTime());

	const articlesPageIndex = siteRoutes.findIndex(
		(route) => route.link === pagesLinks.articles,
	);

	siteRoutes[articlesPageIndex].lastModify = new Date(
		lastArticlesUpdated,
	).toISOString();

	return articlesLinks;
};

export default async function sitemap() {
	const articlesLinks = await getArticlesInfo();

	// Все страницы
	const routes = siteRoutes.map((route) => ({
		url: `${CLIENT_URL}${route.link}`,
		lastModified: route.lastModify || new Date().toISOString(),
		priority: 1.0,
	}));

	// Статьи
	const articles = articlesLinks.map((article) => ({
		url: `${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
		lastModified: article.lastModify,
	}));

	return [...routes, ...articles];
}
