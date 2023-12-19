import PortfolioPage from "@/pages/PortfolioPage";

const metadatas = {
  title:
    "Фото кухонь на заказ. Готовые проекты, цены и описания. Смотрите и заказывайте.",
  desc: "Фото кухонь на заказ с ценами и описанием от фабрики Твоя кухня.  Портфолио проектов кухонь под ключ. Отзывы клиентов о фабрике. Заходите на сайт и смотрите.",
  keywords:
    "Кухни на заказ фото, Кухни на заказ отзывы, Фото готовых кухонь, Заказать кухню отзывы, Кухни на заказ цены, Сколько стоит кухня на заказ, стоимость кухонь в Москве, стоимость кухонь на заказ, Кухни в Москве цены",
};

const page = () => {
  return (
    <>
      <title>{metadatas.title}</title>
      <meta name='description' content={metadatas.desc} />
      <meta name='keywords' content={metadatas.keywords} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={metadatas.title} />
      <meta property='og:url' content='https://youkuhnya.ru/portfolio' />
      <meta property='og:description' content={metadatas.desc} />
      <meta property='og:site_name' content='Твоя Кухня' />

      <link rel='canonical' href='https://youkuhnya.ru/portfolio' />
      <PortfolioPage />
    </>
  );
};

export default page;
