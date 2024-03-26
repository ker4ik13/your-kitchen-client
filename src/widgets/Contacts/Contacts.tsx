import { Icons } from "@/shared/IconsComponents/Icons";
import { links } from "@/shared/constants";
import Link from "next/link";
import styles from "./Contacts.module.scss";

export const Contacts = () => {
  return (
    <div className={styles.contactsPage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.upperText}>
            <h5>
              <b>В нашем офисе вы всегда в спокойной обстановке можете:</b>
            </h5>
            <br />
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <Icons.rubleWithoutBg className={styles.icon} />
              <p className={styles.cardText}>
                встретиться с дизайнером для обсуждения проекта изготовления
                кухни и другой корпусной мебели;
              </p>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.lamp className={styles.icon} />
              <p className={styles.cardText}>
                обсудить с менеджером все детали процесса заключения договора,
                доставки, сборки, задать все интересующие вас вопросы;
              </p>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.diamond2 className={styles.icon} />
              <p className={styles.cardText}>
                увидеть и оценить качество фасадов, корпусов, столешниц и других
                материалов используемых в производстве;
              </p>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.settings className={styles.icon} />
              <p className={styles.cardText}>
                знакомится с договором и сопутствующими документами на доставку
                и другими этапами выполняемых работ.
              </p>
            </div>
            <br />
          </div>
        </div>
        <div className={styles.map}>
          <iframe
            src="https://yandex.ru/map-widget/v1/org/tvoya_kukhnya/192446974752/?ll=37.670115%2C55.719815&z=15"
            width="610"
            height="400"
            allowFullScreen
          ></iframe>
          <div className={styles.content}>
            <div className={styles.card}>
              <Icons.gps className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Офис:</b>
                </p>
                <p className={styles.cardText}>
                  г. Москва, ул. Новоостаповская, д. 6Б (м.&nbsp;Дубровка,
                  м.&nbsp;Волгоградский проспект)
                </p>
              </div>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.phoneWithoutBg className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Контакты:</b>
                </p>
                <p className={styles.cardText}>
                  тел:{" "}
                  <Link href={"tel:+74959885528"} className={styles.link}>
                    +7 (495) 988-55-28
                  </Link>
                </p>
                <p className={styles.cardText}>
                  e-mail:{" "}
                  <Link
                    href={"mailto:info@youkuhnya.ru"}
                    className={styles.link}
                  >
                    info@youkuhnya.ru
                  </Link>
                </p>
              </div>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.keys className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Производство:</b>
                </p>
                <p className={styles.cardText}>
                  г. Ульяновск, 42 Инженерный проезд, д.6
                </p>
              </div>
            </div>
            <br />
            <div className={styles.card}>
              <Icons.phonePlus className={styles.icon} />
              <div className={styles.column}>
                <p className={styles.cardText}>
                  <b>Альтернативные способы связи с нами:</b>
                </p>
                <div className={styles.icons}>
                  <Link
                    aria-label="Наш телеграм"
                    href={links.tgChat}
                    target="_blank"
                  >
                    <Icons.telegram className={styles.navIcon} />
                  </Link>
                  <Link
                    aria-label="WhatsApp"
                    href={links.whatsapp}
                    target="_blank"
                  >
                    <Icons.splashWhatsapp className={styles.navIcon} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.lowerText}>
          Закажите обратный звонок чтобы обсудить детали вашего проекта,
          оформить выезд дизайнера для проведения замера помещения под кухню или
          другую корпусную мебель, создать визуализацию и 3D-проект.
        </p>
      </div>
    </div>
  );
};
