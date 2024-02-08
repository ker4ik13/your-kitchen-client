import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import HomePage from "@/pages/HomePage";
import { SITE_NAME, pagesData } from "@/shared/constants";
import { Metadata } from "next";

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
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.main.url,
  },
};

export default function Home() {
  return <HomePage />;
}
