"use client";

import bg1 from "@/data/images/discount_bg1.jpg";
import bg2 from "@/data/images/discount_bg2.jpg";
import bg3 from "@/data/images/discount_bg3.jpg";
import { OrangeButton } from "@/shared/ui";
import type { DiscountType, IDiscount } from "@/types/IDiscount";
import Image from "next/image";
import { useState } from "react";
import { DiscountModal } from "../Modals/DiscountModal";
import Modal1 from "../Modals/Modal1";
import ThanksModal from "../Modals/ThanksModal";
import styles from "./DiscountItem.module.scss";

interface Props {
  discount: IDiscount;
}

const isActiveDiscount = (isActive: boolean): string => {
  return isActive ? styles.discount : `${styles.discount} ${styles.archive}`;
};

const getDiscountType = (type: DiscountType): string => {
  switch (type) {
    case "discount":
      return "Скидка";
    case "gift":
      return "Подарок";
    case "promotion":
      return "Акция";
    default:
      return "Акция";
  }
};

const getBgFromDiscountType = (type: DiscountType): string => {
  switch (type) {
    case "discount":
      return bg1.src;
    case "gift":
      return bg2.src;
    case "promotion":
      return bg3.src;
    default:
      return bg1.src;
  }
};

export const DiscountItem = ({ discount }: Props) => {
  const [isOpenConditions, setIsOpenConditions] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  // Дата вида 01.01.2021
  const getDate = (date: string) => {
    const dateArray = date.split(".");
    return {
      day: dateArray[0],
      month: dateArray[1],
      year: dateArray[2],
    };
  };

  const getDiscountDate = (date: string) => {
    const { day, month } = getDate(date);
    return `${day}.${month}`;
  };

  return (
    <>
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <Modal1
        setIsOpen={setIsOpenModal}
        setIsOpenThanks={setIsOpenThanks}
        isOpen={isOpenModal}
        location="Страница акций"
        tag={`Акция: ${discount.name}`}
      />
      <DiscountModal
        discount={discount}
        isOpen={isOpenConditions}
        setIsOpen={setIsOpenConditions}
        setIsOpenThanks={setIsOpenThanks}
      />
      <div className={isActiveDiscount(discount.isActive)}>
        <Image
          src={getBgFromDiscountType(discount.type)}
          width={1060}
          height={310}
          alt="Фон"
          quality={100}
          draggable={false}
          className={styles.discount_bg}
        />
        {/* Левая часть */}
        <Image
          src={discount.image}
          width={350}
          height={260}
          alt="Акция"
          className={styles.leftImage}
        />
        <div className={styles.rightSide}>
          <div className={styles.upper}>
            <p className={styles.name}>{discount.name}</p>
            <div className={styles.term}>
              <p className={styles.termText}>Сроки проведения</p>
              <p className={styles.termDate}>{`${getDiscountDate(
                discount.startDate,
              )} - ${getDiscountDate(discount.endDate)}`}</p>
            </div>
          </div>
          <div className={styles.desc}>
            <p className={styles.descTitle}>Описание</p>
            <p className={styles.descText}>{discount.description}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpenConditions(true)}
            className={styles.link}
          >
            Подробные условия
          </button>
          <OrangeButton
            onClick={() => setIsOpenModal(true)}
            className={styles.button}
            disabled={!discount.isActive}
          >
            Учавствовать в акции
          </OrangeButton>
          <p className={styles.discount_type}>
            {getDiscountType(discount.type)}
          </p>
        </div>
      </div>
    </>
  );
};
