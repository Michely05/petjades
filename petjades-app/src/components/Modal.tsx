import { ModalProps } from "../types/ModalProps";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Children, forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({
  obert,
  titol,
  missatge,
  tipus = "info",
  onClose,
  children
}: ModalProps) => {
  const colors = {
    success: "#2e7d32",
    error: "#d32f2f",
    info: "#6b945a"
  };

  return (
    <Dialog
      open={obert}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slots={{
        transition: Transition
      }}
    >
      <DialogTitle
        sx={{ color: colors[tipus], fontWeight: 600 }}
      >
        {titol}
      </DialogTitle>

      <DialogContent>
        <p>{missatge}</p>
        {children}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ backgroundColor: colors[tipus] }}
        >
          D'acord
        </Button>
      </DialogActions>
    </Dialog>
  );
};
