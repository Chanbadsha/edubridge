import AboutUs from "../../About/AboutUs";
import NewsLetter from "../../About/NewsLetter";
import ChooseUs from "../ChooseUs/ChooseUs";
import Hero from "../Hero/Hero";
import TopScholarShip from "../TopScholarship/TopScholarShip";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopScholarShip />
      <ChooseUs />
      <AboutUs />
      <NewsLetter />
    </div>
  );
};

export default Home;
