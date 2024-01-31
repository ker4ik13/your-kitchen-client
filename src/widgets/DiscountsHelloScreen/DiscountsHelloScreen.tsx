"use client";

import bgImage from "@/data/images/bg_discouts.jpg";
import { Icons } from "@/shared/IconsComponents/Icons";
import Image from "next/image";
import { useState } from "react";
import Modal1 from "../Modals/Modal1";
import ThanksModal from "../Modals/ThanksModal";
import styles from "./DiscountsHelloScreen.module.scss";

export const DiscountsHelloScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);
  return (
    <>
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <Modal1
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsOpenThanks={setIsOpenThanks}
        location="Страница корпусной мебели"
        descriptionText={
          <>
            чтобы <span>рассчитать стоимость мебели</span> по телефону или
            договориться о выезде на замер.
            <br /> Выезд <span>бесплатный</span> и возможен в этот же день
          </>
        }
      />
      <div className={styles.helloScreen}>
        <Image
          src={bgImage}
          className={styles.bgImage}
          alt="Фон"
          draggable={false}
          priority
          quality={100}
        />
        <div className={styles.container}>
          <h1 className={styles.title}>Скидки, акции и подарки</h1>
          <div className={styles.divider}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className={styles.subtitle}>
            Актуальный каталог акций и скидок на кухни и корпусную мебель в
            Москве. Выгодное предложения на покупку кухонного гарнитура или
            другой мебели на заказ.
          </p>
          <div className={styles.description}>
            <p>
              <Icons.gift className={styles.icon} />
              <span>Подарки и техника</span> новым и действующим клиентам
              фабрики «Твоя кухня».
            </p>
          </div>
          {/* <button type="button" className={styles.downButton}>
            <Icons.arrow className={styles.arrowIcon} />
          </button> */}
        </div>
      </div>
    </>
  );
};
