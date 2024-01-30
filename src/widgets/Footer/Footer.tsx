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
      itemType="https://schema.org/Organization"
    >
      <div className={styles.container}>
        <div className={styles.upperWrapper}>
          <Logo />
          <div className={styles.pages}>
            <Link href={"/"} className={styles.link}>
              Главная
            </Link>
            <Link href={`${pagesLinks.portfolio}`} className={styles.link}>
              Наши кухни
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
            <a href={links.tel} className={styles.downLink}>
              <Icons.phone className={styles.downIcon} />
              <p className={styles.downLinkText} itemProp="telephone">
                {links.phone}
              </p>
            </a>
            <a
              href={links.mailTo}
              className={`${styles.downLink} ${styles.mt}`}
            >
              <Icons.mail className={styles.downIcon} />
              <p className={styles.downLinkText} itemProp="email">
                {links.email}
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.badge}>
        <iframe
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
            <Link href={links.tgGroup} target="_blank">
              <Icons.telegram className={styles.footerDownIcon} />
            </Link>
            <Link href={links.whatsapp} target="_blank">
              <Icons.whatsapp className={styles.footerDownIcon} />
            </Link>
            <Link href={links.vk} target="_blank">
              <Icons.vk className={styles.footerDownIcon} />
            </Link>
          </div>
          <p className={styles.footerDownText}>
            <span itemProp="address">
              г. Москва, ул. Новоостаповская д. 6Б.
            </span>
            <span> </span>
            <span>Мы работаем 10:00 - 20:00 / Без выходных</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
