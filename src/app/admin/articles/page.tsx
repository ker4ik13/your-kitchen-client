"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "../Page.module.scss";
import { useEffect, useState } from "react";
import { checkAuth } from "@/store/user.slice";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { UserRoles } from "@/types/UserRoles";
import Link from "next/link";
import { IUser } from "@/types/IUser";
import { Icons } from "@/shared/IconsComponents/Icons";
import Icon from "@/shared/IconsComponents/Icon";
import { isUserHaveRights } from "@/features/isUserHaveRights";
import { IError } from "@/types/IError";
import { deleteArticle, getArticles } from "@/store/article.slice";
import ArticleCard from "@/widgets/Articles/ArticleCard";

// Тексты
const texts = {
  title: "Статьи",
  buttonText: "+ Добавить",
  onMainPageText: "На главной",
};

const isAdmin = (user: IUser) =>
  user.role.value === UserRoles.Admin ? styles.isAdmin : styles.isEditor;

const ArticlesPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const articleStore = useAppSelector((store) => store.articles);

  const [error, setError] = useState<IError>({ isError: false, value: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getArticles());
    }
  }, []);

  const removeArticle = async (id: string) => {
    dispatch(deleteArticle(id));
  };

  if (userStore.isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <MiniLoading className={styles.preloader} />
        </div>
      </div>
    );
  }

  if (
    !userStore.isLoading &&
    !userStore.isAuth &&
    userStore.users.length === 0
  ) {
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
            {texts.title} ({articleStore.articles.length})
          </h2>
          {isUserHaveRights(userStore.user, UserRoles.Admin) && (
            <Link href={"/admin/articles/new"} className={styles.addButton}>
              {texts.buttonText}
            </Link>
          )}
        </div>
        <div className={styles.kitchens}>
          {articleStore.articles &&
            articleStore.articles.map((article, index) => (
              <div className={styles.kitchenLink} key={index}>
                <button
                  type='button'
                  className={styles.removeButton}
                  onClick={() => removeArticle(article._id)}
                >
                  <Icon icon={Icons.remove(styles.removeIcon)} />
                </button>
                {article.onMainPage && (
                  <p className={styles.kitchenOption}>{texts.onMainPageText}</p>
                )}
                <ArticleCard
                  article={article}
                  href={`/admin/articles/${article._id}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
