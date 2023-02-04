import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  content: string;
  progressTitle: string;
  cancelTitle: string;
  progressFn: any;
  cancelFn: any;
}

const AlertDialog: FC<Props> = ({
  title,
  content,
  progressTitle,
  cancelTitle,
  progressFn,
  cancelFn,
}) => {
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={progressFn}>{progressTitle}</Button>
          <Button color="error" onClick={cancelFn} autoFocus>
            {cancelTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
