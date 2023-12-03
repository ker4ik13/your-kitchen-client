import { IWorker } from "@/types/IWorker";
import styles from "./Worker.module.scss";

interface Props {
  worker: IWorker;
}

const Worker = ({ worker }: Props) => {
  return (
    <div className={styles.worker}>
      <img
        src={worker.photo}
        alt={worker.firstName}
        className={styles.img}
        draggable={false}
      />
      <div className={styles.info}>
        <p className={styles.name}>
          {worker.firstName} {worker.lastName}
        </p>
        <p className={styles.workerInfo}>
          {worker.jobTitle} / Опыт работы: <span>{worker.experience}</span>
        </p>
      </div>
    </div>
  );
};

export default Worker;
