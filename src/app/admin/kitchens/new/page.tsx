"use client";

import styles from "../Kitchens.module.scss";

import { useEffect } from "react";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { useForm } from "react-hook-form";
import { KitchensOptions, kitchensTranslate } from "@/types/KitchenOptions";
import Select from "react-select";

const selectOptions = [
  { value: KitchensOptions.chalet, label: kitchensTranslate.chalet },
  { value: KitchensOptions.classic, label: kitchensTranslate.classic },
  { value: KitchensOptions.hightech, label: kitchensTranslate.hightech },
  { value: KitchensOptions.loft, label: kitchensTranslate.loft },
  { value: KitchensOptions.minimalism, label: kitchensTranslate.minimalism },
];

interface TInputs {
  title: string;
  description: string;
  price: number;
  options: KitchensOptions[];
  photos: ImageData[];
  term: string;
}

const NewKitchenPage = () => {
  const { register, handleSubmit } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  if (userStore.isLoading) {
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
        <h2 className={styles.title}>Добавить кухню</h2>
        <form className={styles.addForm}>
          <div className={styles.inputWrapper}>
            <label htmlFor='title' className={styles.label}>
              Название
            </label>
            <input
              type='text'
              id='title'
              {...register("title", {
                required: true,
              })}
              className={styles.textInput}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='price' className={styles.label}>
              Цена
            </label>
            <input
              type='number'
              id='price'
              {...register("price", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='description' className={styles.label}>
              Описание
            </label>
            <textarea
              id='description'
              {...register("description", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor='options' className={styles.label}>
              Тип кухни
            </label>
            <Select
              name='options'
              options={selectOptions}
              className={styles.select}
              isMulti
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewKitchenPage;
