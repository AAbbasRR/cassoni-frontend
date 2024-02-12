import style from "./style.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const Button = ({ text, onClick = null, className = null, loading = false }) => {
  return (
    <div className={`${style.buttonMain} ${className}`} onClick={onClick}>
      {loading ? <CircularProgress size={20} sx={{ color: "#212121" }} /> : text}
    </div>
  );
};

export default Button;
