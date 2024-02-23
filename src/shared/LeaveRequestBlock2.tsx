"use client";

import { LeaveRequest2 } from "@/widgets/LeaveRequest2/LeaveRequest2";
import { ThanksModal } from "@/widgets/Modals/ThanksModal";
import { useState } from "react";

interface LeaveRequestBlockProps {
  location?: string;
  tag?: string;
}

export const LeaveRequestBlock2 = ({
  location,
  tag,
}: LeaveRequestBlockProps) => {
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  return (
    <>
      <LeaveRequest2
        setIsOpenThanks={setIsOpenThanks}
        location={location}
        tag={tag}
      />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
    </>
  );
};
