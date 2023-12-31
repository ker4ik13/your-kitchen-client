import styles from "./LeaveRequest.module.scss";
import phone from "@/data/images/phoneHand.webp";
import designer from "@/data/team/team2.webp";
import miniLogo from "@/data/images/logo.webp";
import Icon from "@/shared/IconsComponents/Icon";
import { Icons } from "@/shared/IconsComponents/Icons";
import { links } from "@/data/links";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TFormInputsNames, type TFormInputs } from "@/types/TFormInputs";
import { isErrorStyles } from "@/features/isErrorStyles";
import requests from "@/features/requests";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Api url has been not imported from .env");
}

interface LeaveRequestProps {
  isModal?: boolean;
  onClick?: (...options: any) => void;
  setIsOpen?: (isOpen: boolean) => void;
  setIsOpenThanks?: (isOpen: boolean) => void;
  buttonText?: string;
}

const LeaveRequest = ({
  isModal,
  onClick,
  setIsOpen,
  setIsOpenThanks,
  buttonText,
}: LeaveRequestProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TFormInputs>();

  const router = useRouter();

  const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
    data.date = new Date().toISOString();
    const result = await requests.post(`${API_URL}/api/claims`, data);

    if (result?.ok) {
      resetField("firstName");
      setValue("mobilePhone", "");

      if (buttonText) {
        document.body.classList.remove("overflow");

        router.push(
          "https://drive.google.com/file/d/1MGjzCrXvgawfzvztEZu-CNawy-E4K-Jn/view?usp=drive_link",
        );
      }
    }
    if (isModal && setIsOpen && setIsOpenThanks) {
      setIsOpenThanks(true);
      setIsOpen(false);
    }
    if (!isModal && setIsOpenThanks) {
      setIsOpenThanks(true);
    }
  };

  if (isModal && setIsOpen) {
    return (
      <div className={styles.container} onClick={onClick}>
        {/* Карточка */}
        <div className={styles.card}>
          <Image
            src={phone}
            alt='Чат'
            className={styles.phone}
            draggable={false}
          />
          <button
            type='button'
            className={styles.closeButton}
            onClick={() => {
              setIsOpen(false);
              document.body.classList.remove("overflow");
            }}
          >
            ×
          </button>
          <div className={styles.wrapper}>
            <p className={styles.minus}>—</p>
            <h3 className={styles.title}>
              Оставьте заявку и специалист напишет вам
            </h3>
            <div className={styles.designer}>
              <Image
                src={designer}
                alt='Дизайнер'
                draggable={false}
                className={styles.designerImg}
              />
              <div className={styles.designerWrapper}>
                <p className={styles.name}>Настя Лебедева</p>
                <div className={styles.description}>
                  <p>Главный дизайнер компании</p>{" "}
                  <span>
                    <Image src={miniLogo} alt='Логотип' draggable={false} />{" "}
                    <p>Твоя Кухня</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.text}>
            чтобы <span>рассчитать стоимость кухни</span> по телефону или
            договориться о выезде на замер кухни.
            <br /> Выезд <span>бесплатный</span> и возможен в этот же день
          </p>
          <form className={styles.formWrapper}>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  {...register("firstName", {
                    required: "Введите ваше имя",
                    minLength: 2,
                  })}
                  className={isErrorStyles(
                    TFormInputsNames.firstName,
                    errors,
                    styles,
                  )}
                  placeholder='Ваше имя'
                  autoComplete='given-name'
                />
                <Icon icon={Icons.user(styles.icon)} />
              </div>
              <div className={styles.inputWrapper}>
                <ReactInputMask
                  type='tel'
                  autoComplete='tel'
                  mask='+7 999 999-99-99'
                  maskChar={null}
                  className={isErrorStyles(
                    TFormInputsNames.firstName,
                    errors,
                    styles,
                  )}
                  placeholder='Ваш телефон'
                  {...register("mobilePhone", {
                    required: "Введите ваш телефон",
                    minLength: 16,
                  })}
                />
                <Icon icon={Icons.phoneGray(styles.icon)} />
              </div>
            </div>
          </form>
          <div className={styles.contactsWrapper}>
            <div className={styles.column}>
              <p className={styles.writeText}>
                Или напишите нам сами удобным способом:
              </p>
              <div className={styles.contacts}>
                <Link
                  href={links.tgChat}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.telegram(styles.contactsIcon)} />
                  <p className={styles.contactText}>Telegram</p>
                </Link>
                <Link
                  href={links.whatsapp}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.whatsapp(styles.contactsIcon)} />
                  <p className={styles.contactText}>WhatsApp</p>
                </Link>
                <Link
                  href={links.vk}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.vk(styles.contactsIcon)} />
                  <p className={styles.contactText}>VK.com</p>
                </Link>
              </div>
            </div>
            <button
              type='button'
              className={styles.button}
              onClick={handleSubmit(onSubmitLeaveRequest)}
            >
              {buttonText || "Рассчитать стоимость"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.leaveRequest}>
      <div className={styles.container} onClick={onClick}>
        {/* Карточка */}
        <div className={styles.card}>
          <Image
            src={phone}
            alt='Чат'
            className={styles.phone}
            draggable={false}
          />
          <div className={styles.wrapper}>
            <p className={styles.minus}>—</p>
            <h3 className={styles.title}>
              Оставьте заявку и специалист напишет вам
            </h3>
            <div className={styles.designer}>
              <Image
                src={designer}
                alt='Дизайнер'
                draggable={false}
                className={styles.designerImg}
              />
              <div className={styles.designerWrapper}>
                <p className={styles.name}>Настя Лебедева</p>
                <div className={styles.description}>
                  <p>Главный дизайнер компании</p>{" "}
                  <span>
                    <Image src={miniLogo} alt='Логотип' draggable={false} />{" "}
                    <p>Твоя Кухня</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.text}>
            чтобы <span>рассчитать стоимость кухни</span> по телефону или
            договориться о выезде на замер кухни.
            <br /> Выезд <span>бесплатный</span> и возможен в этот же день
          </p>
          <form className={styles.formWrapper}>
            <div className={styles.inputsWrapper}>
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  {...register("firstName", {
                    required: "Введите ваше имя",
                    minLength: 2,
                  })}
                  className={isErrorStyles(
                    TFormInputsNames.firstName,
                    errors,
                    styles,
                  )}
                  placeholder='Ваше имя'
                  autoComplete='given-name'
                />
                <Icon icon={Icons.user(styles.icon)} />
              </div>
              <div className={styles.inputWrapper}>
                <ReactInputMask
                  type='tel'
                  autoComplete='tel'
                  mask='+7 999 999-99-99'
                  maskChar={null}
                  className={isErrorStyles(
                    TFormInputsNames.firstName,
                    errors,
                    styles,
                  )}
                  placeholder='Ваш телефон'
                  {...register("mobilePhone", {
                    required: "Введите ваш телефон",
                    minLength: 16,
                  })}
                />
                <Icon icon={Icons.phoneGray(styles.icon)} />
              </div>
            </div>
          </form>
          <div className={styles.contactsWrapper}>
            <div className={styles.column}>
              <p className={styles.writeText}>
                Или напишите нам сами удобным способом:
              </p>
              <div className={styles.contacts}>
                <Link
                  href={links.tgChat}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.telegram(styles.contactsIcon)} />
                  <p className={styles.contactText}>Telegram</p>
                </Link>
                <Link
                  href={links.whatsapp}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.whatsapp(styles.contactsIcon)} />
                  <p className={styles.contactText}>WhatsApp</p>
                </Link>
                <Link
                  href={links.vk}
                  className={styles.contactCard}
                  target='_blank'
                >
                  <Icon icon={Icons.vk(styles.contactsIcon)} />
                  <p className={styles.contactText}>VK.com</p>
                </Link>
              </div>
            </div>
            <button
              type='button'
              className={styles.button}
              onClick={handleSubmit(onSubmitLeaveRequest)}
            >
              {buttonText || "Рассчитать стоимость"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
