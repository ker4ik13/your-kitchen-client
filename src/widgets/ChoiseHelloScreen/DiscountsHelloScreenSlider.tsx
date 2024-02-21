import bgImage from "@/data/images/bg_discounts_screen.jpg";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

interface Props {
  openModal: () => void;
}

export const DiscountsHelloScreenSlider = ({ openModal }: Props) => {
  return (
    <>
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
            <p className={styles.tag}>Скидки</p>
            <div className={styles.circle}></div>
            <p className={styles.tag}>Акции</p>
            <div className={styles.circle}></div>
            <p className={styles.tag}>Подарки</p>
          </div>
          <h2 className={`${styles.title} ${styles.boldTitle} ${styles.w1050}`}>
            Подарки и техника новым и действующим клиентам фабрики «Твоя кухня»
          </h2>
          <p className={`${styles.subtitle} ${styles.boldSubtitle}`}>
            Актуальный каталог акций и скидок на кухни и корпусную мебель в
            Москве. Выгодные предложения на покупку кухонного гарнитура и другой
            мебели на заказ.
          </p>

          <OrangeButton className={styles.button} onClick={openModal}>
            Подробнее об акциях
          </OrangeButton>
        </div>
      </div>
    </>
  );
};
