import LanguageIcon from "@mui/icons-material/Language";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={style.footer}>
      <Divider />
      <div className={style.footer__emptybox}></div>
      <Divider />
      <div className={style.footer__copyright}>
        <div className={style.row}>
          <div className={style.footer__copyright__languageBox}>
            <LanguageIcon fontSize="small" />
            <span className={style.footer__copyright__languageBox__language}>English</span>
          </div>
          <div className={style.footer__copyright__text}>© 2024 cassoni.ae powered by Cassoni</div>
        </div>
        <div className={style.row}>
          <div className={`font_regular ${style.logo}`} onClick={() => navigate("/")}>
            Cassoni
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
