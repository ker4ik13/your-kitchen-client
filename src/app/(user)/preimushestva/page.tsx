import AdvantagesPage from '@/pages/AdvantagesPage';
import { SITE_NAME, pagesData } from '@/shared/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.advantages.url),
	title: pagesData.advantages.title,
	description: pagesData.advantages.description,
	keywords: pagesData.advantages.keywords,
	openGraph: {
		type: pagesData.advantages.type,
		title: pagesData.advantages.title,
		url: pagesData.advantages.url,
		description: pagesData.advantages.description,
		siteName: SITE_NAME,
	},
	alternates: {
		canonical: pagesData.advantages.url,
	},
};

const page = () => {
	return (
		<>
			<AdvantagesPage />
		</>
	);
};

export default page;
