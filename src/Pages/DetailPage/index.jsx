import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "utils/axios";
import style from "./style.module.scss";

const DetaipPage = () => {
  const { slug } = useParams();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPageDetailData();
    const video = videoRef.current;

    if (video && video.paused) {
      video.play();
    }
  }, [slug]);

  const getPageDetailData = () => {
    axios.get(`public/settings/image/detail/${slug}/`).then((res) => {
      setData({
        ...res.data,
        main_image_content: res.data.main_image_content.replace(
          /src="\/media/g,
          `src="${process.env.REACT_APP_BACKEND_BASE_URL}/media`
        ),
        content: res.data.content.replace(
          /src="\/media/g,
          `src="${process.env.REACT_APP_BACKEND_BASE_URL}/media`
        ),
      });
    });
  };

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={style.main}>
      <Navbar opacity />
      <div className={style.headerBox}>
        {data?.main_video ? (
          <>
            <div className={style.videoPlayerBox}>
              <video
                ref={videoRef}
                preLoad
                playsInline
                autoPlay
                muted
                style={data?.filter_bw ? { filter: "grayscale(100%) brightness(30%)" } : {}}
              >
                <source src={data?.main_video} type="video/mp4" />
              </video>
              <div className={style.videoPlayerBox__controller}>
                <div className={style.iconPlayPause} onClick={handleTogglePlay}>
                  {isPlaying ? (
                    <PauseIcon className={style.icon} />
                  ) : (
                    <PlayArrowIcon className={style.icon} />
                  )}
                </div>
                <div
                  className={style.scrollComponent}
                  onClick={() => {
                    window.scrollTo({
                      top: document.documentElement.scrollHeight,
                      behavior: "smooth",
                    });
                  }}
                >
                  <div className={`font_light ${style.scrollComponent__title}`}>
                    Scroll to Discover
                  </div>
                  <div className={style.scrollComponent__animation}></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className={style.container}>
        <div className={style.mainImage}>
          <img className={style.mainImage__img} src={data?.main_image} alt={data?.main_image_alt} />
          <div className={style.mainImage__contentBox}>
            <div
              className={style.mainImage__contentBox__content}
              dangerouslySetInnerHTML={{ __html: data?.main_image_content }}
            />
          </div>
        </div>
        <div className={style.content}>
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        </div>
      </div>
      <div className={style.emptyBody}></div>
      <Footer />
    </div>
  );
};

export default DetaipPage;
