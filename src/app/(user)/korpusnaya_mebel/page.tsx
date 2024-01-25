import FurniturePage from '@/pages/FurniturePage';
import { UserFurnitureService } from '@/services/UserFurnitureService';
import { SITE_NAME, pagesData } from '@/shared/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	metadataBase: new URL(pagesData.furniture.url),
	title: pagesData.furniture.title,
	description: pagesData.furniture.description,
	keywords: pagesData.furniture.keywords,
	openGraph: {
		type: pagesData.furniture.type,
		title: pagesData.furniture.title,
		url: pagesData.furniture.url,
		description: pagesData.furniture.description,
		siteName: SITE_NAME,
	},
	alternates: {
		canonical: pagesData.furniture.url,
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
