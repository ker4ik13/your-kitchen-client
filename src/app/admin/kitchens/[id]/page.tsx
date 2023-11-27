"use client";

import styles from "../Kitchens.module.scss";

import { type KeyboardEventHandler, useEffect, useState } from "react";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  KitchensOptions,
  KitchensStyles,
  kitchensStylesTranslate,
  kitchensTranslate,
} from "@/types/KitchenOptions";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import $api from "@/http";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getKitchen } from "@/store/kitchens.slice";
import { IKitchen } from "@/types/IKitchen";
import KitchenService from "@/services/KitchenService";

interface ISelectOptions {
  value: string;
  label: string;
}
interface IReadonlySelectOptions {
  readonly value: string;
  readonly label: string;
}

const kitchensStyles: ISelectOptions[] = [
  { value: KitchensOptions.chalet, label: kitchensTranslate.chalet },
  { value: KitchensOptions.classic, label: kitchensTranslate.classic },
  { value: KitchensOptions.hightech, label: kitchensTranslate.hightech },
  { value: KitchensOptions.loft, label: kitchensTranslate.loft },
  { value: KitchensOptions.minimalism, label: kitchensTranslate.minimalism },
  { value: "Модерн", label: "Модерн" },
  { value: "Современный", label: "Современный" },
  { value: "Прованс", label: "Прованс" },
  { value: "Скандинавский", label: "Скандинавский" },
];

const kitchensTypes: ISelectOptions[] = [
  { value: KitchensStyles.straight, label: kitchensStylesTranslate.straight },
  { value: KitchensStyles.corner, label: kitchensStylesTranslate.corner },
  { value: KitchensStyles.UShaped, label: kitchensStylesTranslate.UShaped },
  { value: KitchensStyles.fullWidth, label: kitchensStylesTranslate.fullWidth },
];

const createOption = (label: string) => ({
  label,
  value: label,
});

// Поля формы
interface TInputs {
  title: string;
  description: string;
  price: number;
  style: unknown | IReadonlySelectOptions;
  photos: ImageData[];
  type: unknown | IReadonlySelectOptions;
  term: string;
  onMainPage: boolean;
}

const NewKitchenPage = () => {
  const path = useParams();

  const { register, handleSubmit, control, reset, setValue } =
    useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const kitchenStore = useAppSelector((store) => store.kitchens);

  const [photos, setPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  // const [drag, setDrag] = useState(false);

  // Стейты для select
  const [inputValue, setInputValue] = useState("");
  const [value3, setValue3] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);
  // Стейты для select 2
  const [inputValue2, setInputValue2] = useState("");
  const [value2, setValue2] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);
  // Ошибка
  const [error, setError] = useState<any>({});

  // Срок
  const [termValue, setTermValue] = useState("");

  const [kitchen, setKitchen] = useState<IKitchen>({} as IKitchen);

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
          <p className={styles.title}>Кухня не найдена</p>
          <Link href='/admin/kitchens'>Назад</Link>
        </div>
      </div>
    );
  }

  const getProduct = async (id: string) => {
    const kitchenById = kitchenStore.kitchens.find(
      (kitchen) => kitchen._id === path.id,
    );

    if (kitchenById) {
      setPhotos(kitchenById.photos);
      setKitchen(kitchenById);

      setValue("title", kitchenById.title);
      setValue("description", kitchenById.description);
      setValue("price", kitchenById.price);
      setValue("style", kitchenById.style);
      if (kitchenById.onMainPage) {
        setValue("onMainPage", kitchenById.onMainPage);
      }
      setValue("term", kitchenById.term);
      setValue("type", kitchenById.type);
    } else {
      if (typeof path.id === "string") {
        try {
          const kitchenPayload = await KitchenService.getKitchen(path.id);

          setKitchen(kitchenPayload);
          setPhotos(kitchenPayload.photos);

          setValue("title", kitchenPayload.title);
          setValue("description", kitchenPayload.description);
          setValue("price", kitchenPayload.price);
          setValue("style", kitchenPayload.style);
          if (kitchenPayload.onMainPage) {
            setValue("onMainPage", kitchenPayload.onMainPage);
          }
          setValue("term", kitchenPayload.term);
          setValue("type", kitchenPayload.type);
        } catch (error) {
          setError({
            error: true,
            value: "Ошибка получения кухни. Попробуйте еще раз",
          });
        }
      }
    }
  };

  // Обработка нажатия enter в select
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue3((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
    }
  };
  // Обработка нажатия enter в select 2
  const handleKeyDown2: KeyboardEventHandler = (event) => {
    if (!inputValue2) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue2((prev) => [...prev, createOption(inputValue2)]);
        setInputValue2("");
        event.preventDefault();
    }
  };

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

  // Обработчик фото
  // const getPhotosFromFiles = (event: any, files: any[]) => {
  //   const photos: any[] = [];

  //   files.map((file) => {
  //     let photo = {
  //       title: file.name,
  //       src: URL.createObjectURL(file),
  //     };

  //     photos.push(photo);
  //   });

  //   setPhotos(photos);
  // };

  // Обработчики
  // const dragStartHandler = (event: any) => {
  //   event.preventDefault();
  //   setDrag(true);
  // };
  // const dragLeaveHandler = (event: any) => {
  //   event.preventDefault();
  //   setDrag(false);
  // };
  // const dropHandler = (event: any) => {
  //   event.preventDefault();
  //   setDrag(false);
  //   let files = [...event.dataTransfer.files];
  //   setFiles(files);

  //   if (files && files.length > 0) {
  //     getPhotosFromFiles(event, files);
  //   }
  // };
  // const changeHandler = (event: any) => {
  //   event.preventDefault();
  //   let files = [...event.target.files];
  //   setFiles(files);

  //   if (files && files.length > 0) {
  //     getPhotosFromFiles(event, files);
  //   }
  // };

  // Удаление фоток
  // const deleteImage = (photoTitle: number) => {
  //   const images = [...photos];

  //   const result = images.filter((image) => photoTitle !== image.title);

  //   setPhotos(result);
  // };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("title", data.title);
    form.append("description", data.description);
    form.append("price", data.price.toString());
    form.append("style", JSON.stringify(data.style));
    form.append("onMainPage", JSON.stringify(data.onMainPage));
    form.append("type", JSON.stringify(data.type));
    form.append("term", data.term);

    const response = await $api.patch(`/kitchens/${path.id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      setError({
        error: false,
        value: "Кухня успешно изменена",
      });
      reset({
        description: "",
        photos: [],
        price: 0,
        style: "",
        term: "",
        onMainPage: false,
        title: "",
        type: "",
      });
      setFiles([]);
      setPhotos([]);
    } else {
      setError({
        error: true,
        value: "Что-то пошло не так. Попробуйте еще раз",
      });
    }
  };

  const isSuccess = (error: any) => {
    return error.error === true ? styles.error : styles.success;
  };

  return (
    <div className={styles.kitchensPage}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>Изменить кухню</h2>
          <button type='submit' form='kitchenForm' className={styles.addButton}>
            Изменить
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
          {/* Заголовок */}
          <div className={styles.inputWrapper}>
            <label htmlFor='title' className={styles.label}>
              Название
            </label>
            <input
              type='text'
              id='title'
              defaultValue={kitchen.title}
              {...register("title", {
                required: true,
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>
          <div className={styles.string}>
            {/* Цена */}
            <div className={styles.inputWrapper}>
              <label htmlFor='price' className={styles.label}>
                Цена
              </label>
              <input
                type='number'
                id='price'
                defaultValue={kitchen.price}
                {...register("price", {
                  required: true,
                })}
                className={styles.textInput}
              />
            </div>

            {/* На главной */}
            <div className={styles.inputWrapper}>
              <label htmlFor='onMainPage' className={styles.label}>
                На главной странице
              </label>
              <input
                type='checkbox'
                {...register("onMainPage")}
                id='onMainPage'
                className={styles.checkboxInput}
              />
            </div>
          </div>

          {/* Описание */}
          <div className={styles.inputWrapper}>
            <label htmlFor='description' className={styles.label}>
              Описание
            </label>
            <textarea
              id='description'
              defaultValue={kitchen.description}
              {...register("description", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>

          {/* Срок */}
          <div className={styles.inputWrapper}>
            <label htmlFor='term' className={styles.label}>
              Срок
            </label>
            <input
              type='text'
              placeholder='21 день'
              id='term'
              defaultValue={kitchen.term}
              {...register("term", {
                required: true,
                onChange: (event) => {
                  setTermValue(event.target.value);
                },
              })}
              className={styles.textInput}
            />
            <div className={styles.clue}>
              <p>Будет отображаться так:</p>
              <p>Срок {`${termValue || kitchen.term}`}</p>
            </div>
          </div>

          {/* Стиль кухни */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Стиль кухни</label>
            <Controller
              control={control}
              name='style'
              render={({ field }) => (
                <CreatableSelect
                  className={styles.select}
                  components={components}
                  options={kitchensStyles}
                  value={field.value}
                  defaultValue={kitchen.style}
                  isSearchable
                  onChange={(newValue) => field.onChange(newValue)}
                  onInputChange={(newValue) => setInputValue(newValue)}
                  onKeyDown={handleKeyDown}
                  placeholder='Стиль кухни'
                />
              )}
            />
          </div>

          {/* Тип кухни */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Тип кухни</label>
            <Controller
              control={control}
              name='type'
              render={({ field }) => (
                <CreatableSelect
                  className={styles.select}
                  components={components}
                  options={kitchensTypes}
                  value={field.value}
                  defaultValue={kitchen.type}
                  isSearchable
                  onChange={(newValue) => field.onChange(newValue)}
                  onInputChange={(newValue) => setInputValue2(newValue)}
                  onKeyDown={handleKeyDown2}
                  placeholder='Тип кухни'
                />
              )}
            />
          </div>

          {/* Фото */}
          {/* <div className={styles.inputWrapper}>
            <label className={styles.label}>Фото</label>
            <input
              id='photos'
              type='file'
              {...register("photos", {
                required: true,
                value: photos,
              })}
              accept='image/png, image/jpeg, image/jpg, image/webp'
              multiple
              className={styles.inputPhotos}
              required
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
          </div> */}

          {/* Предпросмотр фото */}
          {photos && photos.length > 0 && (
            <div className={styles.photosPreview}>
              {photos.map((photo, index) => (
                <div className={styles.photo} key={index}>
                  <img
                    src={photo}
                    draggable={false}
                    alt={`Фото ${index + 1}`}
                    className={styles.previewPhoto}
                  />
                  {/* <button
                    type='button'
                    className={styles.deleteButton}
                    onClick={() => deleteImage(photo)}
                  >
                    ×
                  </button> */}
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
