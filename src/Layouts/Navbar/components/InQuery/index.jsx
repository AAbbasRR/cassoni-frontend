import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Button from "components/Button";
import React, { useState } from "react";
import axios from "utils/axios";
import style from "./style,.module.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InQuery = ({ open, onClose }) => {
  const [inputData, setInputData] = useState({
    email: "",
    mobile: "",
  });
  const [error, setError] = useState({
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const changeInputHandler = (event, fieldName) => {
    const newInputData = { ...inputData };
    const newError = { ...error };
    newInputData[fieldName] = event.target.value;
    newError[fieldName] = "";
    setInputData({ ...newInputData });
    setError({ ...newError });
  };

  const submitInQuery = () => {
    if (inputData?.mobile === "" && inputData?.email === "") {
      setError({
        email: "Filling one of these two is mandatory",
        mobile: "Filling one of these two is mandatory",
      });
      return;
    }

    setLoading(true);
    axios
      .post("public/inquery/new/submit/", { mobile: inputData?.mobile, email: inputData?.email })
      .then((res) => {
        setInputData({
          email: "",
          mobile: "",
        });
        setError({
          email: "",
          mobile: "",
        });
        onClose();
      })
      .catch((err) => {
        const response = err?.response?.data ?? {};
        const newError = { ...error };
        for (let key in response) {
          newError[key] = response[key][0];
        }
        setError({ ...newError });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className={style.dialogHeader}>
        <IconButton onClick={onClose}>
          <CloseIcon className={style.dialogHeader__icon} />
        </IconButton>
        <span className={`font_regular ${style.dialogHeader__title}`}>Submit Your InQuery</span>
      </DialogTitle>
      <Divider />
      <DialogContent className={style.dialogContent}>
        <TextField
          className={style.dialogContent__input}
          value={inputData?.mobile}
          onChange={(e) => changeInputHandler(e, "mobile")}
          error={error?.mobile}
          helperText={error?.mobile}
          label="Phone Number"
          variant="filled"
        />
        <TextField
          className={style.dialogContent__input}
          value={inputData?.email}
          onChange={(e) => changeInputHandler(e, "email")}
          error={error?.email}
          helperText={error?.email}
          label="Email"
          variant="filled"
        />
      </DialogContent>
      <Divider />
      <div className={style.dialogFooter}>
        <Button text="Submit" onClick={submitInQuery} loading={loading} />
      </div>
    </Dialog>
  );
};

export default InQuery;
