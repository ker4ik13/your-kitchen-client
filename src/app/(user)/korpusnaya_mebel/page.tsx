import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import FurniturePage from "@/pages/FurniturePage";
import { UserFurnitureService } from "@/services/UserFurnitureService";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";

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
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
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
