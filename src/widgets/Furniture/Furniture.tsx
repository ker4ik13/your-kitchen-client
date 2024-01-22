import styles from "./Furniture.module.scss";
import FurnitureItem from "@/widgets/FurnitureItem/FurnitureItem";
import { IFurniture } from "@/types/IFurniture";

interface FurnitureProps {
  title?: string;
}

const furnitures: IFurniture[] = [
  {
    _id: "3281391321dsa",
    name: "Кухня",
    description: "Кухня из массива дерева",
    price: 10000,
    photos: [],
  },
];

export const Furniture = ({ title }: FurnitureProps) => {
  return (
    <div className={styles.furniturePage}>
      <div className={styles.container}>
        <h3 className={styles.title}>
          {title ? title : "Мебель, которую мы производим для вас"}
        </h3>
        <div className={styles.furnitures}>
          {furnitures.map((furniture) => (
            <FurnitureItem key={furniture._id} furniture={furniture} />
          ))}
        </div>
      </div>
    </div>
  );
};
