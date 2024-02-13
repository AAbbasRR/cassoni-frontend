import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Footer from "Layouts/Footer";
import Navbar from "Layouts/Navbar";
import { useRef, useState, useEffect } from "react";
import axios from "utils/axios";
import style from "./style.module.scss";

const Home = () => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [mainVideo, setMainVideo] = useState(null);

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
      <div className={style.emptyBody}></div>
      <Footer />
    </div>
  );
};

export default Home;
