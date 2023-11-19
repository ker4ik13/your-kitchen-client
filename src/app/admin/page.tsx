"use client";

import { useContext, useEffect } from "react";
import styles from "./AdminPage.module.scss";
import { Context } from "./layout";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import MiniLoading from "@/shared/MiniLoading";

const AdminPage = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!store.isLoading && !store.isAuth) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <Link className={styles.signInButton} href={"/admin/login"}>
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <AdminSidebar store={store} />
      </div>
    </div>
  );
};

export default observer(AdminPage);
