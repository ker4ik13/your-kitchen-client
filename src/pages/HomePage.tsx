'use client';

import { LeaveRequestBlock } from '@/shared/LeaveRequestBlock';
import { LeaveRequestBlock2 } from '@/shared/LeaveRequestBlock2';
import MiniLoading from '@/shared/MiniLoading';
import store from '@/store/store';
import AllVariants from '@/widgets/AllVariants/AllVariants';
import Correction from '@/widgets/Correction/Correction';
import HelloScreen from '@/widgets/HelloScreen/HelloScreen';
import Kitchens from '@/widgets/Kitchens/Kitchens';
import MainArticles from '@/widgets/MainArticles/MainArticles';
import PreviewPhotos from '@/widgets/PreviewPhotos/PreviewPhotos';
import Results from '@/widgets/Results/Results';
import Reviews from '@/widgets/Reviews/Reviews';
import SecondScreen from '@/widgets/SecondScreen/SecondScreen';
import WhatsNext from '@/widgets/WhatsNext/WhatsNext';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Provider } from 'react-redux';
import styles from './HomePage.module.scss';

const DynamicOurTeam = dynamic(() => import('@/widgets/OurTeam/OurTeam'), {
	loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicModal1 = dynamic(() => import('@/widgets/Modals/Modal1'), {
	loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicModal2 = dynamic(() => import('@/widgets/Modals/Modal2'), {
	loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicModalVideo = dynamic(() => import('@/widgets/Modals/ModalVideo'), {
	loading: () => <MiniLoading className={styles.loading} />,
});
const DynamicThanksModal = dynamic(
	() => import('@/widgets/Modals/ThanksModal'),
	{
		loading: () => <MiniLoading className={styles.loading} />,
	},
);

const HomePage = () => {
	const [isOpenFirst, setIsOpenFirst] = useState(false);
	const [isOpenSecond, setIsOpenSecond] = useState(false);
	const [isOpenCatalog, setIsOpenCatalog] = useState(false);
	const [isOpenThanks, setIsOpenThanks] = useState(false);
	const [isOpenVideo, setIsOpenVideo] = useState(false);

	return (
		<Provider store={store}>
			<HelloScreen setIsOpen={setIsOpenFirst} />
			<Kitchens setIsOpen={setIsOpenCatalog} />
			<SecondScreen />
			<Correction setIsOpen={setIsOpenSecond} setIsOpenVideo={setIsOpenVideo} />
			<AllVariants setIsOpen={setIsOpenFirst} />
			<WhatsNext />
			<Results />
			<LeaveRequestBlock />
			<PreviewPhotos />
			<DynamicModal1
				isOpen={isOpenFirst}
				setIsOpen={setIsOpenFirst}
				setIsOpenThanks={setIsOpenThanks}
			/>
			<DynamicModal1
				isOpen={isOpenCatalog}
				setIsOpen={setIsOpenCatalog}
				setIsOpenThanks={setIsOpenThanks}
				buttonText='Получить каталог'
			/>
			<DynamicModal2
				isOpen={isOpenSecond}
				setIsOpen={setIsOpenSecond}
				setIsOpenThanks={setIsOpenThanks}
			/>
			<Reviews />
			<DynamicOurTeam />
			<MainArticles />
			<LeaveRequestBlock2 />
			{isOpenThanks && <DynamicThanksModal setIsOpen={setIsOpenThanks} />}
			<DynamicModalVideo
				isOpen={isOpenVideo}
				setIsOpen={setIsOpenVideo}
				videoUrl='https://rutube.ru/video/ff3d0a32ad30b9b0344f3717337e0e05'
			/>
		</Provider>
	);
};

export default HomePage;
