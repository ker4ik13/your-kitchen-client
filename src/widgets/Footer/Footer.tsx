import Logo from "@/shared/Logo/Logo";
import Icon from "@/shared/IconsComponents/Icon";
// import { ChevronDirection, Icons } from "@/shared/IconsComponents/Icons";
// import { Menu } from "@headlessui/react";
// import { useState } from "react";
import styles from "./Footer.module.scss";
import { Icons } from "@/shared/IconsComponents/Icons";
import { links } from "@/data/links";
import Link from "next/link";

// const teamLinks = [
//   { href: "/team/designers", label: "Дизайнеры" },
//   { href: "/team/masters", label: "Мастера" },
//   { href: "/team/managers", label: "Менеджеры" },
// ];

const Footer = () => {
  // const [rotate, setRotate] = useState<ChevronDirection>(ChevronDirection.Up);

  // const handleRotate = () => {
  //   if (rotate === ChevronDirection.Up) {
  //     setRotate(ChevronDirection.Down);
  //   } else {
  //     setRotate(ChevronDirection.Up);
  //   }
  // };
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.upperWrapper}>
          <Logo />
          <div className={styles.pages}>
            <Link href={"#how-we-work"} className={styles.link}>
              Как мы работаем
            </Link>
            <Link href={"#kitchens"} className={styles.link}>
              Наши кухни
            </Link>
            <Link href={"#reviews"} className={styles.link}>
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
            <a href='tel:+74959885528' className={styles.downLink}>
              <Icon icon={Icons.phone(styles.downIcon)} />
              <p className={styles.downLinkText}>+7 (495) 988-55-28</p>
            </a>
            <a
              href='mailto:info@youkuhnya.ru'
              className={`${styles.downLink} ${styles.mt}`}
            >
              <Icon icon={Icons.mail(styles.downIcon)} />
              <p className={styles.downLinkText}>info@youkuhnya.ru</p>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerDown}>
        <div className={styles.downContainer}>
          <p className={styles.footerDownText}>
            © 2023 Мебельная фабрика «Твоя Кухня». Все права защищены.
          </p>
          <div className={styles.footerIcons}>
            <Link href={links.tgGroup}>
              <Icon icon={Icons.telegram(styles.footerDownIcon)} />
            </Link>
            <Link href={links.whatsapp}>
              <Icon icon={Icons.whatsapp(styles.footerDownIcon)} />
            </Link>
            <Link href={links.vk}>
              <Icon icon={Icons.vk(styles.footerDownIcon)} />
            </Link>
          </div>
          <p className={styles.footerDownText}>
            г. Москва, ул. Новоостаповская д. 6Б. Мы работаем 10:00 - 20:00 /
            Без выходных
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
