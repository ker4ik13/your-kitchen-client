"use client";

import "@/shared/styles/swiper-my.css";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./FurnitureItem.module.scss";
import { IFurniture } from "@/types/IFurniture";

interface FurnitureItemProps {
  furniture: IFurniture;
}

const FurnitureItem = ({ furniture }: FurnitureItemProps) => {
  return (
    <>
      <Swiper
        className={styles.kitchen}
        navigation={true}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        allowTouchMove={window.innerWidth <= 768}
        loop={true}
        modules={[Navigation, Pagination]}
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className={styles.content}>
          <div className={styles.betweenWrapper}>
            <p className={styles.name} itemProp="name">
              {furniture.name}
            </p>
          </div>
          <p className={styles.description} itemProp="description">
            {furniture.description}
          </p>
          <div className={styles.contentWrapper}>
            <div itemProp="offers">
              <p className={styles.price} itemProp="price" content="RUB">
                <span className={styles.brown}>От </span>
                {furniture.price.toLocaleString("ru")}
                <span>₽</span>
              </p>
            </div>
          </div>
        </div>
        {furniture.photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.image}>
            <Image
              src={photo || ""}
              className={styles.img}
              draggable={false}
              alt={`${furniture.name}` || ""}
              itemProp="image"
              width={461}
              height={500}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FurnitureItem;
