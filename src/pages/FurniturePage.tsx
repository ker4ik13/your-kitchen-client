import type { IFurniture } from '@/types/IFurniture';
import { CustomerChoice } from '@/widgets/CustomerChoice/CustomerChoice';
import { FourSteps } from '@/widgets/FourSteps/FourSteps';
import { Furniture } from '@/widgets/Furniture/Furniture';
import { FurnitureAdvantages } from '@/widgets/FurnitureAdvantages/FurnitureAdvantages';
import { FurnitureHelloScreen } from '@/widgets/FurnitureHelloScreen/FurnitureHelloScreen';
import { LeaveRequestMini } from '@/widgets/LeaveRequestMini/LeaveRequestMini';
import MainArticles from '@/widgets/MainArticles/MainArticles';
import Reviews from '@/widgets/Reviews/Reviews';
import styles from './FurniturePage.module.scss';

interface FurniturePageProps {
	furniture: IFurniture[];
}

const FurniturePage = ({ furniture }: FurniturePageProps) => {
	return (
		<div className={styles.bg}>
			<FurnitureHelloScreen />
			{furniture.length && <Furniture furniture={furniture} />}
			<FurnitureAdvantages />
			<LeaveRequestMini
				tag='Получить бесплатный эскиз'
				location='Страница корпусной мебели'
			/>
			<CustomerChoice />
			<Reviews withoutBg />
			<FourSteps />
			<LeaveRequestMini
				tag='Получить бесплатный эскиз'
				location='Страница корпусной мебели'
			/>
			<MainArticles />
		</div>
	);
};

export default FurniturePage;
