"use client";

import styles from "../../Page.module.scss";

import { useCallback, useEffect, useState } from "react";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { SubmitHandler, useForm } from "react-hook-form";

import { IError } from "@/types/IError";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as EditorImage } from "@tiptap/extension-image";
import EditorButtons from "@/widgets/EditorButtons/EditorButtons";
import { Link as EditorLink } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import $api from "@/http";

// Поля формы
interface TInputs {
  title: string;
  description: string;
  preview: string;
  onMainPage: boolean;
  viewCount: number;
}

// Тексты
const texts = {
  notFoundText: "Статья не найдена",
  buttonText: "Добавить",
  titleText: "Добавить статью",
  addOrChangeErrorText: "Ошибка добавления статьи. Попробуйте еще раз",
  errorText: "Что-то пошло не так. Попробуйте еще раз",
  successText: "Статья успешно добавлена",
};

const NewArticlePage = () => {
  const { register, handleSubmit, reset } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const [photo, setPhoto] = useState<any>();
  const [file, setFile] = useState<File>({} as File);
  const [drag, setDrag] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      EditorImage,
      Underline,
      EditorLink.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `<h1>Контент</h1>`,
  });

  // Ошибка
  const [error, setError] = useState<IError>({ isError: false, value: "" });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Обработчик фото
  const getPhotoFromFiles = (event: any, file: any) => {
    let photo = {
      title: file.name,
      src: URL.createObjectURL(file),
    };

    setPhoto(photo);
  };

  // Обработчики
  const dragStartHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(false);
  };
  const dropHandler2 = (event: any) => {
    event.preventDefault();
    setDrag(false);
    let file = event.dataTransfer.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };

  const deleteImage = () => {
    setPhoto({});
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

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const form = new FormData();

    form.append("title", data.title);
    form.append("description", data.description);
    form.append("files", file);
    form.append("content", editor.getHTML());
    form.append("onMainPage", JSON.stringify(data.onMainPage));
    form.append("viewCount", JSON.stringify(data.viewCount));
    form.append("author", userStore.user.email);

    try {
      const response = await $api.post("/articles", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError({
        isError: false,
        value: texts.successText,
      });
      reset({
        preview: "",
        title: "",
        viewCount: 0,
        onMainPage: false,
        description: "",
      });
      setFile({} as File);
      setPhoto(undefined);
    } catch (error) {
      setError({
        isError: true,
        value: texts.errorText,
      });
    }
  };

  const changeHandler = (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    setFile(file);

    if (file !== undefined) {
      getPhotoFromFiles(event, file);
    }
  };

  const isSuccess = (error: IError) => {
    return error.isError === true ? styles.error : styles.success;
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.titleText}</h2>
          <button
            type='submit'
            onClick={handleSubmit(onSubmit)}
            className={styles.addButton}
          >
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        <form
          className={styles.addForm}
          id='kitchenForm'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Заголовок */}
          <div className={styles.inputWrapper}>
            <label htmlFor='title' className={styles.label}>
              Заголовок
            </label>
            <input
              type='text'
              id='title'
              placeholder='Заголовок'
              {...register("title", {
                required: true,
              })}
              className={`${styles.textInput} ${styles.fullInput}`}
            />
          </div>

          {/* Описание */}
          <div className={styles.inputWrapper}>
            <label htmlFor='description' className={styles.label}>
              Описание
            </label>
            <textarea
              id='description'
              placeholder='Описание статьи (описание страницы)'
              {...register("description", {
                required: true,
              })}
              className={styles.textArea}
            />
          </div>

          {/* Количество просмотров */}
          <div className={styles.inputWrapper}>
            <label htmlFor='title' className={styles.label}>
              Изначально кол-во просмотров
            </label>
            <input
              type='number'
              id='viewCount'
              placeholder='350'
              {...register("viewCount")}
              className={styles.textInput}
            />
          </div>

          {/* Обложка */}
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Обложка</label>
            <input
              id='photo'
              type='file'
              {...register("preview", {
                value: photo,
              })}
              accept='image/png, image/jpeg, image/jpg, image/webp'
              className={styles.inputPhotos}
              onChange={(event) => changeHandler(event)}
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

          {/* Предпросмотр фото */}
          {photo && (
            <div className={styles.photosPreview}>
              <div className={styles.photoHeader}>
                <img
                  src={photo.src}
                  alt={photo.src}
                  className={styles.previewPhoto}
                />
                <button
                  type='button'
                  className={styles.deleteButton}
                  onClick={deleteImage}
                >
                  ×
                </button>
                <p className={styles.photoTitle}>{photo.title}</p>
              </div>
            </div>
          )}
        </form>

        <EditorContent editor={editor} className={styles.editor}>
          <EditorButtons editor={editor} setLink={setLink} />
        </EditorContent>
        {/* Форма */}
      </div>
    </div>
  );
};

export default NewArticlePage;
