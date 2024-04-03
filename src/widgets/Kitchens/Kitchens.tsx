"use client";

import { OrangeButton } from "@/shared/ui";
import { IKitchen } from "@/types/IKitchen";
import { useState } from "react";
import Kitchen from "../Kitchen/Kitchen";
import styles from "./Kitchens.module.scss";

interface KitchensProps {
  kitchens: IKitchen[];
  moreKitchens: IKitchen[];
}

const STEP = 4;

const Kitchens = ({ kitchens, moreKitchens }: KitchensProps) => {
  const [viewKitchens, setViewKitchens] = useState(kitchens);

  const showMore = () => {
    const newKitchens = moreKitchens.filter((kitchen) => {
      return !viewKitchens.some((item) => item._id === kitchen._id);
    });

    setViewKitchens([...viewKitchens, ...newKitchens.slice(0, STEP)]);
  };

  return (
    <>
      <div className={styles.kitchensPage} id="kitchens">
        <div className={styles.container}>
          <h3 className={styles.title}>
            За <span>9</span> лет произвели более 1.5&nbsp;тысяч гарнитуров в
            Москве
          </h3>
          <p className={styles.subtitle2}>
            Мы воплощаем в жизнь модные дизайнерские решения и необычные идеи.
          </p>
          <p className={styles.subtitle}>
            <span>Выберите свою:</span> от лофта до классики
          </p>
          <div className={styles.kitchens}>
            {viewKitchens.slice(0, 5).map((kitchen, index) => (
              <div className={styles.customKitchen} key={index}>
                <Kitchen kitchen={kitchen} />
              </div>
            ))}
          </div>
          {viewKitchens.length > 5 && (
            <div className={styles.moreKitchens}>
              {viewKitchens.slice(5).map((kitchen, index) => (
                <div className={styles.kitchenWrapper} key={index}>
                  <Kitchen kitchen={kitchen} />
                </div>
              ))}
            </div>
          )}
          <div className={styles.string}>
            {viewKitchens.length < moreKitchens.length && (
              <OrangeButton onClick={showMore}>Показать еще</OrangeButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kitchens;
