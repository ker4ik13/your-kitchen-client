"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "../Page.module.scss";
import { useEffect } from "react";
import { checkAuth } from "@/store/user.slice";
import { deleteReview, getReviews } from "@/store/reviews.slice";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import Link from "next/link";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import Review from "@/widgets/Reviews/Review";

const ReviewsPage = () => {
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const reviewStore = useAppSelector((store) => store.reviews);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
      dispatch(getReviews());
    }
  }, []);

  const removeReview = async (id: string) => {
    if (localStorage.getItem("token")) {
      dispatch(deleteReview(id));
    }
  };

  if (reviewStore.isLoading) {
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
          <h2 className={styles.title}>Отзывы</h2>
          <Link href={"/admin/reviews/new"} className={styles.addButton}>
            <span>+</span>
            Добавить отзыв
          </Link>
        </div>
        <div className={styles.reviews}>
          {reviewStore.reviews &&
            reviewStore.reviews
              .slice(0)
              .reverse()
              .map((review, index) => (
                <div className={styles.reviewLink} key={index}>
                  <button
                    type='button'
                    className={styles.removeButton}
                    onClick={() => removeReview(review._id)}
                  >
                    <Icon icon={Icons.remove(styles.removeIcon)} />
                  </button>
                  <Link href={`/admin/reviews/${review._id}`}>
                    <Review review={review} />
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
