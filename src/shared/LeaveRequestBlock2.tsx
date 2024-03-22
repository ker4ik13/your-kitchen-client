import { LeaveRequest2 } from "@/widgets/LeaveRequest2/LeaveRequest2";

interface LeaveRequestBlockProps {
  location?: string;
  tag?: string;
}

export const LeaveRequestBlock2 = ({
  location,
  tag,
}: LeaveRequestBlockProps) => {
  return (
    <>
      <LeaveRequest2 location={location} tag={tag} />
    </>
  );
};
