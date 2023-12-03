"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Reviews.module.scss";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";
import "@/shared/styles/swiper-my.css";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import { useState } from "react";
import type { IReview } from "@/types/IReview";
import typeSwiper from "swiper";

interface ReviewProps {
  review: IReview;
}

const isOpenCard = (state: boolean): string =>
  !state ? styles.personCard : `${styles.personCard} ${styles.open}`;

const isOpenReview = (state: boolean): string =>
  !state ? "Читать весь отзыв" : "Скрыть отзыв";

const Review = ({ review }: ReviewProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<typeSwiper | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleThumbs = (swiper: typeSwiper) => setThumbsSwiper(swiper);
  const handleOpen = () => (!isOpen ? setIsOpen(true) : setIsOpen(false));

  return (
    <>
      {/* Слайдер отзывы */}
      <div className={styles.review}>
        {/* Карточка пользователя */}
        <div className={styles.cardWrapper}>
          <div className={isOpenCard(isOpen)}>
            <Icon icon={Icons.quotes(styles.quotes)} />
            <div className={styles.personInfo}>
              {review.photo && (
                <img
                  src={review.photo}
                  className={styles.personPhoto}
                  alt={`${review.firstName}`}
                />
              )}
              <div className={styles.personName}>
                <p className={styles.personFirstName}>{review.firstName}</p>
                <p className={styles.personLastName}>
                  {review.lastName && review.lastName.slice(0, 1)}.
                </p>
              </div>
            </div>
            <div className={styles.reviewText}>{review.text}</div>
            <button
              type='button'
              onClick={handleOpen}
              className={styles.reviewLink}
            >
              {isOpenReview(isOpen)}
            </button>
          </div>
        </div>

        {/* Слайдер предпросмотр */}
        {thumbsSwiper !== null && (
          <Swiper
            className={styles.reviewSlider}
            modules={[Navigation, Thumbs]}
            allowTouchMove={window.innerWidth > 768 ? false : true}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            {review.photos.map((photo, index) => (
              <SwiperSlide key={index} className={styles.reviewSlide}>
                <img src={photo} alt={`Фото ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* Слайдер карточки предпросмотра */}
        <Swiper
          modules={[Thumbs]}
          onSwiper={handleThumbs}
          spaceBetween={8}
          className={styles.previewSlider}
          watchSlidesProgress={true}
          slidesPerView={3}
          breakpoints={{
            800: {
              slidesPerView: 3,
            },
            300: {
              slidesPerView: 2,
            },
          }}
        >
          {review.photos.map((photo, index) => (
            <SwiperSlide className={styles.previewImgWrapper} key={index}>
              <img
                src={photo}
                className={styles.previewImg}
                alt={`Фото ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Review;
