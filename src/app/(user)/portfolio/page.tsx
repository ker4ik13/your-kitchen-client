import PortfolioPage from "@/pages/PortfolioPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://youkuhnya.ru/portfolio"),
  title:
    "Фото кухонь на заказ. Готовые проекты, цены и описания. Смотрите и заказывайте.",
  description:
    "Фото кухонь на заказ с ценами и описанием от фабрики Твоя кухня.  Портфолио проектов кухонь под ключ. Отзывы клиентов о фабрике. Заходите на сайт и смотрите.",
  keywords:
    "Кухни на заказ фото, Кухни на заказ отзывы, Фото готовых кухонь, Заказать кухню отзывы, Кухни на заказ цены, Сколько стоит кухня на заказ, стоимость кухонь в Москве, стоимость кухонь на заказ, Кухни в Москве цены",
  openGraph: {
    type: "website",
    title:
      "Фото кухонь на заказ. Готовые проекты, цены и описания. Смотрите и заказывайте.",
    url: "https://youkuhnya.ru/portfolio",
    description:
      "Фото кухонь на заказ с ценами и описанием от фабрики Твоя кухня.  Портфолио проектов кухонь под ключ. Отзывы клиентов о фабрике. Заходите на сайт и смотрите.",
    siteName: "Твоя кухня",
  },
  alternates: {
    canonical: "https://youkuhnya.ru/portfolio",
  },
};

const page = () => {
  return (
    <>
      <PortfolioPage />
    </>
  );
};

export default page;
