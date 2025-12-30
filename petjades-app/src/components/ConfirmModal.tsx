import { ConfirmModalProps } from "../types/ModalProps";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmModal = ({
  obert,
  titol,
  missatge,
  onConfirm,
  onCancel
}: ConfirmModalProps) => {

  const colors = {
    success: "#2e7d32",
    error: "#d32f2f",
    info: "#6b945a"
  };

  return (
    <Dialog open={obert} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{color: colors.info,fontWeight: 600 }}>
        {titol}
      </DialogTitle>

      <DialogContent>
        <p>{missatge}</p>
      </DialogContent>

      <DialogActions>

        <Button onClick={onConfirm} variant="contained" color="success">
          Sí
        </Button>

        <Button onClick={onCancel} variant="contained" color="error">
          No
        </Button>

      </DialogActions>
    </Dialog>
  );
};
