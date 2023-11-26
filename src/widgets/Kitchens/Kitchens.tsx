"use client";

import styles from "./Kitchens.module.scss";

import Kitchen from "../Kitchen/Kitchen";
import { useEffect, useState } from "react";
import { IKitchen } from "@/types/IKitchen";
import { UserKitchenService } from "@/services/UserKitchenService";

// enum ThisKitchensOptions {
//   all = "all",
//   loft = "loft",
//   classic = "classic",
//   minimalism = "minimalism",
//   hightech = "hightech",
//   chalet = "chalet",
// }

// const kitchensTranslate = {
//   all: "Все кухни",
//   loft: "Лофт",
//   classic: "Классика",
//   minimalism: "Минимализм",
//   hightech: "Хай-тек",
//   chalet: "Шале",
// };

// const kitchensArray = [
//   ThisKitchensOptions.all,
//   ThisKitchensOptions.loft,
//   ThisKitchensOptions.classNameic,
//   ThisKitchensOptions.minimalism,
//   ThisKitchensOptions.hightech,
//   ThisKitchensOptions.chalet,
// ];

interface KitchenProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Kitchens = ({ setIsOpen }: KitchenProps) => {
  const [kitchens, setKitchens] = useState<IKitchen[]>([]);
  // const [select, setSelect] = useState<ThisKitchensOptions>(
  //   ThisKitchensOptions.all,
  // );

  // const isActive = (variable: ThisKitchensOptions) =>
  //   select === variable ? `${styles.tab} ${styles.active}` : styles.tab;

  // const handleSelect = (value: ThisKitchensOptions) => {
  //   setSelect(value);
  // };
  const getKitchens = async () => {
    const response = await UserKitchenService.getMainKitchens();
    setKitchens(response);
  };

  useEffect(() => {
    getKitchens();
  }, []);

  return (
    <div className={styles.kitchensPage} id='kitchens'>
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
            <Kitchen kitchen={kitchen} key={index} isPreview />
          ))}
        </div>
        <div className={styles.linkWrapper}>
          {/* TODO: вынести кнопку в отдельный компонент */}
          <button
            type='button'
            className={styles.link}
            onClick={() => {
              setIsOpen(true);
              document.body.classList.add("overflow");
            }}
          >
            Получить полный каталог
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kitchens;
