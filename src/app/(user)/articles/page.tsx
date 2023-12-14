import UserArticleService from "@/services/UserArticleService";
import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { renderSeo } from "@/shared/renderSeo";
import Articles from "@/widgets/Articles/Articles";

export const metadata = renderSeo({
  title: "Статьи",
  description: "Статьи",
  keywords: "Статьи",
});

const getArticles = async () => {
  const result = await UserArticleService.getArticles();
  return result;
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
