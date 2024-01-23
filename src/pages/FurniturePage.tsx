import { CustomerChoice } from '@/widgets/CustomerChoice/CustomerChoice';
import { FourSteps } from '@/widgets/FourSteps/FourSteps';
import { Furniture } from '@/widgets/Furniture/Furniture';
import { FurnitureAdvantages } from '@/widgets/FurnitureAdvantages/FurnitureAdvantages';
import { FurnitureHelloScreen } from '@/widgets/FurnitureHelloScreen/FurnitureHelloScreen';
import { LeaveRequestMini } from '@/widgets/LeaveRequestMini/LeaveRequestMini';
import Reviews from '@/widgets/Reviews/Reviews';
import styles from './FurniturePage.module.scss';

const FurniturePage = () => {
	return (
		<div className={styles.bg}>
			<FurnitureHelloScreen />
			<Furniture />
			<FurnitureAdvantages />
			<LeaveRequestMini
				tag='Получить бесплатный эскиз'
				location='Страница Мебель, четвертый блок'
			/>
			<CustomerChoice />
			<Reviews withoutBg />
			<FourSteps />
			<LeaveRequestMini />
		</div>
	);
};

export default FurniturePage;
