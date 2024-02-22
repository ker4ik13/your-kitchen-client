"use client";

import { useState } from "react";
import typeSwiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { DiscountsHelloScreenSlider } from "../ChoiseHelloScreen/DiscountsHelloScreenSlider";
import { FurnitureHelloScreenSlider } from "../ChoiseHelloScreen/FurnitureHelloScreenSlider";
import { KitchensHelloScreen } from "../ChoiseHelloScreen/KitchensHelloScreen";
import { PricesHelloScreen } from "../ChoiseHelloScreen/PricesHelloScreen";
import { LeaveRequestFileModal } from "../Modals";
import styles from "./MainSlider.module.scss";

export const MainSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [swiper, setSwiper] = useState<typeSwiper | null>(null);
  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("overflow");
  };

  return (
    <>
      <LeaveRequestFileModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.firstBlock}>
        <Swiper
          onInit={(swiper) => setSwiper(swiper)}
          modules={[Navigation, Pagination, Autoplay]}
          speed={1250}
          autoplay={{
            delay: 4000,
          }}
          navigation={{
            enabled: true,
            prevEl: styles.prevButton,
            nextEl: styles.nextButton,
          }}
          pagination={{
            enabled: true,
            clickable: true,
            currentClass: styles.pagination,
            horizontalClass: styles.horizontal,
            bulletElement: "button",
          }}
          allowTouchMove={false}
          loop={true}
          className={styles.mainSwiper}
        >
          <SwiperSlide className={styles.slide}>
            <KitchensHelloScreen />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <FurnitureHelloScreenSlider />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <DiscountsHelloScreenSlider />
          </SwiperSlide>
          <SwiperSlide className={styles.slide}>
            <PricesHelloScreen openModal={openModal} />
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
