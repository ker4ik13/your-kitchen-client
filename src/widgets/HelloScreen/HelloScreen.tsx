import bgImage from '@/data/images/bg.webp';
import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import { OrangeButton } from '@/shared/ui';
import Image from 'next/image';
import styles from './HelloScreen.module.scss';

interface HelloScreenProps {
	setIsOpen: (isOpen: boolean) => void;
}

const HelloScreen = ({ setIsOpen }: HelloScreenProps) => {
	return (
		<div className={styles.helloScreen}>
			<Image
				src={bgImage}
				className={styles.bgImage}
				alt='Фон'
				draggable={false}
			/>
			<div className={styles.container}>
				<h1 className={styles.title}>
					Кухни на заказ в Москве напрямую с фабрики с гарантией 10 лет
				</h1>
				<div className={styles.subtitle}>
					<Icon icon={Icons.ruble(styles.subtitleIcon)} />
					<p className={styles.subtitleText}>
						<span>рассрочка</span> до 24 месяцев
					</p>
				</div>
				<div className={styles.subtitle}>
					<Icon icon={Icons.diamond(styles.subtitleIcon)} />
					<p className={styles.subtitleText}>
						производство <span>от 10 дней</span>
					</p>
				</div>
				<div className={styles.subtitle}>
					<Icon icon={Icons.shesternya(styles.subtitleIcon)} />
					<p className={styles.subtitleText}>
						<span>бесплатный</span> дизайн проект
					</p>
				</div>
				<OrangeButton
					className={styles.orangeButton}
					onClick={() => {
						setIsOpen(true);
						document.body.classList.add('overflow');
					}}
				>
					Рассчитать стоимость
				</OrangeButton>
			</div>
		</div>
	);
};

export default HelloScreen;
