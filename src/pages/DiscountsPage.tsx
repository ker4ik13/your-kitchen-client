import type { IDiscount } from "@/types/IDiscount";
import { Discounts } from "@/widgets/Discounts/Discounts";
import { DiscountsHelloScreen } from "@/widgets/DiscountsHelloScreen/DiscountsHelloScreen";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import styles from "./FurniturePage.module.scss";

export const revalidate = 30;

interface DiscountsPageProps {
  discounts: IDiscount[];
}

const DiscountsPage = ({ discounts }: DiscountsPageProps) => {
  return (
    <div className={styles.bg}>
      <DiscountsHelloScreen />
      {discounts && <Discounts discounts={discounts} />}
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
