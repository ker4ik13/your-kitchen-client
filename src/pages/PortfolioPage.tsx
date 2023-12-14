"use client";

import KitchenExamples from "@/widgets/KitchenExamples/KitchenExamples";
import Reviews from "@/widgets/Reviews/Reviews";
import { Provider } from "react-redux";
import store from "@/store/store";
import PreviewPhotos from "@/widgets/PreviewPhotos/PreviewPhotos";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";

const PortfolioPage = () => {
  return (
    <Provider store={store}>
      <PreviewPhotos />
      <KitchenExamples />
      <Reviews />
      <LeaveRequestBlock />
    </Provider>
  );
};

export default PortfolioPage;
