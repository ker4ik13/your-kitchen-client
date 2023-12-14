"use client";

import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import styles from "./HelloScreen.module.scss";
import Image from "next/image";
import bgImage from "@/data/images/bg.png";

interface HelloScreenProps {
  setIsOpen: (isOpen: boolean) => void;
}

const HelloScreen = ({ setIsOpen }: HelloScreenProps) => {
  return (
    <div className={styles.helloScreen}>
      <Image src={bgImage} className={styles.bgImage} alt='Фон' />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Кухни напрямую с фабрики с десятилетней гарантией, в срок от 10 дней
        </h1>
        <div className={styles.subtitle}>
          <Icon icon={Icons.ruble(styles.subtitleIcon)} />
          <p className={styles.subtitleText}>рассрочка до 24 месяцев</p>
        </div>
        <div className={styles.subtitle2}>
          <span>+</span>
          <p className={styles.subtitle2Text}>
            3D дизайн проект и расчет за 0 ₽
          </p>
        </div>
        <button
          type='button'
          className={styles.orangeButton}
          onClick={() => {
            setIsOpen(true);
            document.body.classList.add("overflow");
          }}
        >
          Рассчитать стоимость
        </button>
      </div>
    </div>
  );
};

export default HelloScreen;
