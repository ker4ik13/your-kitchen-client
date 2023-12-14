"use client";

import { useState } from "react";
import ThanksModal from "@/widgets/Modals/ThanksModal";
import LeaveRequest2 from "@/widgets/LeaveRequest2/LeaveRequest2";

export const LeaveRequestBlock2 = () => {
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  return (
    <>
      <LeaveRequest2 setIsOpenThanks={setIsOpenThanks} />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
    </>
  );
};
