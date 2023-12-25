import { type IArticle } from '@/types/IArticle';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { VscEye } from 'react-icons/vsc';
import styles from './Articles.module.scss';

type Props = {
	article: IArticle;
	href: string;
};

const ArticleCard = ({ article, href }: Props) => {
	return (
		<Link
			href={href}
			className={styles.articleLink}
			itemScope
			itemType='http://schema.org/Article'
		>
			<div className={styles.imageWrapper}>
				<Image
					src={article.preview}
					alt={article.title}
					className={styles.image}
					itemProp='image'
					width={386}
					height={240}
				/>
				<div className={styles.viewCount}>
					<p className={styles.viewCountNumber}>{article.viewCount || 0}</p>
					<div>
						<VscEye />
					</div>
				</div>
			</div>
			<div className={styles.cardTitleWrapper}>
				<h3 className={styles.cardTitle} itemProp='name'>
					{article.title}
				</h3>
				<FiArrowUpRight />
			</div>
			<p className={styles.cardDescription} itemProp='description'>
				{article.description}
			</p>
		</Link>
	);
};

export default ArticleCard;
