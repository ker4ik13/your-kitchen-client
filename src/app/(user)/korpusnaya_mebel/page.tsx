import FurniturePage from '@/pages/FurniturePage';
import { UserFurnitureService } from '@/services/UserFurnitureService';
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
export const revalidate = 30;

const getFurniture = async () => {
	return await UserFurnitureService.getAllFurniture();
};

export default async function page() {
	const furniture = await getFurniture();
	return <FurniturePage furniture={furniture} />;
}
