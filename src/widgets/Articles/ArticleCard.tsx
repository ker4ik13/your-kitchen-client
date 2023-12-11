import { type IArticle } from "@/types/IArticle";
import styles from "./Articles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { VscEye } from "react-icons/vsc";

type Props = {
  article: IArticle;
};

const ArticleCard = ({ article }: Props) => {
  return (
    <Link href={`/articles/${article._id}`} className={styles.articleCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={article.preview}
          alt={article.title}
          width={390}
          height={240}
          className={styles.image}
        />
        <div className={styles.viewCount}>
          <p className={styles.viewCountNumber}>
            {article.viewCount}
            <VscEye />
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <div
          className={styles.cardDescription}
          dangerouslySetInnerHTML={{
            __html: article.content,
          }}
        ></div>
      </div>
    </Link>
  );
};

export default ArticleCard;
