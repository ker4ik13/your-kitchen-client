import HomePage from '@/pages/HomePage';
import { SITE_NAME, pagesData } from '@/shared/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.main.url),
	title: pagesData.main.title,
	description: pagesData.main.description,
	keywords: pagesData.main.keywords,
	openGraph: {
		type: pagesData.main.type,
		title: pagesData.main.title,
		url: pagesData.main.url,
		description: pagesData.main.description,
		siteName: SITE_NAME,
	},
	alternates: {
		canonical: pagesData.main.url,
	},
};

export default function Home() {
	return (
		<>
			<HomePage />
		</>
	);
}
