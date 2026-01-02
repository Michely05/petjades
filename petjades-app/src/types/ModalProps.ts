import { ReactNode } from "react";

export type ModalProps = {
  obert: boolean;
  titol: string;
  missatge?: string;
  tipus?: "success" | "error" | "info";
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
};

export type ConfirmModalProps = {
  obert: boolean;
  titol: string;
  missatge: string;
  onConfirm: () => void;
  onCancel: () => void;
};
