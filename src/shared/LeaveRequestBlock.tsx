"use client";

import LeaveRequest from "@/widgets/LeaveRequest/LeaveRequest";
import { useState } from "react";
import ThanksModal from "@/widgets/Modals/ThanksModal";

export const LeaveRequestBlock = () => {
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  return (
    <>
      <LeaveRequest setIsOpenThanks={setIsOpenThanks} />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
    </>
  );
};
