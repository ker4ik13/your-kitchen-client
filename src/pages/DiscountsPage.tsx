import img2 from "@/data/kitchens/2023-11-27T16-48-09.544Zdasdsafads.webp";
import img3 from "@/data/kitchens/2023-11-27T16-48-09.547Ze2e2e2e.webp";
import img1 from "@/data/kitchens/2024-01-26T10-12-10.webp";
import type { IDiscount } from "@/types/IDiscount";
import { Discounts } from "@/widgets/Discounts/Discounts";
import { DiscountsHelloScreen } from "@/widgets/DiscountsHelloScreen/DiscountsHelloScreen";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import styles from "./FurniturePage.module.scss";

export const revalidate = 30;

const mockDiscounts: IDiscount[] = [
  {
    _id: "23432423dasdsa",
    description:
      "Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя.",
    startDate: "01.01.2024",
    endDate: "18.03.2024",
    image: img1.src,
    isActive: true,
    name: "1/3 дивана в подарок! 1/3 дивана в подарок! 1/3 дивана в подарок!",
    slug: "discount-1",
    type: "discount",
    conditions: "",
  },
  {
    _id: "23432423dasdsadasdsa",
    description:
      "Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя.",
    startDate: "13.01.2024",
    endDate: "20.01.2024",
    image: img3.src,
    isActive: false,
    name: "1/3 дивана в подарок!",
    slug: "discount-3",
    type: "promotion",
    conditions: "",
  },
  {
    _id: "23432423dasdsadasdsa",
    description:
      "Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя.",
    startDate: "14.01.2024",
    endDate: "20.01.2024",
    image: img3.src,
    isActive: false,
    name: "1/3 дивана в подарок!",
    slug: "discount-3",
    type: "promotion",
    conditions: "",
  },
  {
    _id: "23432423dasds dsadasa",
    description:
      "Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя. Тут краткое описаниие акции, которое привлечет внимание зрителя.",
    startDate: "18.01.2024",
    endDate: "10.02.2024",
    image: img2.src,
    isActive: true,
    name: "1/3 дивана в подарок!",
    slug: "discount-2",
    type: "gift",
    conditions: "",
  },
];

const DiscountsPage = () => {
  return (
    <div className={styles.bg}>
      <DiscountsHelloScreen />
      {mockDiscounts && <Discounts discounts={mockDiscounts} />}
      <LeaveRequestMini
        tag="Узнать про акции"
        location="Страница акций"
        title="Узнать подробнее по текущим акциям"
        button={{
          text: "Узнать подробнее",
          arrow: "right",
        }}
        type="promotion"
      />
      <MainArticles withoutBg />
    </div>
  );
};

export default DiscountsPage;
