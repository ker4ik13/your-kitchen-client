import UserArticleService from '@/services/UserArticleService';
import { LeaveRequestBlock } from '@/shared/LeaveRequestBlock';
import { SITE_NAME, pagesData } from '@/shared/constants';
import Articles from '@/widgets/Articles/Articles';
import { Metadata } from 'next';

const getArticles = async () => {
	const result = await UserArticleService.getArticles();
	return result;
};

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.articles.url),
	title: pagesData.articles.title,
	description: pagesData.articles.description,
	keywords: pagesData.articles.keywords,
	openGraph: {
		type: 'website',
		title: pagesData.articles.title,
		url: pagesData.articles.url,
		description: pagesData.articles.description,
		siteName: SITE_NAME,
	},
	alternates: {
		canonical: pagesData.articles.url,
	},
};

const page = async () => {
	const articles = await getArticles();
	return (
		<>
			<Articles articles={articles} />
			<LeaveRequestBlock />
		</>
	);
};

export default page;
