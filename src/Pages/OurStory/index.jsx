import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Divider } from "@mui/material";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import { useEffect, useState } from "react";
import axios from "utils/axios";
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

const OurStory = () => {
  const [ourStoryData, setOurStoryData] = useState(null);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    getourStoryData();
  }, []);

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
    <div className={style.main}>
      <Navbar />
      <div className={style.container}>
        <div className={style.container__headerTitle}>Our Story</div>
        <div className={style.container__body}>
          <div dangerouslySetInnerHTML={{ __html: ourStoryData }} />
          {socialMediaData.length >= 1 && (
            <>
              <Divider className={style.divider} />
              <div className={style.container__body__socialMedia}>
                {socialMediaData?.map((item, index) => (
                  <a
                    className={style.container__body__socialMedia__item}
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
              <div className={style.container__body__contactus}>
                {Object.keys(contactData)?.map((key, index) => (
                  <div className={style.container__body__contactus__item} key={index}>
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
      </div>
      <Footer />
    </div>
  );
};

export default OurStory;
