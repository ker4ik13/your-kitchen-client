'use client';

import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import Logo from '@/shared/Logo/Logo';
import { links, pagesLinks } from '@/shared/constants';
import Link from 'next/link';
import { useRef } from 'react';
import styles from './Nav.module.scss';
import { handleNav } from './handleNav';

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
							<Link href={`/${pagesLinks.howWeWork}`} className={styles.link}>
								Как мы работаем
							</Link>
							<Link href={`${pagesLinks.portfolio}`} className={styles.link}>
								Наши кухни
							</Link>
							<Link href={`${pagesLinks.reviews}`} className={styles.link}>
								Отзывы
							</Link>
							<Link href={`${pagesLinks.articles}`} className={styles.link}>
								Статьи
							</Link>
							<Link href={`${pagesLinks.advantages}`} className={styles.link}>
								Преимущества
							</Link>
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
							<Link href={links.phone} className={styles.contactsWrapper}>
								<Icon icon={Icons.phone(styles.personIcon)} />
								<p className={styles.contactsText} itemProp='telephone'>
									+7 (495) 988-55-28
								</p>
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
