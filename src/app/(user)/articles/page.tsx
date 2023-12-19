import UserArticleService from "@/services/UserArticleService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import Articles from "@/widgets/Articles/Articles";

const getArticles = async () => {
  const result = await UserArticleService.getArticles();
  return result;
};

const metadatas = {
  title: "Полезные статьи про кухни",
  desc: "Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.",
  keywords:
    "Статьи про кухни, статьи про мебель, дизайн и стиль кухни, нюансы и тонкости проектирования, рекомендации по выбору кухонной мебели",
};

const page = async () => {
  const articles = await getArticles();
  return (
    <>
      <title>{metadatas.title}</title>
      <meta name='description' content={metadatas.desc} />
      <meta name='keywords' content={metadatas.keywords} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={metadatas.title} />
      <meta property='og:url' content='https://youkuhnya.ru/articles' />
      <meta property='og:description' content={metadatas.desc} />
      <meta property='og:site_name' content='Твоя Кухня' />
      <link rel='canonical' href='https://youkuhnya.ru/articles' />
      <Articles articles={articles} />
      <LeaveRequestBlock />
    </>
  );
};

export default page;
