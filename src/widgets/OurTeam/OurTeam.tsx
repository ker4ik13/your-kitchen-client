import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./OurTeam.module.scss";
import { team } from "@/data/team/team";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css/navigation";
import Worker from "../Worker/Worker";

const OurTeam = () => {
  return (
    <div className={styles.ourTeamPage}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>
            Наша команда специалистов с опытом от <span>5</span> лет
          </h3>
        </div>
        <p className={styles.bgText}>
          Твоя <br /> кухня
        </p>
        <Swiper
          className={`${styles.slider} workersSlider`}
          slidesPerView={2.8}
          initialSlide={2}
          spaceBetween={50}
          centeredSlides
          loop
          effect='coverflow'
          navigation={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            modifier: 1,
            slideShadows: false,
            scale: 0.9,
          }}
          breakpoints={{
            900: {
              slidesPerView: 2.8,
            },
            200: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
          modules={[EffectCoverflow, Navigation]}
        >
          {team.map((worker) => (
            <SwiperSlide
              className={`${styles.worker} workerSlide`}
              key={worker._id}
            >
              <Worker worker={worker} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurTeam;
