"use client";

import { useEffect } from "react";
import styles from "./Claims.module.scss";
import MiniLoading from "@/shared/MiniLoading";
import AdminClaim from "@/widgets/AdminClaim/AdminClaim";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { getClaims } from "@/store/claims.slice";

const ClaimsPage = () => {
  const claimsStore = useAppSelector((store) => store.claims);
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getClaims());
    }
  }, []);

  if (claimsStore.isLoading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (
    !userStore.isLoading &&
    !userStore.isAuth &&
    claimsStore.claims.length === 0
  ) {
    return (
      <div className={styles.claimsPage}>
        <div className={styles.container}>
          <p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.claimsPage}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.claims}>
          {!claimsStore.isLoading &&
            claimsStore.claims &&
            claimsStore.claims
              .slice()
              .reverse()
              .map((claim, index) => (
                <AdminClaim propsClaim={claim} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimsPage;
