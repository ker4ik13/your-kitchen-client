import { closeModalOnEscape } from "@/shared/helpers/closeModalOnEscape";
import { IDiscount } from "@/types/IDiscount";
import { useEffect, type ReactNode } from "react";
import LeaveRequest from "../LeaveRequest/LeaveRequest";
import styles from "./DiscountModal.module.scss";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsOpenThanks: (isOpen: boolean) => void;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  discount: IDiscount;
}
const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

export const DiscountModal = ({
  isOpen,
  setIsOpen,
  setIsOpenThanks,
  buttonText,
  descriptionText,
  tag,
  location,
  discount,
}: ModalProps) => {
  useEffect(() => {
    document.addEventListener("keydown", (event) =>
      closeModalOnEscape(event, setIsOpen),
    );
    return () =>
      document.removeEventListener("keydown", (event) =>
        closeModalOnEscape(event, setIsOpen),
      );
  }, []);

  return (
    <div
      className={isOpenStyles(isOpen)}
      onClick={() => {
        setIsOpen(false);
        document.body.classList.remove("overflow");
      }}
    >
      <LeaveRequest
        isModal={true}
        onClick={(event: any) => event.stopPropagation()}
        setIsOpen={setIsOpen}
        setIsOpenThanks={setIsOpenThanks}
        buttonText={buttonText}
        descriptionText={descriptionText}
        tag={tag}
        location={location}
      />
    </div>
  );
};
