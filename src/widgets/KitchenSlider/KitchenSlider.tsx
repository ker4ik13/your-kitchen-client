"use client";

import "@/shared/styles/swiper-buttons.css";
import "@/shared/styles/swiper-pagination-top.css";
import Image from "next/image";
import { useState } from "react";
import typeSwiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./KitchenSlider.module.scss";

interface Props {
  photos: string[];
}

export const KitchenSlider = ({ photos }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<typeSwiper | null>(null);
  const handleThumbs = (swiper: typeSwiper) => setThumbsSwiper(swiper);

  return (
    <div className={styles.swiper}>
      <Swiper
        className={styles.slider}
        modules={[Navigation, Pagination, Thumbs]}
        loop
        allowTouchMove={
          typeof window !== "undefined" && window.innerWidth < 768
        }
        navigation={{
          enabled: true,
        }}
        thumbs={{
          slideThumbActiveClass: styles.activeThumb,
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        pagination={{
          enabled: true,
        }}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.sliderSlide}>
            <Image
              src={photo}
              width={850}
              height={600}
              alt={`Кухня ${index + 1}`}
              className={styles.sliderImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        modules={[Thumbs, Navigation]}
        onSwiper={handleThumbs}
        className={styles.thumbsSlider}
        direction={
          typeof window !== "undefined" && window.innerWidth > 768
            ? "vertical"
            : "horizontal"
        }
        watchSlidesProgress
        spaceBetween={10}
        slidesPerView={
          typeof window !== "undefined" && window.innerWidth > 768
            ? 5.5
            : "auto"
        }
        allowTouchMove
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.thumbsSlide}>
            <Image
              src={photo}
              width={100}
              height={100}
              alt={`Кухня ${index + 1}`}
              className={styles.thumbsImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
