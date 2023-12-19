import HomePage from "@/pages/HomePage";

const metadatas = {
  title: "Кухни на заказ в Москве от производителя. Кухни с гарантией 10 лет",
  desc: "Кухни по индивидуальным размерам без наценок. Долговечная немецкая и австрийская фурнитура. Срок изготовления 10-20 дней. Бесплатный 3D проект кухни и визуализация за 4 часа. Запишитесь на замер и расчет стоимости.",
  keywords:
    "Кухни на заказ, Кухни в Москве, Производство кухонь, Гарантия 10 лет, Индивидуальные размеры кухонь, Немецкая фурнитура, Австрийская фурнитура, Срок изготовления 10-20 дней, Бесплатный 3D проект кухни, Визуализация кухни, Замер кухни, Расчет стоимости кухни, Долговечные кухни, Кухни с гарантированным качеством, Бесплатная консультация по кухням, Изготовление кухонь под заказ, Кухонные решения, Кухни с доставкой, Эксклюзивные кухни, Профессиональные дизайнеры кухонь",
};

export default function Home() {
  return (
    <>
      <title>{metadatas.title}</title>
      <meta name='description' content={metadatas.desc} />
      <meta name='keywords' content={metadatas.keywords} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={metadatas.title} />
      <meta property='og:url' content='https://youkuhnya.ru/' />
      <meta property='og:description' content={metadatas.desc} />
      <meta property='og:site_name' content='Твоя Кухня' />

      <link rel='canonical' href='https://youkuhnya.ru/' />
      <HomePage />
    </>
  );
}
