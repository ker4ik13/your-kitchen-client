"use client";

import { useEffect } from "react";
import styles from "./Kitchens.module.scss";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import Link from "next/link";

const KitchensPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  // if (claimsStore.isLoading) {
  //   return (
  //     <div className={styles.kitchensPage}>
  //       <div className={styles.container}>
  //         <MiniLoading className={styles.preloader} />
  //       </div>
  //     </div>
  //   );
  // }

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
        <Link href={"/admin/kitchens/new"} className={styles.addButton}>
          <span>+</span>
          Добавить кухню
        </Link>
      </div>
    </div>
  );
};

export default KitchensPage;
