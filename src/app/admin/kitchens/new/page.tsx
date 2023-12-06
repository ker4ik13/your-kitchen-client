"use client";

import styles from "../../Page.module.scss";

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
import { isUserHaveRights } from "@/features/isUserHaveRights";
import { UserRoles } from "@/types/UserRoles";
import { IError } from "@/types/IError";

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

// Тексты
const texts = {
  notFoundText: "Кухня не найдена",
  buttonText: "Добавить",
  titleText: "Добавить кухню",
  addOrChangeErrorText: "Ошибка добавления кухни. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Кухня успешно добавлена",
};

const NewKitchenPage = () => {
  const { register, handleSubmit, control, reset } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photos, setPhotos] = useState<any[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [drag, setDrag] = useState(false);

  // Стейты для select
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);
  // Стейты для select 2
  const [inputValue2, setInputValue2] = useState("");
  const [value2, setValue2] = useState<
    readonly IReadonlySelectOptions[] | unknown[]
  >([]);

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  // Срок
  const [termValue, setTermValue] = useState("");

  // Обработка нажатия enter в select
  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (!isUserHaveRights(userStore.user, UserRoles.Admin)) {
      setError({
        isError: true,
        value: "У вас нет прав на просмотр этой страницы",
      });
    }
  }, [userStore.user]);

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

  // Удаление фоток
  const deleteImage = (photoTitle: number) => {
    const images = [...photos];

    const result = images.filter((image) => photoTitle !== image.title);

    setPhotos(result);
  };

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("title", data.title);
    form.append("description", data.description);
    form.append("price", data.price.toString());
    form.append("style", JSON.stringify(data.style));
    // Добавление всех фото
    files.forEach((file) => {
      form.append(`files`, file);
    });
    form.append("onMainPage", JSON.stringify(data.onMainPage));
    form.append("type", JSON.stringify(data.type));
    form.append("term", data.term);

    const response = await $api.post("/kitchens", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        description: "",
        photos: [],
        price: 0,
        style: "",
        term: "",
        title: "",
        onMainPage: false,
        type: "",
      });
      setFiles([]);
      setPhotos([]);
    } else {
      setError({
        isError: true,
        value: texts.addOrChangeErrorText,
      });
    }
  };

  const isSuccess = (error: IError) => {
    return error.isError === true ? styles.error : styles.success;
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <div className={styles.string}>
            <h2 className={styles.title}>{texts.titleText}</h2>
            <button
              type='submit'
              form='kitchenForm'
              className={styles.addButton}
            >
              {texts.buttonText}
            </button>
          </div>
        )}
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>
        {isUserHaveRights(userStore.user, UserRoles.Admin) && (
          <>
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
                  placeholder='Название кухни'
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
                    placeholder='249999'
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
                  placeholder='Описание'
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
                  <p>Срок {`${termValue}`}</p>
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
              <div className={styles.inputWrapper}>
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
              </div>

              {/* Предпросмотр фото */}
              {photos.length > 0 && (
                <div className={styles.photosPreview}>
                  {photos.map((photo, index) => (
                    <div className={styles.photo} key={index}>
                      <img
                        src={photo.src}
                        alt={`Фото ${index + 1}`}
                        className={styles.previewPhoto}
                      />
                      <button
                        type='button'
                        className={styles.deleteButton}
                        onClick={() => deleteImage(photo.title)}
                      >
                        ×
                      </button>
                      <p className={styles.photoTitle}>{photo.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NewKitchenPage;
