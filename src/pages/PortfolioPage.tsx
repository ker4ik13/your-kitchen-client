"use client";

import KitchenExamples from "@/widgets/KitchenExamples/KitchenExamples";
import LeaveRequest from "@/widgets/LeaveRequest/LeaveRequest";
import Reviews from "@/widgets/Reviews/Reviews";
import { Provider } from "react-redux";
import store from "@/store/store";
import PreviewPhotos from "@/widgets/PreviewPhotos/PreviewPhotos";
import { useState } from "react";
import ThanksModal from "@/widgets/Modals/ThanksModal";

const PortfolioPage = () => {
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  return (
    <Provider store={store}>
      <PreviewPhotos />
      <KitchenExamples />
      <Reviews />
      <LeaveRequest setIsOpenThanks={setIsOpenThanks} />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
    </Provider>
  );
};

export default PortfolioPage;
