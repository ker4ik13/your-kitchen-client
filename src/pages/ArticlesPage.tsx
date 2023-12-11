import { LeaveRequestBlock } from "@/shared/LeaveRequestBlock";
import { type IArticle } from "@/types/IArticle";
import Articles from "@/widgets/Articles/Articles";

interface Props {
  articles: IArticle[];
}

const ArticlesPage = ({ articles }: Props) => {
  return (
    <>
      <Articles articles={articles} />
      <LeaveRequestBlock />
    </>
  );
};

export default ArticlesPage;
