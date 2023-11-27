"use client";

import HelloScreen from "@/widgets/HelloScreen/HelloScreen";
import SecondScreen from "@/widgets/SecondScreen/SecondScreen";
import Correction from "@/widgets/Correction/Correction";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import Kitchens from "@/widgets/Kitchens/Kitchens";
// import LeaveRequest from "@/widgets/LeaveRequest/LeaveRequest";
// import LeaveRequest2 from "@/widgets/LeaveRequest2/LeaveRequest2";
import ModalVideo from "@/widgets/Modals/ModalVideo";
import ThanksModal from "@/widgets/Modals/ThanksModal";
// import Results from "@/widgets/Results/Results";
// import Reviews from "@/widgets/Reviews/Reviews";
// import OurTeam from "@/widgets/OurTeam/OurTeam";
// import WhatsNext from "@/widgets/WhatsNext/WhatsNext";
import { useState } from "react";
import PreviewPhotos from "@/widgets/PreviewPhotos/PreviewPhotos";
import { Provider } from "react-redux";
import store from "@/store/store";
import dynamic from "next/dynamic";
import MiniLoading from "@/shared/MiniLoading";
import styles from "./HomePage.module.scss";

const DynamicModal1 = dynamic(() => import("@/widgets/Modals/Modal1"), {
  loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicModal2 = dynamic(() => import("@/widgets/Modals/Modal2"), {
  loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicReviews = dynamic(() => import("@/widgets/Reviews/Reviews"), {
  loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicOurTeam = dynamic(() => import("@/widgets/OurTeam/OurTeam"), {
  loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicLeaveRequest = dynamic(
  () => import("@/widgets/LeaveRequest/LeaveRequest"),
  {
    loading: () => <MiniLoading className={styles.loading} />,
  },
);
const DynamicLeaveRequest2 = dynamic(
  () => import("@/widgets/LeaveRequest2/LeaveRequest2"),
  {
    loading: () => <MiniLoading className={styles.loading} />,
  },
);
const DynamicWhatsNext = dynamic(
  () => import("@/widgets/WhatsNext/WhatsNext"),
  {
    loading: () => <MiniLoading className={styles.loading} />,
  },
);
const DynamicResults = dynamic(() => import("@/widgets/Results/Results"), {
  loading: () => <MiniLoading className={styles.loading} />,
});

const HomePage = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);

  return (
    <Provider store={store}>
      <HelloScreen setIsOpen={setIsOpenFirst} />
      <SecondScreen />
      <Correction setIsOpen={setIsOpenSecond} setIsOpenVideo={setIsOpenVideo} />
      <AllVariants setIsOpen={setIsOpenFirst} />
      <PreviewPhotos />
      <Kitchens setIsOpen={setIsOpenCatalog} />
      <DynamicModal1
        isOpen={isOpenFirst}
        setIsOpen={setIsOpenFirst}
        setIsOpenThanks={setIsOpenThanks}
      />
      <DynamicModal1
        isOpen={isOpenCatalog}
        setIsOpen={setIsOpenCatalog}
        setIsOpenThanks={setIsOpenThanks}
        buttonText='Получить каталог'
      />
      <DynamicModal2
        isOpen={isOpenSecond}
        setIsOpen={setIsOpenSecond}
        setIsOpenThanks={setIsOpenThanks}
      />
      <DynamicReviews />
      <DynamicOurTeam />
      <DynamicLeaveRequest />
      <DynamicWhatsNext />
      <DynamicResults />
      <DynamicLeaveRequest2 />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <ModalVideo
        isOpen={isOpenVideo}
        setIsOpen={setIsOpenVideo}
        videoUrl='https://rutube.ru/video/ff3d0a32ad30b9b0344f3717337e0e05'
      />
    </Provider>
  );
};

export default HomePage;
