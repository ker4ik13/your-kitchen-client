import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./OurTeam.module.scss";
import { team } from "@/data/team/team";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css/navigation";
import Worker from "../Worker/Worker";
import { useEffect, useState } from "react";
import { IWorker } from "@/types/IWorker";
import { UserWorkerService } from "@/services/UserWorkerService";

const OurTeam = () => {
  const [team, setTeam] = useState<IWorker[]>([]);

  const getTeam = async () => {
    const team = await UserWorkerService.getWorkers();
    setTeam(team);
  };

  useEffect(() => {
    getTeam();
  }, []);

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
        {team && team.length > 0 && (
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
        )}
        {!team ||
          (team.length === 0 && (
            <p className={styles.error}>Ошибка получения команды</p>
          ))}
      </div>
    </div>
  );
};

export default OurTeam;
