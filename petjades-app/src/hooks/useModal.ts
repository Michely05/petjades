import { useState } from "react";
import { ModalProps } from "../types/ModalProps";

type OpenModalParams = {
  title: string;
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
};

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");
  const [afterClose, setAfterClose] = useState<(() => void) | null>(null);

  const openModal = ({
    title,
    message,
    type = "info",
    onClose,
  }: OpenModalParams) => {
    setTitle(title);
    setMessage(message);
    setAfterClose(() => onClose ?? null);
    setType(type);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    if (afterClose) afterClose();
    setAfterClose(null);
  };

  const modalProps: ModalProps = {
    obert: open,
    titol: title,
    missatge: message,
    tipus: type,
    onClose: closeModal,
  };

  return {
    openModal,
    closeModal,
    modalProps,
  };
};
