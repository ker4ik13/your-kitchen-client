"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "../Page.module.scss";
import { useEffect } from "react";
import { checkAuth } from "@/store/user.slice";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import Link from "next/link";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import Review from "@/widgets/Reviews/Review";
import { deleteWorker, getWorkers } from "@/store/worker.slice";
import Worker from "@/widgets/Worker/Worker";

// Тексты
const texts = {
  buttonText: "+ Добавить работника",
  titleText: "Команда",
};

const TeamPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const workersStore = useAppSelector((store) => store.workers);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getWorkers());
    }
  }, []);

  const removeWorker = async (id: string) => {
    if (localStorage.getItem("token")) {
      dispatch(deleteWorker(id));
    }
  };

  if (workersStore.isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!userStore.isLoading && !userStore.isAuth) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>
            {texts.titleText} ({workersStore.workers.length})
          </h2>
          <Link href={"/admin/team/new"} className={styles.addButton}>
            {texts.buttonText}
          </Link>
        </div>
        <div className={styles.workers}>
          {workersStore.workers &&
            workersStore.workers
              .slice(0)
              .reverse()
              .map((worker, index) => (
                <div className={styles.workerLink} key={index}>
                  <button
                    type='button'
                    className={styles.removeWorkerButton}
                    onClick={() => removeWorker(worker._id)}
                  >
                    <Icon icon={Icons.remove(styles.removeIcon)} />
                  </button>
                  <Link href={`/admin/team/${worker._id}`}>
                    <Worker worker={worker} />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
