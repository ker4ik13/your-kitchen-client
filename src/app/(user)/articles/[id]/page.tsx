"use client";

import styles from "@/pages/ArticlePage.module.scss";
import ArticleService from "@/services/ArticleService";
import Icon from "@/shared/IconsComponents/Icon";
import { ChevronDirection, Icons } from "@/shared/IconsComponents/Icons";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";
import ArticleCard from "@/widgets/Articles/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { VscEye } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { type IArticle } from "@/types/IArticle";
import { useParams } from "next/navigation";
import MiniLoading from "@/shared/MiniLoading";

const CLIENT_URL = "https://youkuhnya.ru";

const ArticlePage = () => {
  const path = useParams();

  const [article, setArticle] = useState<IArticle>({} as IArticle);
  const [moreArticles, setMoreArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getArticle = async (id: string) => {
      setLoading(true);
      try {
        const article = await ArticleService.getArticle(id);
        const moreArticles = await ArticleService.getArticles();
        setArticle(article);
        setMoreArticles(moreArticles);
        ArticleService.viewArticle(id);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (path && typeof path.id === "string") {
      getArticle(path.id);
    }
  }, []);

  return (
    <>
      {/* SEO */}
      <title>{article.title}</title>
      <meta name='description' content={article.description} />
      <meta property='og:type' content='article' />
      <meta property='og:title' content={article.title} />
      <meta
        property='og:url'
        content={`${CLIENT_URL}/articles/${article._id}`}
      />
      <meta property='og:image' content={article.preview} />
      <meta property='og:image:width' content='1060' />
      <meta property='og:image:height' content='430' />
      <meta property='og:description' content={article.description} />
      <meta property='og:site_name' content='Твоя Кухня' />

      {loading && (
        <main className={styles.articlePage}>
          <div className={styles.container}>
            <div className={styles.loaderWrapper}>
              <MiniLoading className={styles.loader} />
            </div>
          </div>
        </main>
      )}
      {!loading && article.content && (
        <main className={styles.articlePage}>
          <div className={styles.container}>
            <div className={styles.prevPage}>
              <Link href={"/articles"} className={styles.prevButton}>
                <IoIosArrowBack />
                <p>Назад</p>
              </Link>
              <p className={styles.nameText}>
                <Link href={`/articles`}>Статьи</Link>
                <span>/</span>
                <span className={`${styles.nameText} ${styles.articleName}`}>
                  {article.title}
                </span>
              </p>
            </div>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.previewWrapper}>
              <Image
                src={article.preview}
                alt={article.title}
                width={1060}
                height={460}
                className={styles.previewPhoto}
              />
              <div className={styles.viewCount}>
                <p className={styles.viewCountNumber}>
                  {article.viewCount || 0}
                </p>
                <div>
                  <VscEye />
                </div>
              </div>
            </div>
            <article
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: `<h6>${article.description}</h6> <br/> ${article.content}`,
              }}
            ></article>
          </div>
          <div className={styles.readMore}>
            <p className={styles.line}></p>
            <p className={styles.readMoreText}>Читать другие статьи</p>
            <p className={styles.line}></p>
          </div>
          <div className={styles.container}>
            <div className={styles.articles}>
              {moreArticles.slice(0, 3).map((article) => (
                <ArticleCard
                  article={article}
                  key={article._id}
                  href={`/articles/${article._id}`}
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
          <LeaveRequestBlock2 />
        </main>
      )}
    </>
  );
};

export default ArticlePage;
