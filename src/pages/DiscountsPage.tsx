import { FurnitureHelloScreen } from "@/widgets/FurnitureHelloScreen/FurnitureHelloScreen";
import { LeaveRequestMini } from "@/widgets/LeaveRequestMini/LeaveRequestMini";
import MainArticles from "@/widgets/MainArticles/MainArticles";
import styles from "./FurniturePage.module.scss";

export const revalidate = 30;

const DiscountsPage = () => {
  return (
    <div className={styles.bg}>
      <FurnitureHelloScreen />
      <LeaveRequestMini
        tag="Узнать про акции"
        location="Страница акций"
        title="Узнать подробнее по текущим акциям"
        button={{
          text: "Узнать подробнее",
          arrow: "right",
        }}
      />
      <MainArticles />
    </div>
  );
};

export default DiscountsPage;
