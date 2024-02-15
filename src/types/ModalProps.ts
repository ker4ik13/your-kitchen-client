import { type ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setIsOpenThanks: (isOpen: boolean) => void;
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
}
export interface ModalButtonProps {
  buttonText?: string;
  descriptionText?: string | ReactNode;
  tag?: string;
  location?: string;
}
