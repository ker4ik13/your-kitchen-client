import '@/shared/styles/swiper-my.css';
import { useAppDispatch } from '@/store/hooks';
import { setIsOpen, setKitchen } from '@/store/kitchens.slice';
import { IKitchen } from '@/types/IKitchen';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Kitchen.module.scss';

interface KitchenProps {
	kitchen: IKitchen;
	isPreview?: boolean;
}

const Kitchen = ({ kitchen, isPreview }: KitchenProps) => {
	const dispatch = useAppDispatch();

	const openPreview = () => {
		if (isPreview) {
			dispatch(setKitchen(kitchen));
			dispatch(setIsOpen(true));
			document.body.classList.add('overflow');
		} else {
			return;
		}
	};
	return (
		<>
			<Swiper
				className={styles.kitchen}
				navigation={true}
				pagination={{
					enabled: true,
					clickable: true,
				}}
				allowTouchMove={window.innerWidth > 768 ? false : true}
				loop={true}
				modules={[Navigation, Pagination]}
				onClick={openPreview}
				itemScope
				itemType='https://schema.org/Product'
			>
				<div className={styles.content}>
					<div className={styles.betweenWrapper}>
						<p className={styles.name} itemProp='name'>
							{kitchen.title}
						</p>
						<div className={styles.tags} itemProp='keywords'>
							<div className={styles.tag}>
								<p>{kitchen.style.label}</p>
							</div>
							{kitchen.type && (
								<div className={styles.tag}>
									<p>{kitchen.type.label}</p>
								</div>
							)}
						</div>
					</div>
					<p className={styles.description} itemProp='description'>
						{kitchen.description}
					</p>
					<div className={styles.contentWrapper}>
						<p className={styles.price} itemProp='offers'>
							<span className={styles.brown} itemProp='price' content='RUB'>
								От{' '}
							</span>
							{kitchen.price.toLocaleString('ru')}
							<span>₽</span>
						</p>
						<div className={styles.price}>
							<span className={styles.brown}>Срок </span>
							{kitchen.term}
						</div>
					</div>
				</div>
				{kitchen.photos.map((photo, index) => (
					<SwiperSlide key={index} className={styles.image}>
						<Image
							src={photo || ''}
							className={styles.img}
							draggable={false}
							alt={`${kitchen.title}` || ''}
							itemProp='image'
							width={461}
							height={500}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default Kitchen;
