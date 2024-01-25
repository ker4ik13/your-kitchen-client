'use client';

import LeaveRequest from '@/widgets/LeaveRequest/LeaveRequest';
import ThanksModal from '@/widgets/Modals/ThanksModal';
import { useState } from 'react';

interface LeaveRequestBlockProps {
	location?: string;
	tag?: string;
}

export const LeaveRequestBlock = ({
	location,
	tag,
}: LeaveRequestBlockProps) => {
	const [isOpenThanks, setIsOpenThanks] = useState(false);

	return (
		<>
			<LeaveRequest
				setIsOpenThanks={setIsOpenThanks}
				location={location}
				tag={tag}
			/>
			{isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
		</>
	);
};
