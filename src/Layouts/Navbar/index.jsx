import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Hidden } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "utils/axios";
import InQuery from "./components/InQuery";
import style from "./style.module.scss";

const socialMediaIcons = {
  Telegram: <TelegramIcon />,
  WhatsApp: <WhatsAppIcon />,
  YouTube: <YouTubeIcon />,
  Instagram: <InstagramIcon />,
  Twitter: <XIcon />,
  Phone: <LocalPhoneIcon />,
  Email: <EmailIcon />,
  Address: <LocationOnIcon />,
};

const Navbar = ({ opacity = false }) => {
  const navigate = useNavigate();

  const [ourStoryOpen, setOurStoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ourStoryData, setOurStoryData] = useState(null);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [contactData, setContactData] = useState({});
  const [inqueryModal, setInQueryModal] = useState(false);

  useEffect(() => {
    getourStoryData();
  }, []);

  const openInQueryModal = () => {
    setOurStoryOpen(false);
    setMobileMenuOpen(false);
    setInQueryModal(true);
  };

  const getourStoryData = () => {
    axios.get("public/settings/options/list/", { search: "OurStory" }).then((res) => {
      setOurStoryData(res.data.results?.[0]?.value);
    });
    axios.get("public/settings/social_media/list/").then((res) => {
      setSocialMediaData(res.data.results);
    });
    axios.get("public/settings/contact/list/").then((res) => {
      let contactNewData = {};
      res.data.results?.map((item) => {
        if (contactNewData.hasOwnProperty(item?.type)) {
          contactNewData[item?.type].push(item?.value);
        } else {
          contactNewData[item?.type] = [item?.value];
        }
      });
      setContactData(contactNewData);
    });
  };

  return (
    <>
      <InQuery open={inqueryModal} onClose={() => setInQueryModal(false)} />
      <Hidden mdDown>
        <div className={`${style.navbar} ${opacity || style.navbarFix}`}>
          <div className={`${style.navbar__menuBox} ${style.navbar__menuBox__left}`}>
            <Link className={style.navbar__menuBox__menuItem} to="/">
              Home
            </Link>
            <span className={style.navbar__menuBox__menuItem} onClick={() => setOurStoryOpen(true)}>
              Our Story
            </span>
            <span className={style.navbar__menuBox__menuItem} onClick={openInQueryModal}>
              Inquery
            </span>
          </div>
          <div className={`font_regular ${style.navbar__logo}`} onClick={() => navigate("/")}>
            Cassoni
          </div>
          <div className={`${style.navbar__menuBox} ${style.navbar__menuBox__right}`}>
            <span className={`${style.navbar__menuBox__menuItem} ${style.disabled}`} to="#">
              Products
            </span>
            <span className={`${style.navbar__menuBox__menuItem} ${style.disabled}`} to="#">
              Branchs
            </span>
          </div>
        </div>
        <Drawer anchor="left" open={ourStoryOpen} onClose={() => setOurStoryOpen(false)}>
          <Box className={style.drawerBox} role="presentation" sx={{ width: "40rem" }}>
            <div className={style.drawerBox__header}>
              <div
                className={style.drawerBox__header__close}
                onClick={() => setOurStoryOpen(false)}
              >
                <CloseIcon fontSize="medium" />
                <span>Close</span>
              </div>
              <div className={style.drawerBox__header__title}>Our Story</div>
            </div>
            <div className={style.drawerBox__body}>
              <div dangerouslySetInnerHTML={{ __html: ourStoryData }} />
              {socialMediaData.length >= 1 && (
                <>
                  <Divider className={style.divider} />
                  <div className={style.drawerBox__body__socialMedia}>
                    {socialMediaData?.map((item, index) => (
                      <a
                        className={style.drawerBox__body__socialMedia__item}
                        href={item?.application_url}
                        key={index}
                        target="_blank"
                      >
                        {socialMediaIcons[item?.application]} {item?.application}
                      </a>
                    ))}
                  </div>
                </>
              )}
              {Object.keys(contactData).length >= 1 && (
                <>
                  <Divider className={style.divider} />
                  <div className={style.drawerBox__body__contactus}>
                    {Object.keys(contactData)?.map((key, index) => (
                      <div className={style.drawerBox__body__contactus__item} key={index}>
                        {socialMediaIcons[key]}
                        {key}:{" "}
                        {contactData?.[key]?.map((item, linkIndex) => (
                          <>
                            {key === "Address" ? (
                              `${item} - `
                            ) : (
                              <>
                                <a
                                  key={linkIndex}
                                  href={key === "Phone" ? `tel:${item}` : `mail:${item}`}
                                >
                                  {item}
                                </a>
                                {"  -"}
                              </>
                            )}
                          </>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <div className={`${style.navbar} ${opacity || style.navbarFix}`}>
          <div className={`${style.navbar__menuBox} ${style.navbar__menuBox__left}`}>
            <span
              className={style.navbar__menuBox__menuItem}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
              Menu
            </span>
          </div>
          <div className={`font_regular ${style.navbar__logo}`} onClick={() => navigate("/")}>
            Cassoni
          </div>
          <Hidden smDown>
            <div className={`${style.navbar__menuBox} ${style.navbar__menuBox__right}`}></div>
          </Hidden>
        </div>
        <Drawer anchor="left" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <Box className={style.drawerBox} role="presentation" sx={{ width: "15rem" }}>
            <div className={style.drawerBox__header}>
              <div
                className={style.drawerBox__header__close}
                onClick={() => setMobileMenuOpen(false)}
              >
                <CloseIcon fontSize="medium" />
              </div>
              <div className={style.drawerBox__header__title}>Menu</div>
            </div>
            <div className={style.drawerBox__menu}>
              <Link className={style.drawerBox__menu__menuItem} to="/">
                Home
              </Link>
              <Link className={style.drawerBox__menu__menuItem} to="/our-story">
                Our Story
              </Link>
              <span className={style.drawerBox__menu__menuItem} onClick={openInQueryModal}>
                Inquery
              </span>
              <span className={`${style.drawerBox__menu__menuItem} ${style.disabled}`}>
                Products
              </span>
              <span className={`${style.drawerBox__menu__menuItem} ${style.disabled}`}>
                Branchs
              </span>
            </div>
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navbar;
