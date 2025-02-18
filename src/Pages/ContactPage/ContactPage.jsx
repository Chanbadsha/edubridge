import React from "react";
import Contact from "./Contact";
import NewsLetter from "../About/NewsLetter";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <div>
          <Helmet>
        <title>Edubrige || Contact</title>
      </Helmet>
      <Contact />
      <NewsLetter />
    </div>
  );
};

export default ContactPage;
