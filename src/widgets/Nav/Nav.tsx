"use client";

import Logo from "@/shared/Logo/Logo";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
// import { Menu } from "@headlessui/react";
import styles from "./Nav.module.scss";
import { handleNav } from "./handleNav";
import { useRef } from "react";
import Link from "next/link";

// const teamLinks = [
//   { href: "/team/designers", label: "Дизайнеры" },
//   { href: "/team/masters", label: "Мастера" },
//   { href: "/team/managers", label: "Менеджеры" },
// ];

const Nav = () => {
  const burgerWrapper = useRef<HTMLDivElement>(null);
  // const [rotate, setRotate] = useState<ChevronDirection>(ChevronDirection.Up);

  // const handleRotate = () => {
  //   if (rotate === ChevronDirection.Up) {
  //     setRotate(ChevronDirection.Down);
  //   } else {
  //     setRotate(ChevronDirection.Up);
  //   }
  // };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Logo />
          <div className={styles.burgerWrapper} ref={burgerWrapper}>
            <div className={styles.pages}>
              <Link href={"/#how-we-work"} className={styles.link}>
                Как мы работаем
              </Link>
              <Link href={"/portfolio"} className={styles.link}>
                Наши кухни
              </Link>
              <Link href={"#reviews"} className={styles.link}>
                Отзывы
              </Link>
              {/* <Link href={"/articles"} className={styles.link}>
                Статьи
              </Link> */}
              {/* <div className={styles.menuWrapper}>
                <Menu>
                  <div className={styles.dropdownButtonWrapper}>
                    <Menu.Button
                      className={`${styles.link} ${styles.dropdownButton}`}
                      onClick={handleRotate}
                    >
                      Наша команда <Icon icon={Icons.chevron(rotate)} />
                    </Menu.Button>
                  </div>
                  <Menu.Items
                    className={`${styles.menuItems} ${styles.blurFilter}`}
                  >
                    {teamLinks.map((link) => (
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
                </Menu>
              </div> */}
            </div>
            <div className={styles.contacts}>
              {/* <Link
                to={"/"}
                className={`${styles.contactsWrapper} ${styles.hover}`}
              >
                <Icon icon={Icons.person(styles.icon)} />
                <p className={styles.contactsText}>Кабинет</p>
              </Link> */}
              <Link href='tel:+74959885528' className={styles.contactsWrapper}>
                <Icon icon={Icons.phone(styles.personIcon)} />
                <p className={styles.contactsText}>+7 (495) 988-55-28</p>
              </Link>
            </div>
          </div>
          <div
            className={styles.burger}
            onClick={(event) => handleNav(event, burgerWrapper, styles)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
