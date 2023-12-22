import { Page404 } from "@/pages/Page404";
import "../../styles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Страница не найдена",
  description: "Страницы не существует",
};

const NotFound = () => {
  return (
    <Page404
      title='Извините, статья не найдена'
      buttonText='Вернуться к статьям'
      link={"/articles"}
    />
  );
};

export default NotFound;
