"use client";

import type { IClaim } from "@/types/IClaim";
import styles from "./AdminClaim.module.scss";
import { type FC, useState } from "react";
import { Icons } from "@/shared/IconsComponents/Icons";
import Icon from "@/shared/IconsComponents/Icon";
import ClaimService from "@/services/ClaimService";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AdminClaimProps {
  propsClaim: IClaim;
}

// Функция копирования
const copy = (event: any, value: string) => {
  let target = event.currentTarget;
  target.classList.add(styles.success);
  navigator.clipboard.writeText(value);

  setTimeout(() => {
    target.classList.remove(styles.success);
  }, 2000);
};

interface TInputs {
  firstName: string;
  mobilePhone: string;
  email?: string;
}

const AdminClaim: FC<AdminClaimProps> = ({ propsClaim }) => {
  const { register, handleSubmit, setValue } = useForm<TInputs>({
    defaultValues: {
      firstName: propsClaim.firstName,
      mobilePhone: propsClaim.mobilePhone,
      email: propsClaim.email,
    },
  });

  const [claim, setClaim] = useState(propsClaim);
  const [isEdit, setIsEdit] = useState(false);

  const deleteClaim = async (id: string) => {
    const response = await ClaimService.deleteClaim(id);
    if (response.status === 200) {
      setClaim({} as IClaim);
    }
  };

  const editClaim = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  // Если нет заявки, пустой компонент
  if (!claim._id) {
    return;
  }

  const cancelEdit = () => {
    setIsEdit(false);
    setValue("firstName", claim.firstName);
    setValue("mobilePhone", claim.mobilePhone);
    setValue("email", claim.email);
  };

  const onSubmit: SubmitHandler<TInputs> = async (fields) => {
    setIsEdit(false);
    if (
      fields.firstName === claim.firstName &&
      fields.mobilePhone === claim.mobilePhone &&
      fields.email === claim.email
    ) {
      return;
    }

    const response = await ClaimService.updateClaim(claim._id, {
      firstName: fields.firstName,
      mobilePhone: fields.mobilePhone,
    });
    setClaim(response.data);
  };

  return (
    <div className={styles.claim}>
      <div className={styles.header}>
        <p className={styles.title}>Новая заявка!</p>
        <div className={styles.buttons}>
          {isEdit ? (
            <button
              type='button'
              className={styles.button}
              onClick={handleSubmit(onSubmit)}
            >
              <Icon icon={Icons.done(styles.icon)} />
            </button>
          ) : (
            <button type='button' className={styles.button} onClick={editClaim}>
              <Icon icon={Icons.edit(styles.icon)} />
            </button>
          )}
          {isEdit && (
            <button
              type='button'
              className={styles.button}
              onClick={cancelEdit}
            >
              <Icon icon={Icons.cancel(styles.icon)} />
            </button>
          )}
          <button
            type='button'
            className={styles.button}
            onClick={() => deleteClaim(claim._id)}
          >
            <Icon icon={Icons.remove(styles.icon)} />
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInfo}>
            <p className={styles.fieldTitle}>Имя:</p>
            {!isEdit ? (
              <p className={styles.fieldValue}>{claim.firstName}</p>
            ) : (
              <input
                type='text'
                {...register("firstName", {
                  required: true,
                })}
                className={styles.input}
              />
            )}
          </div>
          <button
            type='button'
            className={styles.button}
            onClick={(event: any) => copy(event, claim.firstName)}
          >
            <Icon icon={Icons.copy(styles.icon)} />
          </button>
        </div>
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInfo}>
            <p className={styles.fieldTitle}>Телефон:</p>
            {!isEdit ? (
              <p className={styles.fieldValue}>{claim.mobilePhone}</p>
            ) : (
              <input
                type='tel'
                {...register("mobilePhone", {
                  required: true,
                })}
                className={styles.input}
              />
            )}
          </div>
          <button
            type='button'
            className={styles.button}
            onClick={(event: any) => copy(event, claim.mobilePhone)}
          >
            <Icon icon={Icons.copy(styles.icon)} />
          </button>
        </div>
        {claim.email && (
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldInfo}>
              <p className={styles.fieldTitle}>Почта:</p>
              {!isEdit ? (
                <p className={styles.fieldValue}>{claim.email}</p>
              ) : (
                <input
                  type='email'
                  className={styles.input}
                  value={claim.email}
                />
              )}
            </div>
            <button
              type='button'
              className={styles.button}
              onClick={(event: any) => copy(event, claim.email || "")}
            >
              <Icon icon={Icons.copy(styles.icon)} />
            </button>
          </div>
        )}
        <div className={styles.fieldWrapper}>
          <div className={styles.fieldInfo}>
            <p className={styles.fieldTitle}>Дата заявки:</p>
            <time dateTime={claim.date} className={styles.fieldValue}>
              {new Date(claim.date).toLocaleString("ru")}
            </time>
          </div>
          <button
            type='button'
            className={styles.button}
            onClick={(event: any) =>
              copy(event, new Date(claim.date).toLocaleString("ru"))
            }
          >
            <Icon icon={Icons.copy(styles.icon)} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClaim;
