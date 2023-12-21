import styles from "@/pages/ArticlePage.module.scss";
import ArticleService from "@/services/ArticleService";
import Icon from "@/shared/IconsComponents/Icon";
import { ChevronDirection, Icons } from "@/shared/IconsComponents/Icons";
import { LeaveRequestBlock2 } from "@/shared/LeaveRequestBlock2";
import ArticleCard from "@/widgets/Articles/ArticleCard";
import Link from "next/link";
import { VscEye } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { ViewArticleComponent } from "@/shared/ViewArticleComponent";
import { Metadata } from "next";
import UserArticleService from "@/services/UserArticleService";

const CLIENT_URL = "https://youkuhnya.ru";

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
  return {
    metadataBase: new URL(`${CLIENT_URL}/articles/${article.link}`),
    title: article.title,
    description: article.description,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      url: `${CLIENT_URL}/articles/${article.link}`,
      images: article.preview,
      siteName: "Твоя кухня",
    },
    alternates: {
      canonical: `${CLIENT_URL}/articles/${article.link}`,
    },
  };
};

interface Props {
  params: {
    id: string;
  };
}

const ArticlePage = async ({ params }: Props) => {
  const article = await ArticleService.getArticle(params.id);
  const moreArticles = await ArticleService.getArticles();

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
          <h1 className={styles.title} itemProp='name'>
            {article.title}
          </h1>
          <div className={styles.previewWrapper}>
            <img
              src={article.preview}
              alt={article.title}
              className={styles.previewPhoto}
              itemProp='image'
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
                  href={`/articles/${article.link}`}
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
      </article>
    </>
  );
};

export default ArticlePage;
