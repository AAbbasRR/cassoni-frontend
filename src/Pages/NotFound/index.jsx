import { Divider } from "@mui/material";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import notFoundImage from "assets/images/not_found.png";
import Button from "components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      <Navbar />
      <div className={style.container}>
        <div className={style.container__headerTitle}>Page Not Found</div>
        <div className={style.container__body}>
          <p>
            We apologize, we cannot find the page you are looking for. Please contact our Client
            Services or navigate to another page. Thank you.
          </p>
          <Divider className={style.divider} />
          <LazyLoadImage src={notFoundImage} className={style.container__body__image} />
          <Button
            className={style.container__body__backBTN}
            onClick={() => navigate("/")}
            text="Back To Home"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
