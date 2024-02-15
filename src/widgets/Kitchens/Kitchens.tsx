"use client";

import { pagesData } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { IKitchen } from "@/types/IKitchen";
import Link from "next/link";
import { useState } from "react";
import Kitchen from "../Kitchen/Kitchen";
import Modal1 from "../Modals/Modal1";
import ThanksModal from "../Modals/ThanksModal";
import styles from "./Kitchens.module.scss";

interface KitchensProps {
  kitchens: IKitchen[];
}

const Kitchens = ({ kitchens }: KitchensProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);

  return (
    <>
      <Modal1
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsOpenThanks={setIsOpenThanks}
        buttonText="Получить каталог"
      />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <div className={styles.kitchensPage} id="kitchens">
        <div className={styles.container}>
          <h3 className={styles.title}>
            За <span>6</span> лет произвели более 1.5&nbsp;тысяч гарнитуров в
            Москве
          </h3>
          <p className={styles.subtitle}>
            <span>Выберите свою:</span> от лофта до классики
          </p>
          {/* <div className={styles.tabs}>
          {kitchensArray.map((variable, index) => (
            <button
              className={isActive(variable)}
              key={index}
              onClick={() => handleSelect(variable)}
            >
              {kitchensTranslate[variable]}
            </button>
          ))}
        </div> */}
          <div className={styles.kitchens}>
            {kitchens.map((kitchen, index) => (
              <Kitchen kitchen={kitchen} key={index} />
            ))}
          </div>
          <OrangeButton
            center
            onClick={() => {
              setIsOpen(true);
              document.body.classList.add("overflow");
            }}
          >
            Получить полный каталог
          </OrangeButton>
        </div>
      </div>
    </>
  );
};

export default Kitchens;
