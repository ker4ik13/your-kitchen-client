import type { ReactNode } from 'react';
import LeaveRequest2 from '../LeaveRequest2/LeaveRequest2';
import styles from './Modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	setIsOpenThanks: (isOpen: boolean) => void;
	buttonText?: string;
	descriptionText?: string | ReactNode;
	tag?: string;
	location?: string;
}

const isOpenStyles = (isOpen: boolean) =>
	isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

const Modal2 = ({
	isOpen,
	setIsOpen,
	setIsOpenThanks,
	buttonText,
	descriptionText,
	tag,
	location,
}: ModalProps) => {
	return (
		<div
			className={isOpenStyles(isOpen)}
			onClick={() => {
				setIsOpen(false);
				document.body.classList.remove('overflow');
			}}
		>
			<LeaveRequest2
				isModal={true}
				onClick={(event) => event.stopPropagation()}
				setIsOpen={setIsOpen}
				setIsOpenThanks={setIsOpenThanks}
				buttonText={buttonText}
				descriptionText={descriptionText}
				tag={tag}
				location={location}
			/>
		</div>
	);
};

export default Modal2;
