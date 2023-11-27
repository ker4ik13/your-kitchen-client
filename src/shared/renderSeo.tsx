import type { Metadata } from "next";

interface IMeta {
  title: string;
  description?: string;
  keywords?: string;
}

export const renderSeo = ({
  title,
  description,
  keywords,
}: IMeta): Metadata => {
  if (description) {
    if (keywords) {
      return {
        title: title,
        description: description,
        keywords: keywords,
      };
    }
    return {
      title: title,
      description: description,
    };
  } else {
    return {
      title: title,
      robots: "noindex",
    };
  }
};
