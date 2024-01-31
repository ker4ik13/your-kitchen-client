import type { IDiscount } from "@/types/IDiscount";
import { DiscountItem } from "../DiscountItem/DiscountItem";
import styles from "./Discounts.module.scss";

interface DiscountsProps {
  discounts: IDiscount[];
}

const NO_DISCOUNTS_TEXT = "Акций пока что нет";

export const Discounts = ({ discounts }: DiscountsProps) => {
  return (
    <>
      <div className={styles.discountsPage}>
        <div className={styles.container}>
          <div className={styles.discounts}>
            {!discounts.length && (
              <p className={styles.notFoundText}>{NO_DISCOUNTS_TEXT}</p>
            )}
            {/* Акции */}
            {discounts.map((discount) => (
              <DiscountItem key={discount._id} discount={discount} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
