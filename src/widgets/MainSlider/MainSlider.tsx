"use client";

import { useState } from "react";
import typeSwiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DiscountsHelloScreenSlider } from "../ChoiseHelloScreen/DiscountsHelloScreenSlider";
import { FurnitureHelloScreenSlider } from "../ChoiseHelloScreen/FurnitureHelloScreenSlider";
import { KitchensHelloScreen } from "../ChoiseHelloScreen/KitchensHelloScreen";
import { PricesHelloScreen } from "../ChoiseHelloScreen/PricesHelloScreen";
import Modal1 from "../Modals/Modal1";
import ThanksModal from "../Modals/ThanksModal";
import styles from "./MainSlider.module.scss";

export const MainSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenThanks, setIsOpenThanks] = useState(false);
  const [swiper, setSwiper] = useState<typeSwiper | null>(null);

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
      <div className={styles.firstBlock}>
        <Swiper
          onInit={(swiper) => setSwiper(swiper)}
          // slideNextClass={styles.nextButton}
          // slidePrevClass={styles.prevButton}
          modules={[Navigation, Pagination]}
          navigation={{
            enabled: true,
            prevEl: styles.prevButton,
            nextEl: styles.nextButton,
          }}
          pagination={{
            enabled: true,
            clickable: true,
            horizontalClass: styles.horizontal,
            verticalClass: styles.vertical,
            currentClass: styles.pagination,
            // bulletActiveClass: styles.bulletActive,
            // bulletClass: styles.bullet,
          }}
          allowTouchMove={false}
          loop={true}
          className={styles.mainSwiper}
        >
          <SwiperSlide className={styles.slide}>
            <KitchensHelloScreen openModal={() => setIsOpen(true)} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <FurnitureHelloScreenSlider openModal={() => setIsOpen(true)} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <DiscountsHelloScreenSlider openModal={() => setIsOpen(true)} />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <PricesHelloScreen openModal={() => setIsOpen(true)} />
          </SwiperSlide>
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className={styles.prevButton}
          ></button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className={styles.nextButton}
          ></button>
        </Swiper>
      </div>
    </>
  );
};
