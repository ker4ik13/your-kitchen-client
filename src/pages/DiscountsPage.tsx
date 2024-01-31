import { DiscountsHelloScreen } from "@/widgets/DiscountsHelloScreen/DiscountsHelloScreen";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import styles from "./FurniturePage.module.scss";

export const revalidate = 30;

const DiscountsPage = () => {
  return (
    <div className={styles.bg}>
      <DiscountsHelloScreen />
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
