import LeaveRequest from "../LeaveRequest/LeaveRequest";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsOpenThanks: (isOpen: boolean) => void;
  buttonText?: string;
}
const isOpenStyles = (isOpen: boolean) =>
  isOpen ? styles.modal : `${styles.modal} ${styles.hidden}`;

const Modal1 = ({
  isOpen,
  setIsOpen,
  setIsOpenThanks,
  buttonText,
}: ModalProps) => {
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
      />
    </div>
  );
};

export default Modal1;
