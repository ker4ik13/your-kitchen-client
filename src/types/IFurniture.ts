import { StaticImageData } from 'next/image';

export interface IFurniture {
	_id: string;
	name: string;
	slug: string;
	onMainPage?: boolean;
	description: string;
	price: number;
	photos: string[] | StaticImageData[];
}
