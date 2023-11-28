import { Metadata } from "next";
import HomePage from "@/pages/HomePage";
import { renderSeo } from "@/shared/renderSeo";
import { UserKitchenService } from "@/services/UserKitchenService";

export const metadata: Metadata = renderSeo({
  title: "Кухни на заказ в Москве от производителя. Кухни с гарантией 10 лет",
  description:
    "Кухни по индивидуальным размерам без наценок. Долговечная немецкая и австрийская фурнитура. Срок изготовления 10-20 дней. Бесплатный 3D проект кухни и визуализация за 4 часа. Запишитесь на замер и расчет стоимости.",
  keywords:
    "Кухни на заказ, Кухни в Москве, Производство кухонь, Гарантия 10 лет, Индивидуальные размеры кухонь, Немецкая фурнитура, Австрийская фурнитура, Срок изготовления 10-20 дней, Бесплатный 3D проект кухни, Визуализация кухни, Замер кухни, Расчет стоимости кухни, Долговечные кухни, Кухни с гарантированным качеством, Бесплатная консультация по кухням, Изготовление кухонь под заказ, Кухонные решения, Кухни с доставкой, Эксклюзивные кухни, Профессиональные дизайнеры кухонь",
});

const getKitchens = async () => {
  const kitchens = await UserKitchenService.getMainKitchens();
  return kitchens;
};

export default async function Home() {
  const kitchens = await getKitchens();
  return <HomePage />;
}
