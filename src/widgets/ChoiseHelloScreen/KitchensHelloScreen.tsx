import bgImage from "@/data/images/bg_kitchen_screen.jpg";
import { OrangeButton } from "@/shared/ui";
import Image from "next/image";
import styles from "./ChoiseHelloScreen.module.scss";

interface Props {
  openModal: () => void;
}

export const KitchensHelloScreen = ({ openModal }: Props) => {
  return (
    <>
      <div className={`${styles.helloScreen} ${styles.kitchensScreen}`}>
        <Image
          src={bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
          priority
          quality={100}
        />
        <div className={`${styles.container} ${styles.reverseDots}`}>
          <div className={`${styles.tags} ${styles.column}`}>
            <div className={styles.tagWrapper}>
              <p className={styles.tag}>Рассрочка до 24 месяцев</p>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.tagWrapper}>
              <p className={styles.tag}>Производство от 10 дней</p>
              <div className={styles.circle}></div>
            </div>
            <div className={styles.tagWrapper}>
              <p className={styles.tag}>Бесплатный дизайн проект</p>
              <div className={`${styles.circle} ${styles.last}`}></div>
            </div>
          </div>
          <h1 className={`${styles.title} ${styles.boldTitle} ${styles.w840}`}>
            Кухни на заказ от производителя в Москве и Московской области
          </h1>
          <p className={`${styles.subtitle} ${styles.boldSubtitle}`}>
            Индивидуальные кухни на заказ от производителя в Москве и Московской
            области с гарантией и возможностью рассрочки до 24 месяцев:
            выбирайте из широкого ассортимента стилей и материалов,
            наслаждайтесь уникальным дизайном и комфортом.
          </p>

          <OrangeButton className={styles.button} onClick={openModal}>
            получить 3D-проект и скидку
          </OrangeButton>
        </div>
      </div>
    </>
  );
};
