import bgImage from "@/data/images/bg_mebel.jpg";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

interface Props {
  openModal: () => void;
}

export const FurnitureHelloScreenSlider = ({ openModal }: Props) => {
  return (
    <div className={`${styles.helloScreen} ${styles.furnitureScreen}`}>
      <Image
        src={bgImage}
        className={styles.bgImage}
        alt="Фон"
        draggable={false}
        priority
        quality={100}
      />
      <div className={styles.container}>
        <div className={styles.tags}>
          <p className={styles.tag}>Доставка</p>
          <div className={styles.circle}></div>
          <p className={styles.tag}>Сборка</p>
          <div className={styles.circle}></div>
          <p className={styles.tag}>Гарантия</p>
        </div>
        <h2 className={`${styles.title} ${styles.boldTitle}`}>
          Корпусная мебель <br /> на заказ от производителя
        </h2>
        <p className={`${styles.subtitle} ${styles.boldSubtitle}`}>
          Производство высококачественной мебели по индивидуальным заказам и
          размерам. Мы изготавливаем корпусную и встроенную мебель, такую как
          распашные шкафы, угловые и шкафы-купе, а также прихожие, комоды,
          тумбы, мебельные гарнитуры для кухни и многое другое.
        </p>

        <OrangeButton className={styles.button} onClick={openModal}>
          Рассчитать стоимость
        </OrangeButton>
      </div>
    </div>
  );
};
