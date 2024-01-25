import { closeModalOnEscape } from '@/shared/helpers/closeModalOnEscape';
import { useEffect, type ReactNode } from 'react';
import LeaveRequest from '../LeaveRequest/LeaveRequest';
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

const Modal1 = ({
	isOpen,
	setIsOpen,
	setIsOpenThanks,
	buttonText,
	descriptionText,
	tag,
	location,
}: ModalProps) => {
	useEffect(() => {
		document.addEventListener('keydown', (event) =>
			closeModalOnEscape(event, setIsOpen),
		);
		return () =>
			document.removeEventListener('keydown', (event) =>
				closeModalOnEscape(event, setIsOpen),
			);
	}, []);

	return (
		<div
			className={isOpenStyles(isOpen)}
			onClick={() => {
				setIsOpen(false);
				document.body.classList.remove('overflow');
			}}
		>
			<LeaveRequest
				isModal={true}
				onClick={(event: any) => event.stopPropagation()}
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

export default Modal1;
