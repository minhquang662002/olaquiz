import { Dispatch, FC, SetStateAction } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}

const AlertDialog: FC<Props> = ({ setOpen, setOpenDialog }) => {
  const confirmation = () => {
    setOpenDialog(false);
    setOpen(false);
  };
  const rejection = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hủy bài?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn đang viết bài. Ta có chắc là muốn thoát?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={rejection}>Tiếp tục viết</Button>
          <Button color="error" onClick={confirmation} autoFocus>
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
