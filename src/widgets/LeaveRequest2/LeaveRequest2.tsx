import { isErrorStyles } from '@/features/isErrorStyles';
import ClaimService from '@/services/ClaimService';
import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import { links } from '@/shared/constants';
import { OrangeButton } from '@/shared/ui';
import { TFormInputsNames, type TFormInputs } from '@/types/TFormInputs';
import { CreateClaimDto } from '@/types/dtos/CreateClaim.dto';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import styles from './LeaveRequest2.module.scss';

interface LeaveRequestProps {
	isModal?: boolean;
	onClick?: (...options: any) => void;
	setIsOpen?: (isOpen: boolean) => void;
	setIsOpenThanks?: (isOpen: boolean) => void;
	buttonText?: string;
	tag?: string;
	location?: string;
}

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
	throw new Error('Api url has been not imported from .env');
}

const LeaveRequest2 = ({
	isModal,
	onClick,
	setIsOpen,
	setIsOpenThanks,
	buttonText,
	tag,
	location,
}: LeaveRequestProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		setValue,
	} = useForm<TFormInputs>();

	const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
		const newClaim = new CreateClaimDto({
			...data,
			date: new Date().toISOString(),
			location,
			tag,
		});

		const result = await ClaimService.addClaim(newClaim);
		console.log(result);

		if (result?.status === 201) {
			resetField('firstName');
			setValue('mobilePhone', '');
		}

		if (isModal && setIsOpen && setIsOpenThanks) {
			setIsOpenThanks(true);
			setIsOpen(false);
		}
		if (!isModal && setIsOpenThanks) {
			setIsOpenThanks(true);
		}
	};

	if (isModal && setIsOpen && setIsOpenThanks) {
		return (
			<div className={styles.container} onClick={onClick}>
				{/* Карточка */}
				<div className={styles.card}>
					<button
						type='button'
						className={styles.closeButton}
						onClick={() => {
							setIsOpen(false);
							document.body.classList.remove('overflow');
						}}
					>
						×
					</button>
					<div className={styles.wrapper}>
						<p className={styles.minus}>—</p>
						<h3 className={styles.title}>
							Оставьте заявку и специалист напишет вам
						</h3>
					</div>
					<p className={styles.text}>
						чтобы <span>рассчитать стоимость кухни</span> по телефону или
						договориться о выезде на замер кухни.
						<br /> Выезд <span>бесплатный</span> и возможен в этот же день
					</p>
					<form className={styles.formWrapper2}>
						<div className={styles.inputsWrapper2}>
							<div className={styles.inputWrapper}>
								<input
									type='text'
									autoComplete='given-name'
									className={isErrorStyles(
										TFormInputsNames.firstName,
										errors,
										styles,
									)}
									placeholder='Ваше имя'
									{...register('firstName', {
										required: 'Введите ваше имя',
										minLength: 2,
									})}
								/>
								<Icon icon={Icons.user(styles.icon)} />
							</div>
							<div className={styles.inputWrapper}>
								<ReactInputMask
									type='tel'
									autoComplete='tel'
									mask='+7 999 999-99-99'
									maskChar={null}
									className={isErrorStyles(
										TFormInputsNames.mobilePhone,
										errors,
										styles,
									)}
									placeholder='Ваш телефон'
									{...register('mobilePhone', {
										required: 'Введите ваш телефон',
										minLength: 16,
									})}
								/>
								<Icon icon={Icons.phoneGray(styles.icon)} />
							</div>
						</div>
						<div className={styles.contactsWrapper}>
							<div className={styles.column}>
								<p className={styles.writeText}>
									Или напишите нам сами удобным способом:
								</p>
								<div className={styles.contacts}>
									<Link
										href={links.tgChat}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.telegram(styles.contactsIcon)} />
										<p className={styles.contactText}>Telegram</p>
									</Link>
									<Link
										href={links.whatsapp}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.whatsapp(styles.contactsIcon)} />
										<p className={styles.contactText}>WhatsApp</p>
									</Link>
									<Link
										href={links.vk}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.vk(styles.contactsIcon)} />
										<p className={styles.contactText}>VK.com</p>
									</Link>
								</div>
							</div>
							<OrangeButton
								className={styles.button}
								onClick={handleSubmit(onSubmitLeaveRequest)}
							>
								{buttonText || 'Рассчитать стоимость'}
							</OrangeButton>
						</div>
					</form>
				</div>
			</div>
		);
	}
	return (
		<div className={styles.leaveRequest}>
			<div className={styles.container} onClick={onClick}>
				{/* Карточка */}
				<div className={styles.card}>
					<div className={styles.wrapper}>
						<p className={styles.minus}>—</p>
						<h3 className={styles.title}>
							Оставьте заявку и специалист напишет вам
						</h3>
					</div>
					<p className={styles.text}>
						чтобы <span>рассчитать стоимость кухни</span> по телефону или
						договориться о выезде на замер кухни.
						<br /> Выезд <span>бесплатный</span> и возможен в этот же день
					</p>
					<form className={styles.formWrapper2}>
						<div className={styles.inputsWrapper2}>
							<div className={styles.inputWrapper}>
								<input
									type='text'
									autoComplete='given-name'
									className={isErrorStyles(
										TFormInputsNames.firstName,
										errors,
										styles,
									)}
									placeholder='Ваше имя'
									{...register('firstName', {
										required: 'Введите ваше имя',
										minLength: 2,
									})}
								/>
								<Icon icon={Icons.user(styles.icon)} />
							</div>
							<div className={styles.inputWrapper}>
								<ReactInputMask
									type='tel'
									autoComplete='tel'
									mask='+7 999 999-99-99'
									maskChar={null}
									className={isErrorStyles(
										TFormInputsNames.mobilePhone,
										errors,
										styles,
									)}
									placeholder='Ваш телефон'
									{...register('mobilePhone', {
										required: 'Введите ваш телефон',
										minLength: 16,
									})}
								/>
								<Icon icon={Icons.phoneGray(styles.icon)} />
							</div>
						</div>
						<div className={styles.contactsWrapper}>
							<div className={styles.column}>
								<p className={styles.writeText}>
									Или напишите нам сами удобным способом:
								</p>
								<div className={styles.contacts}>
									<Link
										href={links.tgChat}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.telegram(styles.contactsIcon)} />
										<p className={styles.contactText}>Telegram</p>
									</Link>
									<Link
										href={links.whatsapp}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.whatsapp(styles.contactsIcon)} />
										<p className={styles.contactText}>WhatsApp</p>
									</Link>
									<Link
										href={links.vk}
										className={styles.contactCard}
										target='_blank'
									>
										<Icon icon={Icons.vk(styles.contactsIcon)} />
										<p className={styles.contactText}>VK.com</p>
									</Link>
								</div>
							</div>
							<OrangeButton
								className={styles.button}
								onClick={handleSubmit(onSubmitLeaveRequest)}
							>
								{buttonText || 'Рассчитать стоимость'}
							</OrangeButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LeaveRequest2;
