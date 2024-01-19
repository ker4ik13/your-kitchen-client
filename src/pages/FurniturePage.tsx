import { CustomerChoice } from '@/widgets/CustomerChoice/CustomerChoice';
import { FourSteps } from '@/widgets/FourSteps/FourSteps';
import { FurnitureAdvantages } from '@/widgets/FurnitureAdvantages/FurnitureAdvantages';
import { FurnitureHelloScreen } from '@/widgets/FurnitureHelloScreen/FurnitureHelloScreen';
import { LeaveRequestMini } from '@/widgets/LeaveRequestMini/LeaveRequestMini';
import Reviews from '@/widgets/Reviews/Reviews';
import styles from './FurniturePage.module.scss';

const FurniturePage = () => {
	return (
		<div className={styles.bg}>
			<FurnitureHelloScreen />
			<FurnitureAdvantages />
			<LeaveRequestMini />
			<CustomerChoice />
			<Reviews withoutBg />
			<FourSteps />
			<LeaveRequestMini />
		</div>
	);
};

export default FurniturePage;
