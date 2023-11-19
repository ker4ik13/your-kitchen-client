"use client";

import HelloScreen from "@/widgets/HelloScreen/HelloScreen";
import SecondScreen from "@/widgets/SecondScreen/SecondScreen";
import Correction from "@/widgets/Correction/Correction";
import AllVariants from "@/widgets/AllVariants/AllVariants";
import Kitchens from "@/widgets/Kitchens/Kitchens";
import LeaveRequest from "@/widgets/LeaveRequest/LeaveRequest";
import LeaveRequest2 from "@/widgets/LeaveRequest2/LeaveRequest2";
import Modal1 from "@/widgets/Modals/Modal1";
import Modal2 from "@/widgets/Modals/Modal2";
import ModalVideo from "@/widgets/Modals/ModalVideo";
import ThanksModal from "@/widgets/Modals/ThanksModal";
import Results from "@/widgets/Results/Results";
import Reviews from "@/widgets/Reviews/Reviews";
import OurTeam from "@/widgets/OurTeam/OurTeam";
import WhatsNext from "@/widgets/WhatsNext/WhatsNext";
import { useState } from "react";

const HomePage = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);

  return (
    <div>
      <HelloScreen setIsOpen={setIsOpenFirst} />
      <SecondScreen />
      <Correction setIsOpen={setIsOpenSecond} setIsOpenVideo={setIsOpenVideo} />
      <AllVariants setIsOpen={setIsOpenFirst} />
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
      <OurTeam />
      <LeaveRequest />
      <WhatsNext />
      <Results />
      <LeaveRequest2 />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <ModalVideo
        isOpen={isOpenVideo}
        setIsOpen={setIsOpenVideo}
        videoUrl='https://rutube.ru/video/ff3d0a32ad30b9b0344f3717337e0e05'
      />
    </div>
  );
};

export default HomePage;
