import Icon from '@/shared/IconsComponents/Icon';
import Logo from '@/shared/Logo/Logo';

import { Icons } from '@/shared/IconsComponents/Icons';
import { links, pagesLinks } from '@/shared/constants';
import Link from 'next/link';
import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.upperWrapper}>
					<Logo />
					<div className={styles.pages}>
						<Link href={`#${pagesLinks.howWeWork}`} className={styles.link}>
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
							<Icon icon={Icons.phone(styles.downIcon)} />
							<p className={styles.downLinkText}>{links.phone}</p>
						</a>
						<a
							href={links.mailTo}
							className={`${styles.downLink} ${styles.mt}`}
						>
							<Icon icon={Icons.mail(styles.downIcon)} />
							<p className={styles.downLinkText} itemProp='email'>
								{links.email}
							</p>
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
					<p className={styles.footerDownText} itemProp='address'>
						г. Москва, ул. Новоостаповская д. 6Б. Мы работаем 10:00 - 20:00 /
						Без выходных
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
