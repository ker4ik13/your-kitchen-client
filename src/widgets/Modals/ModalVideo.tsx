import styles from "./Modal.module.scss";

interface ModalVideoProps {
  videoUrl: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalVideo = ({ videoUrl, isOpen, setIsOpen }: ModalVideoProps) => {
  const parseUrl = videoUrl.split("/");
  if (isOpen) {
    return (
      <div
        className={`${styles.modal2} ${styles.modalVideo}`}
        onClick={() => {
          setIsOpen(false);
          document.body.classList.remove("overflow");
        }}
      >
        <div
          className={styles.videoContainer}
          onClick={(event) => event.preventDefault()}
        >
          <button type="button" className={styles.whiteCloseButton}>
            ×
          </button>
          <iframe
            src={`${parseUrl[0]}//${parseUrl[2]}/play/embed/${parseUrl[4]}`}
            allowFullScreen
            className={styles.iframe}
          ></iframe>
        </div>
      </div>
    );
  }
};

export default ModalVideo;
