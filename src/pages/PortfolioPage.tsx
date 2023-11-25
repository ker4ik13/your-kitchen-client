"use client";

import KitchenExamples from "@/widgets/KitchenExamples/KitchenExamples";
import LeaveRequest from "@/widgets/LeaveRequest/LeaveRequest";
import Reviews from "@/widgets/Reviews/Reviews";
import { Provider } from "react-redux";
import store from "@/store/store";

const PortfolioPage = () => {
  return (
    <Provider store={store}>
      <KitchenExamples />
      <Reviews />
      <LeaveRequest />
    </Provider>
  );
};

export default PortfolioPage;
