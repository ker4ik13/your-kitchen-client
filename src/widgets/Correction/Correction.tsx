import acril1 from '@/data/images/acril1.webp';
import acril2 from '@/data/images/acril2.webp';
import colors from '@/data/images/colors.webp';
import pages from '@/data/images/pages.webp';
import money from '@/data/images/woman-money.webp';
import Icon from '@/shared/IconsComponents/Icon';
import { Icons } from '@/shared/IconsComponents/Icons';
import Image from 'next/image';
import styles from './Correction.module.scss';

interface CorrectionProps {
	setIsOpen: (isOpen: boolean) => void;
	setIsOpenVideo: (isOpen: boolean) => void;
}

const Correction = ({ setIsOpen, setIsOpenVideo }: CorrectionProps) => {
	return (
		<div className={styles.correctionPage} id='how-we-work'>
			<div className={styles.container}>
				<h2 className={styles.title1}>Вот как мы это исправим</h2>

				{/* Card 01 */}
				<div className={styles.card1}>
					<p className={styles.bgText}>01</p>
					<div className={styles.ellipse1}></div>
					<h3 className={styles.cardTitle}>Выбираем расположение</h3>
					<div className={styles.cardWrapper}>
						{/* Left side */}
						<div className={styles.leftSide}>
							<p className={styles.cardText}>
								Дизайнер, задав вопросы: кто и где будет готовить, какого роста,
								правша или левша, кулинарные привычки, поможет выбрать самую
								удобную для вас форму и расположение
							</p>
							<button
								type='button'
								className={styles.orangeButton}
								onClick={() => {
									setIsOpen(true);
									document.body.classList.add('overflow');
								}}
							>
								Оставить заявку
							</button>
						</div>

						{/* Center side */}
						<Image
							src={pages}
							className={styles.centerImg}
							alt='Чертеж'
							draggable={false}
						/>

						{/* Right side */}
						<div className={styles.rightSide}>
							<div className={styles.rightSideCard}>
								<Icon icon={Icons.coffee(styles.rightSideIcon)} />
								<p className={styles.rightSideText}>
									Ведь кому-то кухня нужна, чтобы просто выпить утренний кофе
								</p>
							</div>
							<div className={styles.rightSideCard}>
								<Icon icon={Icons.pot(styles.rightSideIcon)} />
								<p className={styles.rightSideText}>
									А кому-то чтобы готовить завтрак, обед и ужин на всю семью
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Card 02 */}
				<div className={styles.card1}>
					<p className={styles.bgText}>02</p>
					<div className={styles.ellipse2}></div>
					<h3 className={styles.cardTitle}>Подбираем материалы</h3>
					<div className={styles.cardWrapper}>
						{/* Left side */}
						<div className={styles.leftSideCard2}>
							<div className={styles.leftSideCard2String}>
								<p className={styles.leftSideCard2Number}>1.</p>
								<p className={styles.leftSideCard2Text}>
									Дизайнер показывает несколько вариантов, вы выбираете лучший
								</p>
							</div>
							<div className={styles.leftSideCard2String}>
								<p className={styles.leftSideCard2Number}>2.</p>
								<p className={styles.leftSideCard2Text}>
									Показываем еще несколько вариантов в том же стиле
								</p>
							</div>
							<div className={styles.leftSideCard2String}>
								<p className={styles.leftSideCard2Number}>3.</p>
								<p className={styles.leftSideCard2Text}>
									Находим самый подходящий вариант из всех возможных
								</p>
							</div>
						</div>

						{/* Center side */}
						<Image
							src={colors}
							className={styles.centerImg}
							alt='Цвета'
							draggable={false}
						/>

						{/* Right side */}
						<div className={styles.rightSideCard2}>
							<div className={styles.rightSideCard2Round}>
								<Icon icon={Icons.diamond(styles.rightSideCard2Icon)} />
								<p className={styles.rightSideCard2RoundText}>
									Так, мы <span>доведем проект до состояния:</span>
								</p>
							</div>
							<div className={styles.rightSideCard2RoundLower}>
								<Icon icon={Icons.heart(styles.rightSideCard2Icon)} />
								<p className={styles.rightSideCard2RoundText}>
									“да, это именно та кухня, которую я хочу!”
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Card 03 */}
				<div className={styles.card2}>
					<p className={styles.bgText2}>03</p>
					<div className={styles.ellipse3}></div>
					<div className={styles.cardWrapper}>
						{/* Left side */}
						<div className={styles.leftSideCard3}>
							<p className={styles.leftSideCard3Text}>
								— Что, если кухня, которая мне понравится, не войдет в мой
								бюджет?
							</p>
							<Image
								src={money}
								className={styles.woman}
								alt='Девушка'
								draggable={false}
							/>
						</div>

						{/* Center side */}
						<div className={styles.centerSideCard3}>
							<p className={styles.centerSideCard3Text}>
								Наша фабрика <span>«Твоя Кухня»</span> подготовила видео, в
								котором вы можете лучше ознакомиться с процессом изготовления,
								хранения, обработки, покраски и другими видами работ.
							</p>
							<button
								type='button'
								className={styles.card3OrangeButton}
								onClick={() => {
									setIsOpenVideo(true);
									document.body.classList.add('overflow');
								}}
							>
								Видео с производства
								<Icon icon={Icons.play(styles.card3ButtonIcon)} />
							</button>
						</div>

						{/* Right side */}
						<div className={styles.rightSideCard3}>
							<div className={styles.rightSideCard3TextWrapper}>
								<p>
									— <span>Переработаем проект</span>, чтобы кухня осталась
									такой, как вы хотите, но <span>вошла в ваш бюджет</span>
								</p>
							</div>
							<p className={styles.rightSideCard3Title}>Например</p>
							<p className={styles.rightSideCard3Subtitle}>
								<span>Можно подобрать аналоговые материалы:</span> Акрил с
								текстурой камня отлично заменит каменную столешницу. Визуально{' '}
								<span>разницы нет, а цена в 2-3 раза меньше</span>
							</p>
							<div className={styles.rightSideCard3ImgWrapper}>
								<Image
									className={styles.rightSideCard3Img1}
									src={acril1}
									alt='Акрил'
									draggable={false}
								/>
								<Image
									className={styles.rightSideCard3Img2}
									src={acril2}
									alt='Акрил'
									draggable={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Correction;
