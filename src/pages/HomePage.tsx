"use client";

import HelloScreen from "@/widgets/HelloScreen/HelloScreen";
import SecondScreen from "@/widgets/SecondScreen/SecondScreen";
import Correction from "@/widgets/Correction/Correction";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import Kitchens from "@/widgets/Kitchens/Kitchens";
import ModalVideo from "@/widgets/Modals/ModalVideo";
import ThanksModal from "@/widgets/Modals/ThanksModal";
import { useState } from "react";
import PreviewPhotos from "@/widgets/PreviewPhotos/PreviewPhotos";
import { Provider } from "react-redux";
import store from "@/store/store";
import dynamic from "next/dynamic";
import MiniLoading from "@/shared/MiniLoading";
import styles from "./HomePage.module.scss";
import Reviews from "@/widgets/Reviews/Reviews";
import Modal1 from "@/widgets/Modals/Modal1";
import Modal2 from "@/widgets/Modals/Modal2";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";

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
      <Modal1
        isOpen={isOpenFirst}
        setIsOpen={setIsOpenFirst}
        setIsOpenThanks={setIsOpenThanks}
      />
      <Modal1
        isOpen={isOpenCatalog}
        setIsOpen={setIsOpenCatalog}
        setIsOpenThanks={setIsOpenThanks}
        buttonText='Получить каталог'
      />
      <Modal2
        isOpen={isOpenSecond}
        setIsOpen={setIsOpenSecond}
        setIsOpenThanks={setIsOpenThanks}
      />
      <Reviews />
      <DynamicOurTeam />
      <LeaveRequestBlock />
      <DynamicWhatsNext />
      <DynamicResults />
      <LeaveRequestBlock2 />
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
