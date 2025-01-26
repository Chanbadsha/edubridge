import React from "react";
import AboutUs from "./AboutUs";
import ChooseUs from "../HomePage/ChooseUs/ChooseUs";
import NewsLetter from "./NewsLetter";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>Edubrige || About</title>
      </Helmet>
      <AboutUs />
      <ChooseUs />
      <NewsLetter />
    </div>
  );
};

export default AboutPage;
