'use client';

import bgImage from '@/data/images/bg_mebel.jpg';
import { OrangeButton } from '@/shared/ui';
import Image from 'next/image';
import { useState } from 'react';
import Modal1 from '../Modals/Modal1';
import ThanksModal from '../Modals/ThanksModal';
import styles from './FurnitureHelloScreen.module.scss';

export const FurnitureHelloScreen = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenThanks, setIsOpenThanks] = useState(false);
	return (
		<>
			{isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
			<Modal1
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				setIsOpenThanks={setIsOpenThanks}
			/>
			<div className={styles.helloScreen}>
				<Image
					src={bgImage}
					className={styles.bgImage}
					alt='Фон'
					draggable={false}
				/>
				<div className={styles.container}>
					<div className={styles.tags}>
						<p className={styles.tag}>Доставка</p>
						<div className={styles.circle}></div>
						<p className={styles.tag}>Сборка</p>
						<div className={styles.circle}></div>
						<p className={styles.tag}>Гарантия</p>
					</div>
					<h1 className={styles.title}>
						Корпусная мебель <br /> на заказ от производителя
					</h1>
					<p className={styles.subtitle}>
						Производство высококачественной мебели по индивидуальным заказам и
						размерам. Мы изготавливаем корпусную и встроенную мебель, такую как
						распашные шкафы, угловые и шкафы-купе, а также прихожие, комоды,
						тумбы, мебельные гарнитуры для кухни и многое другое.
					</p>

					<OrangeButton
						className={styles.button}
						onClick={() => {
							setIsOpen(true);
							document.body.classList.add('overflow');
						}}
					>
						Рассчитать стоимость
					</OrangeButton>
				</div>
			</div>
		</>
	);
};
