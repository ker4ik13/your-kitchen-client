"use client";

import { useEffect } from "react";
import styles from "./Kitchens.module.scss";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import Link from "next/link";
import { getKitchens } from "@/store/kitchens.slice";
import Kitchen from "@/widgets/Kitchen/Kitchen";

const KitchensPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const kitchenStore = useAppSelector((store) => store.kitchens);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getKitchens());
    }
  }, []);

  if (kitchenStore.isLoading) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!userStore.isLoading && !userStore.isAuth) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.kitchensPage}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>Кухни</h2>
          <Link href={"/admin/kitchens/new"} className={styles.addButton}>
            <span>+</span>
            Добавить кухню
          </Link>
        </div>
        <div className={styles.kitchens}>
          {kitchenStore.kitchens &&
            kitchenStore.kitchens
              .slice(0)
              .reverse()
              .map((kitchen, index) => (
                <Link
                  href={`/admin/kitchens/${kitchen._id}`}
                  className={styles.kitchenLink}
                  key={index}
                >
                  <Kitchen kitchen={kitchen} />
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default KitchensPage;
