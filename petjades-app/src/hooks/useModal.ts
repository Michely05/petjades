import { useState } from "react";
import { ModalProps } from "../types/ModalProps";

type OpenModalParams = {
  title: string;
  message: string;
  type?: "success" | "error" | "info";
};

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "info">("info");

  const openModal = ({ title, message, type = "info" }: OpenModalParams) => {
    setTitle(title);
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
