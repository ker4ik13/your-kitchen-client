// import { useState } from "react";
import styles from "./Kitchens.module.scss";

// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/shared/styles/swiper-my.css";
import { kitchens } from "@/data/kitchens/kitchens";
import Image from "next/image";

// enum ThisKitchensOptions {
//   all = "all",
//   loft = "loft",
//   classNameic = "classNameic",
//   minimalism = "minimalism",
//   hightech = "hightech",
//   chalet = "chalet",
// }

// const kitchensTranslate = {
//   all: "Все кухни",
//   loft: "Лофт",
//   classNameic: "Классика",
//   minimalism: "Минимализм",
//   hightech: "Хай-тек",
//   chalet: "Шале",
// };

// const kitchensArray = [
//   ThisKitchensOptions.all,
//   ThisKitchensOptions.loft,
//   ThisKitchensOptions.classNameic,
//   ThisKitchensOptions.minimalism,
//   ThisKitchensOptions.hightech,
//   ThisKitchensOptions.chalet,
// ];

interface KitchenProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Kitchens = ({ setIsOpen }: KitchenProps) => {
  // const [select, setSelect] = useState<ThisKitchensOptions>(
  //   ThisKitchensOptions.all,
  // );

  // const isActive = (variable: ThisKitchensOptions) =>
  //   select === variable ? `${styles.tab} ${styles.active}` : styles.tab;

  // const handleSelect = (value: ThisKitchensOptions) => {
  //   setSelect(value);
  // };

  return (
    <div className={styles.kitchensPage} id='kitchens'>
      <div className={styles.container}>
        <h3 className={styles.title}>
          За <span>6</span> лет произвели более 1.5&nbsp;тысяч гарнитуров в
          Москве
        </h3>
        <p className={styles.subtitle}>
          <span>Выберите свою:</span> от лофта до классики
        </p>
        {/* <div className={styles.tabs}>
          {kitchensArray.map((variable, index) => (
            <button
              className={isActive(variable)}
              key={index}
              onClick={() => handleSelect(variable)}
            >
              {kitchensTranslate[variable]}
            </button>
          ))}
        </div> */}
        <div className={styles.kitchens}>
          {kitchens.map((kitchen, index) => (
            <Swiper
              className={styles.kitchen}
              navigation={true}
              pagination={{
                enabled: true,
                clickable: true,
              }}
              loop={true}
              modules={[Navigation, Pagination]}
              key={index}
            >
              <div className={styles.content}>
                <p className={styles.name}>{kitchen.title}</p>
                <p className={styles.description}>{kitchen.description}</p>
                <div className={styles.contentWrapper}>
                  <p className={styles.price}>
                    От {kitchen.price.toLocaleString("ru")}
                    <span>₽</span>
                  </p>
                  {kitchen.options.map((option, index) => (
                    <div className={styles.tag} key={index}>
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
              </div>
              {kitchen.photos.map((photo, index) => (
                <SwiperSlide key={index} className={styles.image}>
                  <Image
                    src={photo}
                    className={styles.img}
                    draggable={false}
                    alt={`${kitchen.title}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        </div>
        <div className={styles.linkWrapper}>
          {/* TODO: вынести кнопку в отдельный компонент */}
          <button
            type='button'
            className={styles.link}
            onClick={() => {
              setIsOpen(true);
              document.body.classList.add("overflow");
            }}
          >
            Получить полный каталог
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kitchens;
