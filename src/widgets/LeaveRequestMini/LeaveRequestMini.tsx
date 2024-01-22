'use client';

import { isErrorStyles } from '@/features/isErrorStyles';
import requests from '@/features/requests';
import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import { OrangeButton } from '@/shared/ui';
import { TFormInputsNames, type TFormInputs } from '@/types/TFormInputs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';
import ThanksModal from '../Modals/ThanksModal';
import styles from './LeaveRequestMini.module.scss';

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
	throw new Error('Api url has been not imported from .env');
}

interface LeaveRequestMiniProps {
	title?: string;
}

export const LeaveRequestMini = ({ title }: LeaveRequestMiniProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		resetField,
		setValue,
	} = useForm<TFormInputs>();

	const [isOpenThanks, setIsOpenThanks] = useState(false);

	const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
		data.date = new Date().toISOString();
		const result = await requests.post(`${API_URL}/api/claims`, data);

		if (result?.ok) {
			resetField('firstName');
			setValue('mobilePhone', '');
			setIsOpenThanks(true);
		}
	};

	return (
		<>
			{isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
			<div className={styles.leaveRequest}>
				<div className={styles.container}>
					{/* Карточка */}
					<div className={styles.card}>
						<div className={styles.wrapper}>
							<p className={styles.minus}>—</p>
							<h3 className={styles.title}>
								{title ? title : 'Получите бесплатный эскиз вашего проекта'}
							</h3>
						</div>

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
								<OrangeButton
									onClick={handleSubmit(onSubmitLeaveRequest)}
									className={styles.button}
								>
									Получить эскиз
								</OrangeButton>
							</div>
						</form>
						<p className={styles.text}>
							Менеджер свяжется с вами в течение <span>15 минут</span>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
