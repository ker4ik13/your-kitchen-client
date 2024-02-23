import main1 from "@/data/images/main/main1.jpg";
import main2 from "@/data/images/main/main2.jpg";
import main3 from "@/data/images/main/main3.jpg";
import main4 from "@/data/images/main/main4.jpg";
import main5 from "@/data/images/main/main5.jpg";
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

import { UserKitchenService } from "@/services/UserKitchenService";
import { UserReviewsService } from "@/services/UserReviewsService";
import { UserWorkerService } from "@/services/UserWorkerService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import Correction from "@/widgets/Correction/Correction";
import Kitchens from "@/widgets/Kitchens/Kitchens";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import { MainSlider } from "@/widgets/MainSlider/MainSlider";
import OurTeam from "@/widgets/OurTeam/OurTeam";
import Results from "@/widgets/Results/Results";
import Reviews from "@/widgets/Reviews/Reviews";
import SecondScreen from "@/widgets/SecondScreen/SecondScreen";
import WhatsNext from "@/widgets/WhatsNext/WhatsNext";

export const revalidate = 30;

const getHomeInfo = async () => {
  const kitchens = await UserKitchenService.getMainKitchens();
  const reviews = await UserReviewsService.getReviews();
  const workers = await UserWorkerService.getWorkers();

  return { kitchens, reviews, workers };
};

const HomePage = async () => {
  const { kitchens, reviews, workers } = await getHomeInfo();
  return (
    <>
      <div itemScope itemType="https://schema.org/WebSite">
        <meta itemProp="url" content={pagesData.main.name} />
        <meta itemProp="name" content={SITE_NAME} />
      </div>
      <MainSlider />
      <Kitchens kitchens={kitchens} />
      <SecondScreen />
      <Correction />
      <AllVariants />
      <WhatsNext />
      <Results />
      <LeaveRequestBlock />
      <Reviews reviews={reviews} />
      <OurTeam team={workers} />
      <MainArticles />
      <LeaveRequestBlock2 />
    </>
  );
};

export default HomePage;
