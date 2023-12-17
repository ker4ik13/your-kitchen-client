import { type IArticle } from "@/types/IArticle";
import styles from "./Articles.module.scss";
import Image from "next/image";
import { VscEye } from "react-icons/vsc";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

type Props = {
  article: IArticle;
  href: string;
};

const ArticleCard = ({ article, href }: Props) => {
  return (
    <Link href={href} target='_blank' className={styles.articleLink}>
      <div className={styles.imageWrapper}>
        <img
          src={article.preview}
          alt={article.title}
          className={styles.image}
        />
        <div className={styles.viewCount}>
          <p className={styles.viewCountNumber}>{article.viewCount || 0}</p>
          <div>
            <VscEye />
          </div>
        </div>
      </div>
      <div className={styles.cardTitleWrapper}>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <FiArrowUpRight />
      </div>
      <p className={styles.cardDescription}>{article.description}</p>
    </Link>
  );
};

export default ArticleCard;
