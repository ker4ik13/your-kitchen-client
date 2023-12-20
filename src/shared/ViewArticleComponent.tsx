"use client";

import ArticleService from "@/services/ArticleService";
import { useEffect } from "react";

interface Props {
  articleId: string;
}

export const ViewArticleComponent = ({ articleId }: Props) => {
  useEffect(() => {
    ArticleService.viewArticle(articleId);
  }, []);

  return <div></div>;
};
