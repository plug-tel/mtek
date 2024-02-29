import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },

  "& .MuiBackdrop-root": {
    backdropFilter: "blur(5px)",
    backgroundColor: "transparent",
  },
  "& .MuiDialog-paper": { boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.1);" },
}));
export default function CustomizedDialog({
  text,
  description,
  open,
  handleConfirmCancel,
  handleConfirmDelete,
  close,
}) {
  return (
    <>
      <BootstrapDialog fullWidth onClose={close} open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {text}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={close}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography variant="h5" gutterBottom>
            Description :
          </Typography>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Confirmer
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleConfirmCancel}
          >
            Annuler
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
