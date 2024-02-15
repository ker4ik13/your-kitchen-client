import { SITE_NAME, pagesData } from "@/shared/constants";
import "@/shared/styles/swiper-my.css";
import { IKitchen } from "@/types/IKitchen";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Kitchen.module.scss";

interface KitchenProps {
  kitchen: IKitchen;
  isPreview?: boolean;
  link?: string;
}

const Kitchen = ({ kitchen, isPreview, link }: KitchenProps) => {
  return (
    <>
      <Link
        className={styles.kitchen}
        href={
          link
            ? link
            : kitchen.slug
              ? `/${pagesData.portfolio.name}/${kitchen.slug}`
              : `${pagesData.portfolio.name}/${kitchen._id}`
        }
      >
        <Swiper
          className={styles.swiper}
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
            <div
              className={styles.description}
              itemProp="description"
              dangerouslySetInnerHTML={{
                __html: kitchen.description,
              }}
            ></div>
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
      </Link>
    </>
  );
};

export default Kitchen;
