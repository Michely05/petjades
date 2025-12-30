export type ModalProps = {
  obert: boolean;
  titol: string;
  missatge: string;
  tipus?: "success" | "error" | "info";
  onClose: () => void;
};

export type ConfirmModalProps = {
  obert: boolean;
  titol: string;
  missatge: string;
  onConfirm: () => void;
  onCancel: () => void;
};
