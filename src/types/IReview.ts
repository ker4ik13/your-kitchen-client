import type { StaticImageData } from "next/image";

export interface IReview {
  _id: string;
  photo?: StaticImageData | string;
  firstName: string;
  lastName?: string;
  text: string;
  photos: StaticImageData[];
}