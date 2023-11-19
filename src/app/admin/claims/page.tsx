"use client";

import { useContext, useEffect, useState } from "react";
import styles from "./Claims.module.scss";
import MiniLoading from "@/shared/MiniLoading";
import { Context } from "../layout";
import ClaimService from "@/services/ClaimService";
import { IClaim } from "@/types/IClaim";
import AdminClaim from "@/widgets/AdminClaim/AdminClaim";

const ClaimsPage = () => {
  const { store } = useContext(Context);
  const [claims, setClaims] = useState<IClaim[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    const asyncGet = async () => {
      const claims = await getClaims();
      if (claims) {
        setClaims(claims);
      }
    };
    asyncGet();
  }, []);

  const getClaims = async () => {
    try {
      const response = await ClaimService.getClaims();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  if (store.isLoading) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (!store.isLoading && claims.length === 0) {
    return (
      <div className={styles.claimsPage}>
        <div className={styles.container}>
          <p>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.claimsPage}>
      <div className={styles.container}>
        <div className={styles.claims}>
          {!store.isLoading &&
            claims &&
            claims
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
