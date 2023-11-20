"use client";

import styles from "./LoginPage.module.scss";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/user.slice";

interface TInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const response = await dispatch(
      login({
        email: data.email,
        password: data.password,
      }),
    );
    if (response.payload) {
      router.push("/admin");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h2 className={styles.title}>Войти в админ панель</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            className={styles.input}
            {...register("email", {
              required: "Введите ваш email",
            })}
          />
          <input
            type='password'
            className={styles.input}
            {...register("password", {
              required: "Введите ваш пароль",
            })}
          />
          <button type='submit' className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
