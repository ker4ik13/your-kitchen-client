import { IKitchen } from "@/types/IKitchen";
import styles from "./Kitchen.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/shared/styles/swiper-my.css";

interface KitchenProps {
  kitchen: IKitchen;
}

const Kitchen = ({ kitchen }: KitchenProps) => {
  return (
    <Swiper
      className={styles.kitchen}
      navigation={true}
      pagination={{
        enabled: true,
        clickable: true,
      }}
      loop={true}
      modules={[Navigation, Pagination]}
    >
      <div className={styles.content}>
        <p className={styles.name}>{kitchen.title}</p>
        <p className={styles.description}>{kitchen.description}</p>
        <div className={styles.contentWrapper}>
          <p className={styles.price}>
            От {kitchen.price.toLocaleString("ru")}
            <span>₽</span>
          </p>
          <div className={styles.tag}>
            <p>{kitchen.style.value}</p>
          </div>
        </div>
      </div>
      {kitchen.photos.map((photo, index) => (
        <SwiperSlide key={index} className={styles.image}>
          <img
            src={photo}
            className={styles.img}
            draggable={false}
            alt={`${kitchen.title}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Kitchen;
