"use client";

import styles from "../../Page.module.scss";

import { useEffect, useState } from "react";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { type SubmitHandler, useForm, set } from "react-hook-form";

import $api from "@/http";
import { useParams } from "next/navigation";
import type { IReview } from "@/types/IReview";
import Link from "next/link";
import { ReviewService } from "@/services/ReviewService";

// Поля формы
interface TInputs {
  photo?: ImageData;
  firstName: string;
  lastName?: string;
  text: string;
  photos: ImageData[];
}

// Тексты
const texts = {
  notFoundText: "Отзыв не найден",
  buttonText: "Изменить",
  titleText: "Изменить отзыв",
  addOrChangeErrorText: "Ошибка изменения отзыва. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Отзыв успешно изменен",
};

const NewKitchenPage = () => {
  const path = useParams();

  const { register, handleSubmit, reset, setValue } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const reviewStore = useAppSelector((store) => store.reviews);

  const [photos, setPhotos] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>();
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);
  const [drag2, setDrag2] = useState(false);

  // Ошибка
  const [error, setError] = useState<any>({});
  const [review, setReview] = useState<IReview>({} as IReview);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (path && typeof path.id === "string") {
      getProduct(path.id);
    }
  }, []);

  if (!path || !path.id) {
    return (
      <div className={styles.kitchensPage}>
        <div className={styles.container}>
          <p className={styles.title}>{texts.notFoundText}</p>
          <Link href='/admin/kitchens'>Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const reviewById = reviewStore.reviews.find(
      (review) => review._id === path.id,
    );

    if (reviewById) {
      setPhotos(reviewById.photos);
      if (reviewById.photo) {
        setPhoto(reviewById.photo);
      }
      setReview(reviewById);

      setValue("firstName", reviewById.firstName);
      if (reviewById.lastName) {
        setValue("lastName", reviewById.lastName);
      }
      setValue("text", reviewById.text);
    } else {
      if (typeof path.id === "string") {
        try {
          const reviewPayload = await ReviewService.getReview(path.id);

          setReview(reviewPayload);
          setPhotos(reviewPayload.photos);
          if (reviewPayload.photo) {
            setPhoto(reviewPayload.photo);
          }

          setValue("firstName", reviewPayload.firstName);
          if (reviewPayload.lastName) {
            setValue("lastName", reviewPayload.lastName);
          }
          setValue("text", reviewPayload.text);
        } catch (error) {
          setError({
            error: true,
            value: texts.addOrChangeErrorText,
          });
        }
      }
    }
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

  if (!userStore.isLoading && !userStore.isAuth) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.authText}>{`Ошибка, авторизируйтесь`}</p>
        </div>
      </div>
    );
  }

  // Обработчик фото
  const getPhotosFromFiles = (event: any, files: any[]) => {
    const photos: any[] = [];

    files.map((file) => {
      let photo = {
        title: file.name,
        src: URL.createObjectURL(file),
      };

      photos.push(photo);
    });

    setPhotos(photos);
  };

  const getPhotoFromFiles = (event: any, file: any) => {
    let photo = {
      title: file.name,
      src: URL.createObjectURL(file),
    };

    setPhoto(photo);
  };

  // Обработчики
  const dragStartHandler = (event: any) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (event: any) => {
    event.preventDefault();
    setDrag(false);
  };
  const dropHandler = (event: any) => {
    event.preventDefault();
    setDrag(false);
    let files = [...event.dataTransfer.files];
    setFiles(files);

    if (files && files.length > 0) {
      getPhotosFromFiles(event, files);
    }
  };
  const changeHandler = (event: any) => {
    event.preventDefault();
    let files = [...event.target.files];
    setFiles(files);

    if (files && files.length > 0) {
      getPhotosFromFiles(event, files);
    }
  };
  // 2
  const dragStartHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(true);
  };
  const dragLeaveHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(false);
  };
  const dropHandler2 = (event: any) => {
    event.preventDefault();
    setDrag2(false);
    let file = event.dataTransfer.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };
  const changeHandler2 = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("firstName", data.firstName);

    if (data.lastName) {
      form.append("lastName", data.lastName);
    }

    form.append("text", data.text);

    const response = await $api.patch(`/reviews/${path.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      setError({
        error: false,
        value: texts.successText,
      });
      reset({
        photos: [],
        firstName: "",
        lastName: "",
        photo: {},
        text: "",
      });
      setFiles([]);
      setFile({} as File);
      setPhoto(undefined);
      setPhotos([]);
    } else {
      setError({
        error: true,
        value: texts.errorText,
      });
    }
  };

  const isSuccess = (error: any) => {
    return error.error === true ? styles.error : styles.success;
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.titleText}</h2>
          <button type='submit' form='kitchenForm' className={styles.addButton}>
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        {/* Форма */}
        <form
          className={styles.addForm}
          id='kitchenForm'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Имя */}
          <div className={styles.inputWrapper}>
            <label htmlFor='firstName' className={styles.label}>
              Имя
            </label>
            <input
              type='text'
              id='firstName'
              {...register("firstName", {
                required: true,
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>
          {/* Фамилия */}
          <div className={styles.inputWrapper}>
            <label htmlFor='lastName' className={styles.label}>
              Фамилия
            </label>
            <input
              type='text'
              id='lastName'
              {...register("lastName")}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* Фото профиля */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Фото профиля</label>
            <input
              id='photo'
              type='file'
              {...register("photo", {
                value: photo,
              })}
              accept='image/png, image/jpeg, image/jpg, image/webp'
              className={styles.inputPhotos}
              onChange={(event) => changeHandler2(event)}
              onDragStart={(event) => dragStartHandler2(event)}
              onDragLeave={(event) => dragLeaveHandler2(event)}
              onDragOver={(event) => dragStartHandler2(event)}
              onDrop={(event) => dropHandler2(event)}
            />
            <label htmlFor='photo' className={styles.labelPhotos}>
              {!drag
                ? "Нажмите или перетащите изображения"
                : "Отпустите изображения"}
            </label>
          </div>

          {/* Предпросмотр фото */}
          {photo !== undefined && (
            <div className={styles.photosPreview}>
              <div className={styles.photo}>
                <img src={photo} alt={photo} className={styles.previewPhoto} />
                <p className={styles.photoTitle}>{photo}</p>
              </div>
            </div>
          )}

          {/* Текст */}
          <div className={styles.inputWrapper}>
            <label htmlFor='text' className={styles.label}>
              Текст отзыва
            </label>
            <textarea
              id='text'
              {...register("text", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>

          {/* Фото */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Фото</label>
            <input
              id='photos'
              type='file'
              {...register("photos", {
                value: photos,
              })}
              accept='image/png, image/jpeg, image/jpg, image/webp'
              multiple
              className={styles.inputPhotos}
              onChange={(event) => changeHandler(event)}
              onDragStart={(event) => dragStartHandler(event)}
              onDragLeave={(event) => dragLeaveHandler(event)}
              onDragOver={(event) => dragStartHandler(event)}
              onDrop={(event) => dropHandler(event)}
            />
            <label htmlFor='photos' className={styles.labelPhotos}>
              {!drag
                ? "Нажмите или перетащите изображения"
                : "Отпустите изображения"}
            </label>
          </div>

          {/* Предпросмотр фото */}
          {photos.length > 0 && (
            <div className={styles.photosPreview}>
              {photos.map((photo, index) => (
                <div className={styles.photo} key={index}>
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    className={styles.previewPhoto}
                  />
                  <p className={styles.photoTitle}>{photo}</p>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewKitchenPage;
