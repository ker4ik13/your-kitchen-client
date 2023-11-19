import type { StaticImageData } from "next/image";
import { KitchensOptions } from "./KitchenOptions";

export interface IKitchen {
  _id: string;
  title: string;
  description: string;
  price: number;
  options: KitchensOptions[];
  photos: StaticImageData[];
  term: string;
}