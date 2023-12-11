import { type IArticle } from "@/types/IArticle";
import styles from "./Articles.module.scss";
import ArticleCard from "./ArticleCard";
import Icon from "@/shared/IconsComponents/Icon";
import { ChevronDirection, Icons } from "@/shared/IconsComponents/Icons";

type Props = {
  articles: IArticle[];
  onMainPage?: boolean;
};

const Articles = ({ articles, onMainPage }: Props) => {
  return (
    <div className={styles.articlesPage}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Статьи и полезные материалы</h1>
          <h2 className={styles.subtitle}>
            В процессе выбора мебели для кухни всегда возникает множество
            вопросов. Мы стараемся держать вас в курсе всех самых важных и
            актуальных тем и публикуем полезную информацию.
          </h2>
        </div>
        {articles && articles.length > 0 && (
          <div className={styles.articles}>
            {articles.map((article) => (
              <ArticleCard article={article} key={article._id} />
            ))}
          </div>
        )}
        {!articles ||
          (articles.length === 0 && (
            <p className={styles.error}>Статей пока нет</p>
          ))}
        {/* {sliceNumber < articles.length && (
          <button
            type='button'
            className={styles.moreButton}
            onClick={handleShowMore}
          >
            Показать еще
            <Icon icon={Icons.chevron(ChevronDirection.Down)} />
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Articles;
