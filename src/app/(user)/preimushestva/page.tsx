import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { SITE_NAME, pagesData } from "@/shared/constants";
import Advantages from "@/widgets/Advantages/Advantages";
import { Metadata } from "next";

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
    images: [main1.src, main2.src, main3.src, main4.src, main5.src],
  },
  alternates: {
    canonical: pagesData.advantages.url,
  },
};

const page = () => {
  return (
    <>
      <Advantages />
      <LeaveRequestBlock
        location="Страница преимуществ"
        tag="Рассчитать стоимость кухни"
      />
    </>
  );
};

export default page;
