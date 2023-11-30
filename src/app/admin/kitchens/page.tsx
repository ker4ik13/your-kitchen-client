"use client";

import { useEffect } from "react";
import styles from "../Page.module.scss";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import Link from "next/link";
import { deleteKitchen, getKitchens } from "@/store/kitchens.slice";
import Kitchen from "@/widgets/Kitchen/Kitchen";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";

// Тексты
const texts = {
  buttonText: "+ Добавить кухню",
  titleText: "Кухни",
  onMainPageText: "На главной",
};

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

  const removeKitchen = async (id: string) => {
    if (localStorage.getItem("token")) {
      dispatch(deleteKitchen(id));
    }
  };

  if (kitchenStore.isLoading) {
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
            {texts.titleText} ({kitchenStore.kitchens.length})
          </h2>
          <Link href={"/admin/kitchens/new"} className={styles.addButton}>
            {texts.buttonText}
          </Link>
        </div>
        <div className={styles.kitchens}>
          {kitchenStore.kitchens &&
            kitchenStore.kitchens
              .slice(0)
              .reverse()
              .map((kitchen, index) => (
                <div className={styles.kitchenLink} key={index}>
                  <button
                    type='button'
                    className={styles.removeButton}
                    onClick={() => removeKitchen(kitchen._id)}
                  >
                    <Icon icon={Icons.remove(styles.removeIcon)} />
                  </button>
                  {kitchen.onMainPage && (
                    <p className={styles.kitchenOption}>
                      {texts.onMainPageText}
                    </p>
                  )}
                  <Link href={`/admin/kitchens/${kitchen._id}`}>
                    <Kitchen kitchen={kitchen} />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default KitchensPage;
