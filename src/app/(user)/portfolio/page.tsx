import PortfolioPage from '@/pages/PortfolioPage';
import { SITE_NAME, pagesData } from '@/shared/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.portfolio.url),
	title: pagesData.portfolio.title,
	description: pagesData.portfolio.description,
	keywords: pagesData.portfolio.keywords,
	openGraph: {
		type: pagesData.portfolio.type,
		title: pagesData.portfolio.title,
		url: pagesData.portfolio.url,
		description: pagesData.portfolio.description,
		siteName: SITE_NAME,
	},
	alternates: {
		canonical: pagesData.portfolio.url,
	},
};

const page = () => {
	return (
		<>
			<PortfolioPage />
		</>
	);
};

export default page;
