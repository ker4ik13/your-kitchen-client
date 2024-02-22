import Logo from "@/shared/Logo/Logo";

import { Icons } from "@/shared/IconsComponents/Icons";
import { links, pagesLinks } from "@/shared/constants";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <div className={styles.container}>
        <div className={styles.upperWrapper}>
          <Logo isSchemaOrg />
          <div className={styles.pages}>
            <Link href={"/"} className={styles.link}>
              Главная
            </Link>
            <Link href={`${pagesLinks.portfolio}`} className={styles.link}>
              Каталог
            </Link>
            <Link href={`${pagesLinks.furniture}`} className={styles.link}>
              Мебель
            </Link>
            <Link href={`${pagesLinks.advantages}`} className={styles.link}>
              Преимущества
            </Link>
            <Link href={`${pagesLinks.articles}`} className={styles.link}>
              Статьи
            </Link>
            <Link href={`${pagesLinks.reviews}`} className={styles.link}>
              Отзывы
            </Link>
            <Link href={`${pagesLinks.discounts}`} className={styles.link}>
              Акции
            </Link>
            {/* <Menu>
              <div className={styles.menuRelative}>
                <div className={styles.menuFlex}>
                  <Menu.Button
                    className={`${styles.link} ${styles.buttonLink}`}
                    onClick={handleRotate}
                  >
                    Наша команда <Icon icon={Icons.chevron(rotate)} />
                  </Menu.Button>
                </div>
                <Menu.Items className={`${styles.dropdownMenu}`}>
                  {teamLinks
                    .slice()
                    .reverse()
                    .map((link) => (
                      <Menu.Item
                        as="a"
                        key={link.href}
                        href={link.href}
                        className={styles.link}
                      >
                        {link.label}
                      </Menu.Item>
                    ))}
                </Menu.Items>
              </div>
            </Menu> */}
          </div>
          <div className={styles.downWrapper}>
            <Link
              aria-label="Телефон"
              href={links.tel}
              className={styles.downLink}
            >
              <Icons.phone className={styles.downIcon} />
              <p className={styles.downLinkText} itemProp="telephone">
                {links.phone}
              </p>
            </Link>
            <Link
              aria-label="Почта"
              href={links.mailTo}
              className={`${styles.downLink} ${styles.mt}`}
            >
              <Icons.mail className={styles.downIcon} />
              <p className={styles.downLinkText} itemProp="email">
                {links.email}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.badge}>
        <iframe
          title="Рейтинг в Яндекс"
          src="https://yandex.ru/sprav/widget/rating-badge/192446974752?type=rating&theme=dark"
          width="150"
          height="50"
        ></iframe>
      </div>
      <div className={styles.footerDown}>
        <div className={styles.downContainer}>
          <p className={styles.footerDownText}>
            &copy; 2023 Мебельная фабрика «
            <span itemProp="name">Твоя Кухня</span>
            ». Все права защищены.
          </p>
          <div className={styles.footerIcons}>
            <Link aria-label="Телеграм" href={links.tgGroup} target="_blank">
              <Icons.telegram className={styles.footerDownIcon} />
            </Link>
            <Link aria-label="Whatsapp" href={links.whatsapp} target="_blank">
              <Icons.whatsapp className={styles.footerDownIcon} />
            </Link>
            <Link aria-label="Вконтакте" href={links.vk} target="_blank">
              <Icons.vk className={styles.footerDownIcon} />
            </Link>
          </div>
          <div className={styles.footerDownText}>
            <div
              itemProp="address"
              itemScope
              itemType="http://schema.org/PostalAddress"
            >
              <span itemProp="addressLocality"> г. Москва,</span>
              <span itemProp="streetAddress">
                ул. Новоостаповская д. 6Б.
              </span>{" "}
              <span itemProp="postalCode" content="115088"></span>
            </div>
            <time itemProp="openingHours" dateTime="Mo-Su 10:00-20:00">
              Мы работаем 10:00 - 20:00 / Без выходных
            </time>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
