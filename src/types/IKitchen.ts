import type { IOption } from "./IOption";

export interface IKitchen {
  _id: string;
  title: string;
  description: string;
  price: number;
  style: IOption;
  type?: IOption;
  onMainPage?: boolean;
  photos: string[] | undefined[];
  term: string;
}