import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";

const Hero = () => {
  const [sliderData, setSliderData] = useState([]);
  useEffect(() => {
    axios.get("/slider.json").then(({ data }) => {
      setSliderData(data);
    });
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData.map((slider, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero min-h-[60vh] md:min-h-[700px]"
              style={{
                backgroundImage: `url(${slider.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center px-4">
                <div className="max-w-5xl mx-auto">
                  <h1 className="mb-5 text-xl md:text-3xl xl:text-5xl font-bold">
                    {slider.title}
                  </h1>
                  <p className="mb-5 text-base md:text-lg">{slider.subtitle}</p>
                  <Link
                    to={slider.cta_url}
                    className="btn bg-accentLight border-none hover:bg-accentBlack text-textLight font-bold text-sm md:text-xl hover:text-textBlack btn-primary"
                  >
                    {slider.cta_text}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
