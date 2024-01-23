import { StaticImageData } from 'next/image';

export interface IFurniture {
	_id: string;
	name: string;
	link: string;
	onMainPage?: boolean;
	description: string;
	price: number;
	photos: string[] | StaticImageData[];
}
