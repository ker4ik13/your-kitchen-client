import styles from '@/pages/ArticlePage.module.scss';
import ArticleService from '@/services/ArticleService';
import UserArticleService from '@/services/UserArticleService';
import Icon from '@/shared/IconsComponents/Icon';
import { ChevronDirection, Icons } from '@/shared/IconsComponents/Icons';
import { LeaveRequestBlock2 } from '@/shared/LeaveRequestBlock2';
import { ViewArticleComponent } from '@/shared/ViewArticleComponent';
import { CLIENT_URL, SITE_NAME, pagesData } from '@/shared/constants';
import ArticleCard from '@/widgets/Articles/ArticleCard';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { VscEye } from 'react-icons/vsc';

export const revalidate = 10;

export const generateStaticParams = async () => {
	const articles = await UserArticleService.getArticles();

	const links = articles.map((article) => ({
		id: article.link,
	}));
	return links;
};

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const article = await ArticleService.getArticle(params.id);

	if (article._id) {
		return {
			metadataBase: new URL(
				`${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
			),
			title: `${article.title} | ${SITE_NAME}`,
			description: article.description,
			openGraph: {
				type: pagesData.articles.type,
				title: `${article.title} | ${SITE_NAME}`,
				description: article.description,
				publishedTime: article.createdAt,
				modifiedTime: article.updatedAt,
				url: `${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
				images: article.preview,
				siteName: SITE_NAME,
			},
			alternates: {
				canonical: `${CLIENT_URL}/${pagesData.articles.name}/${article.link}`,
			},
		};
	} else {
		return {
			title: '404: Статья не найдена',
			description: 'Страница не найдена',
		};
	}
};

interface Props {
	params: {
		id: string;
	};
}

const ArticlePage = async ({ params }: Props) => {
	const article = await ArticleService.getArticle(params.id);
	const moreArticles = await ArticleService.getArticles();

	if (!article._id) {
		return notFound();
	}

	return (
		<>
			<article
				className={styles.articlePage}
				itemScope
				itemType='http://schema.org/Article'
			>
				<div className={styles.container}>
					<ViewArticleComponent articleId={article.link} />
					<div className={styles.prevPage}>
						<Link
							href={`/${pagesData.articles.name}`}
							className={styles.prevButton}
						>
							<IoIosArrowBack />
							<p>Назад</p>
						</Link>
						<p className={styles.nameText}>
							<Link href={`/${pagesData.articles.name}`}>Статьи</Link>
							<span>/</span>
							<span className={`${styles.nameText} ${styles.articleName}`}>
								{article.title}
							</span>
						</p>
					</div>
					<h1 className={styles.title} itemProp='name'>
						{article.title}
					</h1>
					<div className={styles.previewWrapper}>
						<Image
							src={article.preview}
							alt={article.title}
							className={styles.previewPhoto}
							itemProp='image'
							width={1060}
							height={460}
						/>
						<div className={styles.viewCount}>
							<p className={styles.viewCountNumber}>{article.viewCount || 0}</p>
							<div>
								<VscEye />
							</div>
						</div>
					</div>
					<div
						className={styles.content}
						itemProp='articleBody'
						dangerouslySetInnerHTML={{
							__html: `<h6>${article.description}</h6> <br/> ${article.content}`,
						}}
					></div>
				</div>
				<div className={styles.readMore}>
					<p className={styles.line}></p>
					<p className={styles.readMoreText}>Читать другие статьи</p>
					<p className={styles.line}></p>
				</div>
				<div className={styles.container}>
					<div className={styles.articles}>
						{moreArticles
							.filter((item) => item._id !== article._id)
							.slice(0, 3)
							.map((article) => (
								<ArticleCard
									article={article}
									key={article._id}
									href={`/${pagesData.articles.name}/${article.link}`}
								/>
							))}
					</div>
					<div className={styles.buttonWrapper}>
						<Link
							href={`/${pagesData.articles.name}`}
							className={styles.orangeButton}
						>
							Показать еще
							<Icon icon={Icons.chevron(ChevronDirection.Down)} />
						</Link>
					</div>
				</div>
				<LeaveRequestBlock2 />
			</article>
		</>
	);
};

export default ArticlePage;
