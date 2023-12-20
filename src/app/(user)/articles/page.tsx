import UserArticleService from "@/services/UserArticleService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import Articles from "@/widgets/Articles/Articles";
import { Metadata } from "next";

const getArticles = async () => {
  const result = await UserArticleService.getArticles();
  return result;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://youkuhnya.ru/articles"),
  title: "Полезные статьи про кухни",
  description:
    "Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.",
  keywords:
    "Статьи про кухни, статьи про мебель, дизайн и стиль кухни, нюансы и тонкости проектирования, рекомендации по выбору кухонной мебели",
  openGraph: {
    type: "website",
    title: "Полезные статьи про кухни",
    url: "https://youkuhnya.ru/articles",
    description:
      "Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.",
    siteName: "Твоя Кухня",
  },
  alternates: {
    canonical: "https://youkuhnya.ru/articles",
  },
};

const page = async () => {
  const articles = await getArticles();
  return (
    <>
      <Articles articles={articles} />
      <LeaveRequestBlock />
    </>
  );
};

export default page;
