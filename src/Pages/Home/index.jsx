import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import Grid from "@mui/material/Grid";
import { useRef, useState, useEffect } from "react";
import axios from "utils/axios";
import style from "./style.module.scss";

const Home = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [mainVideo, setMainVideo] = useState(null);
  const [gridImages, setGridImage] = useState([]);

  useEffect(() => {
    getourStoryData();
    const video = videoRef.current;

    if (video && video.paused) {
      video.play();
    }
  }, []);

  const getourStoryData = () => {
    axios.get("public/settings/video/list/").then((res) => {
      setMainVideo(res.data.results?.[0]);
    });
    axios.get("public/settings/image/list/").then((res) => {
      setGridImage(res.data.results);
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
        {mainVideo?.video ? (
          <>
            <div className={style.videoPlayerBox}>
              <video
                ref={videoRef}
                preLoad
                playsInline
                autoPlay
                muted
                style={mainVideo?.filter_bw ? { filter: "grayscale(100%) brightness(30%)" } : {}}
              >
                <source src={mainVideo?.video} type="video/mp4" />
              </video>
              <div className={style.videoPlayerBox__controller}>
                <div className={style.iconPlayPause} onClick={handleTogglePlay}>
                  {isPlaying ? (
                    <PauseIcon className={style.icon} />
                  ) : (
                    <PlayArrowIcon className={style.icon} />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Grid container spacing={3} className={style.gridImage}>
        {gridImages?.map((node, index) => (
          <Grid className={style.gridImage__item} item xs={12} md={4} xl={3} key={index}>
            <img
              className={style.gridImageContainer__item__img}
              src={node?.image}
              alt={node?.alt}
            />
            <h6 className={`font_light ${style.gridImage__item__caption}`}>{node?.caption}</h6>
          </Grid>
        ))}
      </Grid>
      <div className={style.emptyBody}></div>
      <Footer />
    </div>
  );
};

export default Home;
