import { type ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
  title?: string;
  cardTitle?: string;
  setIsOpenPrivacy?: (isOpen: boolean) => void;
}
export interface ModalButtonProps {
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
}
