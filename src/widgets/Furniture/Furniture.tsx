import photo1 from '@/data/kitchens/2023-11-27T16-48-09.544Zdasdsafads.webp';
import photo2 from '@/data/kitchens/2023-11-27T16-48-09.547Ze2e2e2e.webp';
import { pagesLinks } from '@/shared/constants';
import { OrangeButton } from '@/shared/ui';
import { IFurniture } from '@/types/IFurniture';
import FurnitureItem from '@/widgets/FurnitureItem/FurnitureItem';
import styles from './Furniture.module.scss';

interface FurnitureProps {
	title?: string;
}

const furnitures: IFurniture[] = [
	{
		_id: '3281391321dsa',
		name: 'Распашные шкафы 1',
		link: 'shkafi',
		description: 'Кухня из массива дерева',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Угловые и шкафы-купе 2',
		link: 'angle-shkafi',
		description:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!rem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Угловые и шкафы-купе 3',
		link: 'angle-shkafi',
		description:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!rem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Угловые и шкафы-купе 4',
		link: 'angle-shkafi',
		description:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!rem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Угловые и шкафы-купе 5',
		link: 'angle-shkafi',
		description:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!rem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Прихожие',
		link: 'prihozhie',
		description: 'Кухня из массива дерева 6',
		price: 10000,
		photos: [photo1, photo2],
	},
	{
		_id: '3281391321dsa',
		name: 'Комоды',
		link: 'comodi',
		description:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!rem ipsum dolor sit, amet consectetur adipisicing elit. Libero magni fugit maiores. Dicta minus laborum illo nulla soluta rerum, nisi dolorum beatae sapiente ipsam totam consectetur eveniet necessitatibus a magni!',
		price: 10000,
		photos: [photo1, photo2],
	},
];

export const Furniture = ({ title }: FurnitureProps) => {
	return (
		<div className={styles.furniturePage}>
			<div className={styles.container}>
				<h3 className={styles.title}>
					{title ? title : 'Мебель, которую мы производим для вас'}
				</h3>
				<div className={styles.furnitures}>
					{furnitures.slice(0, 6).map((furniture, index) => (
						<FurnitureItem key={furniture._id + index} furniture={furniture} />
					))}
					{furnitures.length > 6 && (
						<OrangeButton href={pagesLinks.portfolio} className={styles.button}>
							Посмотреть портфолио
						</OrangeButton>
					)}
				</div>
			</div>
		</div>
	);
};
