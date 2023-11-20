"use client";

import { IClaim } from "@/types/IClaim";
import styles from "./AdminClaim.module.scss";
import { FC, useState } from "react";
import { Icons } from "@/shared/IconsComponents/Icons";
import Icon from "@/shared/IconsComponents/Icon";
import ClaimService from "@/services/ClaimService";

interface AdminClaimProps {
  propsClaim: IClaim;
}

const copy = (event: any, value: string) => {
  let target = event.currentTarget;
  target.classList.add(styles.success);
  navigator.clipboard.writeText(value);

  setTimeout(() => {
    target.classList.remove(styles.success);
  }, 2000);
};

const AdminClaim: FC<AdminClaimProps> = ({ propsClaim }) => {
  const defaultClime = propsClaim;
  // TODO: подтверждение удаление заявки
  const [claim, setClaim] = useState(propsClaim);
  const [isEdit, setIsEdit] = useState(false);

  const deleteClaim = async (id: string) => {
    const response = await ClaimService.deleteClaim(id);
    if (response.status === 200) {
      setClaim({} as IClaim);
    }
  };

  if (!claim._id) {
    return;
  }

  const editClaim = () => {
    if (isEdit) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <div className={styles.claim}>
      <div className={styles.header}>
        <p className={styles.title}>Новая заявка!</p>
        <div className={styles.buttons}>
          <button type='button' className={styles.button} onClick={editClaim}>
            {!isEdit ? (
              <Icon icon={Icons.edit(styles.icon)} />
            ) : (
              <Icon icon={Icons.done(styles.icon)} />
            )}
          </button>
          {isEdit && (
            <button
              type='button'
              className={styles.button}
              onClick={() => setIsEdit(false)}
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
                className={styles.input}
                value={claim.firstName}
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
                type='text'
                className={styles.input}
                value={claim.mobilePhone}
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
            {!isEdit ? (
              <time dateTime={claim.date} className={styles.fieldValue}>
                {new Date(claim.date).toLocaleString("ru")}
              </time>
            ) : (
              <input type='text' className={styles.input} value={claim.date} />
            )}
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
