export type ModalProps = {
  obert: boolean;
  titol: string;
  missatge: string;
  tipus?: "success" | "error" | "info";
  onClose: () => void;
};
