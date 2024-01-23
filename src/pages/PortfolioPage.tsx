'use client';

import { LeaveRequestBlock } from '@/shared/LeaveRequestBlock';
import store from '@/store/store';
import KitchenExamples from '@/widgets/KitchenExamples/KitchenExamples';
import PreviewPhotos from '@/widgets/PreviewPhotos/PreviewPhotos';
import Reviews from '@/widgets/Reviews/Reviews';
import { Provider } from 'react-redux';

const PortfolioPage = () => {
	return (
		<Provider store={store}>
			<PreviewPhotos />
			<KitchenExamples />
			<Reviews />
			<LeaveRequestBlock />
		</Provider>
	);
};

export default PortfolioPage;
