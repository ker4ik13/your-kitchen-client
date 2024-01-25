'use client';

import { UserKitchenService } from '@/services/UserKitchenService';
import { OrangeButton } from '@/shared/ui';
import { IKitchen } from '@/types/IKitchen';
import { useEffect, useState } from 'react';
import Kitchen from '../Kitchen/Kitchen';
import Modal1 from '../Modals/Modal1';
import ThanksModal from '../Modals/ThanksModal';
import styles from './Kitchens.module.scss';

const Kitchens = () => {
	const [kitchens, setKitchens] = useState<IKitchen[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenThanks, setIsOpenThanks] = useState(false);
	// const [select, setSelect] = useState<ThisKitchensOptions>(
	//   ThisKitchensOptions.all,
	// );

	// const isActive = (variable: ThisKitchensOptions) =>
	//   select === variable ? `${styles.tab} ${styles.active}` : styles.tab;

	// const handleSelect = (value: ThisKitchensOptions) => {
	//   setSelect(value);
	// };
	const getKitchens = async () => {
		const response = await UserKitchenService.getMainKitchens();
		setKitchens(response);
	};

	useEffect(() => {
		getKitchens();
	}, []);

	return (
		<>
			<Modal1
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsOpenThanks={setIsOpenThanks}
				buttonText='Получить каталог'
			/>
			{isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
			<div className={styles.kitchensPage} id='kitchens'>
				<div className={styles.container}>
					<h3 className={styles.title}>
						За <span>6</span> лет произвели более 1.5&nbsp;тысяч гарнитуров в
						Москве
					</h3>
					<p className={styles.subtitle}>
						<span>Выберите свою:</span> от лофта до классики
					</p>
					{/* <div className={styles.tabs}>
          {kitchensArray.map((variable, index) => (
            <button
              className={isActive(variable)}
              key={index}
              onClick={() => handleSelect(variable)}
            >
              {kitchensTranslate[variable]}
            </button>
          ))}
        </div> */}
					<div className={styles.kitchens}>
						{kitchens.map((kitchen, index) => (
							<Kitchen kitchen={kitchen} key={index} isPreview />
						))}
					</div>
					<OrangeButton
						center
						onClick={() => {
							setIsOpen(true);
							document.body.classList.add('overflow');
						}}
					>
						Получить полный каталог
					</OrangeButton>
				</div>
			</div>
		</>
	);
};

export default Kitchens;
