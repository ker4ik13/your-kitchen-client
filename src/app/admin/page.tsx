"use client";

import { useEffect } from "react";
import styles from "./AdminPage.module.scss";
import Link from "next/link";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import MiniLoading from "@/shared/MiniLoading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";

const AdminPage = () => {
  const store = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        {store.isAuth && <AdminSidebar store={store} />}
        {store.isLoading && <MiniLoading className={styles.preloader} />}
        {!store.isLoading && !store.isAuth && (
          <Link className={styles.signInButton} href={"/admin/login"}>
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
