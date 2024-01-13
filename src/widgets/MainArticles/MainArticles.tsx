'use client';

import UserArticleService from '@/services/UserArticleService';
import Icon from '@/shared/IconsComponents/Icon';
import { ChevronDirection, Icons } from '@/shared/IconsComponents/Icons';
import { pagesLinks } from '@/shared/constants';
import { IArticle } from '@/types/IArticle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ArticleCard from '../Articles/ArticleCard';
import styles from './MainArticles.module.scss';

const MainArticles = () => {
	const [articles, setArticles] = useState<IArticle[]>([]);

	const getArticles = async () => {
		const response = await UserArticleService.getMainArticles();
		setArticles(response);
	};

	useEffect(() => {
		getArticles();
	}, []);

	return (
		<div className={styles.articlesBlock}>
			<div className={styles.container}>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>Статьи и полезные материалы</h3>
				</div>
				{!articles ||
					(articles.length === 0 && (
						<p className={styles.error}>Статей пока нет</p>
					))}
				{articles && articles.length !== 0 && (
					<div className={styles.articles}>
						{articles.map((article) => (
							<ArticleCard
								href={`/articles/${article.link}`}
								article={article}
								key={article._id}
							/>
						))}
					</div>
				)}
				<div className={styles.buttonWrapper}>
					<Link href={pagesLinks.articles} className={styles.orangeButton}>
						Показать еще
						<Icon icon={Icons.chevron(ChevronDirection.Down)} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MainArticles;
