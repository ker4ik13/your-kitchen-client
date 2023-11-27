import styles from "./PreviewPhotos.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "@/shared/styles/swiper-my.css";
import { useState } from "react";
import typeSwiper from "swiper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsOpen } from "@/store/kitchens.slice";
import "./preview-swiper.css";

const isOpenStyles = (isOpen: boolean) =>
  isOpen ? `${styles.preview} ${styles.open}` : styles.preview;

const PreviewPhotos = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<typeSwiper | null>(null);
  const handleThumbs = (swiper: typeSwiper) => setThumbsSwiper(swiper);

  const kitchenStore = useAppSelector((store) => store.kitchens);
  const dispatch = useAppDispatch();

  const closePreview = () => {
    dispatch(setIsOpen(false));
    document.body.classList.remove("overflow");
  };

  return (
    <div className={isOpenStyles(kitchenStore.isOpen)} onClick={closePreview}>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className={styles.relative}
      >
        {thumbsSwiper !== null && (
          <Swiper
            modules={[Navigation, Thumbs]}
            className={styles.previewSlider}
            navigation
            allowTouchMove
            loop
            spaceBetween={100}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            <button
              type='button'
              className={styles.closeButton}
              onClick={closePreview}
            >
              ×
            </button>
            {kitchenStore &&
              kitchenStore.kitchen.photos &&
              kitchenStore.kitchen.photos.map((photo, index) => (
                <SwiperSlide className={styles.previewSlide} key={index}>
                  <img src={photo} alt={photo} className={styles.previewImg} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        <Swiper
          className={styles.thumbsSlider}
          modules={[Thumbs, FreeMode]}
          onSwiper={handleThumbs}
          watchSlidesProgress={true}
          slideActiveClass={styles.activeSlide}
          slidesPerView={5}
          centerInsufficientSlides
          slidesPerGroup={5}
          spaceBetween={10}
          breakpoints={{
            650: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            400: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            200: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
        >
          {kitchenStore &&
            kitchenStore.kitchen.photos &&
            kitchenStore.kitchen.photos.map((photo, index) => (
              <SwiperSlide className={styles.thumbsSlide} key={index}>
                <img
                  src={photo}
                  alt={photo}
                  className={styles.thumbsImg}
                  draggable={false}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PreviewPhotos;
