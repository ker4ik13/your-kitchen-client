"use client";

import styles from "./MainArticles.module.scss";
import ArticleCard from "../Articles/ArticleCard";
import UserArticleService from "@/services/UserArticleService";
import { IArticle } from "@/types/IArticle";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/shared/IconsComponents/Icon";
import { ChevronDirection, Icons } from "@/shared/IconsComponents/Icons";

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
        <div className={styles.articles}>
          {articles.map((article) => (
            <ArticleCard
              href={`/articles/${article._id}`}
              article={article}
              key={article._id}
            />
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Link href={"/articles"} className={styles.orangeButton}>
            Показать еще
            <Icon icon={Icons.chevron(ChevronDirection.Down)} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainArticles;
