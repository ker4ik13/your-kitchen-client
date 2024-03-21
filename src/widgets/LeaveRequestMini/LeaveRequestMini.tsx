"use client";

import { isErrorStyles } from "@/features/isErrorStyles";
import ClaimService from "@/services/admin/ClaimService";
import { Icons } from "@/shared/IconsComponents/Icons";
import { PrivacyPolicy } from "@/shared/PrivacyPolicy";
import { YANDEX_ANALYTICS } from "@/shared/constants";
import { OrangeButton } from "@/shared/ui";
import { TFormInputsNames, type TFormInputs } from "@/types/TFormInputs";
import { CreateClaimDto } from "@/types/dtos/CreateClaim.dto";
import { ym } from "next-yandex-metrica";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { TextModal } from "../Modals/TextModal/TextModal";
import { ThanksModal } from "../Modals/ThanksModal";
import styles from "./LeaveRequestMini.module.scss";

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Api url has been not imported from .env");
}

export type ModalType = "default" | "promotion" | "call";

interface LeaveRequestMiniProps {
  title?: string;
  tag?: string;
  location?: string;
  button?: {
    text?: string;
    arrow?: "left" | "right" | "up" | "down";
  };
  type?: ModalType;
}

const getModalType = (type: ModalType): string => {
  switch (type) {
    case "default":
      return styles.card;
    case "promotion":
      return styles.promotion;
    case "call":
      return styles.call;
    default:
      return styles.card;
  }
};

export const LeaveRequestMini = ({
  title,
  tag,
  location,
  button,
  type = "default",
}: LeaveRequestMiniProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm<TFormInputs>();

  const [isOpenThanks, setIsOpenThanks] = useState(false);
  const [isOpenPrivacy, setIsOpenPrivacy] = useState(false);

  const onSubmitLeaveRequest: SubmitHandler<TFormInputs> = async (data) => {
    const newClaim = new CreateClaimDto({
      ...data,
      date: new Date().toISOString(),
      location,
      tag,
    });
    const result = await ClaimService.addClaim(newClaim);

    if (result?.status === 201) {
      resetField("firstName");
      setValue("mobilePhone", "");
      setIsOpenThanks(true);
      ym(YANDEX_ANALYTICS, "reachGoal", "make-call");
    }
  };

  return (
    <>
      <TextModal
        isOpen={isOpenPrivacy}
        setIsOpen={setIsOpenPrivacy}
        text={PrivacyPolicy}
      />
      {isOpenThanks && <ThanksModal setIsOpen={setIsOpenThanks} />}
      <div className={styles.leaveRequest}>
        <div className={styles.container}>
          {/* Карточка */}
          <div className={getModalType(type)}>
            <div className={styles.wrapper}>
              <p className={styles.minus}>—</p>
              <h3 className={styles.title}>
                {title ? title : "Получите бесплатный эскиз вашего проекта"}
              </h3>
            </div>

            <form className={styles.formWrapper2}>
              <div className={styles.inputsWrapper2}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    autoComplete="given-name"
                    className={isErrorStyles(
                      TFormInputsNames.firstName,
                      errors,
                      styles,
                    )}
                    placeholder="Ваше имя"
                    {...register("firstName", {
                      required: "Введите ваше имя",
                      minLength: 2,
                    })}
                  />
                  <Icons.user className={styles.icon} />
                </div>
                <div className={styles.inputWrapper}>
                  <ReactInputMask
                    type="tel"
                    autoComplete="tel"
                    mask="+7 999 999-99-99"
                    maskChar={null}
                    className={isErrorStyles(
                      TFormInputsNames.mobilePhone,
                      errors,
                      styles,
                    )}
                    placeholder="Ваш телефон"
                    {...register("mobilePhone", {
                      required: "Введите ваш телефон",
                      minLength: 16,
                    })}
                  />
                  <Icons.phoneGray className={styles.icon} />
                </div>
                <div className={styles.column}>
                  <OrangeButton
                    onClick={handleSubmit(onSubmitLeaveRequest)}
                    className={styles.button}
                    arrow={button && button.arrow ? button.arrow : undefined}
                  >
                    {button && button.text ? button.text : "Получить эскиз"}
                  </OrangeButton>
                  <p className={styles.infoText}>
                    Нажимая на кнопку «Отправить» вы даёте{" "}
                    <button
                      type="button"
                      onClick={() => setIsOpenPrivacy(true)}
                    >
                      согласие на обработку персональных данных
                    </button>
                  </p>
                </div>
              </div>
            </form>
            <p className={styles.text}>
              Менеджер свяжется с вами в течение <span>15 минут</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
