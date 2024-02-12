import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";
import OurStory from "./OurStory";

const Pages = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/our-story" element={<OurStory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
