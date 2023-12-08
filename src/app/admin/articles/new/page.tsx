"use client";

import styles from "../../Page.module.scss";

import { useCallback, useEffect, useState } from "react";
import MiniLoading from "@/shared/MiniLoading";
import AdminSidebar from "@/widgets/AdminSidebar/AdminSidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkAuth } from "@/store/user.slice";
import { SubmitHandler, useForm } from "react-hook-form";

import $api from "@/http";
import { IError } from "@/types/IError";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Image as EditorImage } from "@tiptap/extension-image";
import EditorButtons from "@/widgets/AdminSidebar/EditorButtons/EditorButtons";
import { Link as EditorLink } from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

// Поля формы
interface TInputs {
  title: string;
  description: string;
  price: number;
  style: unknown;
  photos: ImageData[];
  type: unknown;
  term: string;
  onMainPage: boolean;
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
  const { register, handleSubmit, control, reset } = useForm<TInputs>();
  const userStore = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit,
      EditorImage,
      Underline,
      EditorLink.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
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

  const isSuccess = (error: IError) => {
    return error.isError === true ? styles.error : styles.success;
  };
  const getEditorValue = () => {
    console.log(editor?.getHTML());
  };

  return (
    <div className={styles.page}>
      {userStore.isAuth && <AdminSidebar store={userStore} />}
      <div className={styles.container}>
        <div className={styles.string}>
          <h2 className={styles.title}>{texts.titleText}</h2>
          <button className={styles.addButton} onClick={getEditorValue}>
            {texts.buttonText}
          </button>
        </div>
        <div className={styles.string}>
          <p className={isSuccess(error)}>{error.value}</p>
        </div>

        <EditorContent editor={editor} className={styles.editor}>
          <EditorButtons editor={editor} setLink={setLink} />
        </EditorContent>
        {/* Форма */}
      </div>
    </div>
  );
};

export default NewArticlePage;
