import type { StaticImageData } from "next/image";

export interface IWorker {
  _id: string;
  photo: StaticImageData;
  firstName: string;
  lastName: string;
  jobTitle: string;
  experience: string;
}