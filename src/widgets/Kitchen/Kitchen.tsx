"use client";

import { SITE_NAME } from "@/shared/constants";
import "@/shared/styles/swiper-my.css";
import { IKitchen } from "@/types/IKitchen";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PreviewPhotos from "../PreviewPhotos/PreviewPhotos";
import styles from "./Kitchen.module.scss";

interface KitchenProps {
  kitchen: IKitchen;
  isPreview?: boolean;
}

const Kitchen = ({ kitchen, isPreview }: KitchenProps) => {
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const openPreview = () => {
    if (isPreview) {
      setIsOpenPreview(true);
      document.body.classList.add("overflow");
    } else {
      return;
    }
  };

  const closePreview = () => {
    if (isPreview) {
      setIsOpenPreview(false);
      document.body.classList.remove("overflow");
    } else {
      return;
    }
  };
  return (
    <>
      {isPreview && isOpenPreview && (
        <PreviewPhotos
          isOpen={isOpenPreview}
          kitchen={kitchen}
          closePreview={closePreview}
        />
      )}
      <Swiper
        className={styles.kitchen}
        navigation={true}
        pagination={{
          enabled: true,
          clickable: true,
          horizontalClass: styles.pagination,
        }}
        allowTouchMove={
          typeof window !== "undefined" && window.innerWidth > 768
            ? false
            : true
        }
        loop={true}
        modules={[Navigation, Pagination]}
        onClick={openPreview}
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className={styles.content}>
          <span itemProp="brand" content={SITE_NAME}></span>
          <div className={styles.betweenWrapper}>
            <p className={styles.name} itemProp="name">
              {kitchen.title}
            </p>
            <div className={styles.tags} itemProp="keywords">
              <div className={styles.tag}>
                <p>{kitchen.style.label}</p>
              </div>
              {kitchen.type && (
                <div className={styles.tag}>
                  <p>{kitchen.type.label}</p>
                </div>
              )}
            </div>
          </div>
          <p className={styles.description} itemProp="description">
            {kitchen.description}
          </p>
          <div
            className={styles.contentWrapper}
            itemProp="offers"
            itemScope
            itemType="http://schema.org/AggregateOffer"
          >
            <div itemProp="priceCurrency" content="₽">
              <p
                className={styles.price}
                itemProp="price"
                content={kitchen.price.toString()}
              >
                <span className={styles.brown}>От </span>
                {kitchen.price.toLocaleString("ru")}
                <span>₽</span>
              </p>
            </div>
            <div className={styles.price}>
              <span className={styles.brown}>Срок </span>
              {kitchen.term}
            </div>
          </div>
        </div>
        {kitchen.photos.map((photo, index) => (
          <SwiperSlide key={index} className={styles.image}>
            <Image
              src={photo || ""}
              className={styles.img}
              draggable={false}
              alt={`${kitchen.title}` || ""}
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

export default Kitchen;
