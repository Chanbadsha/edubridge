import { Outlet } from "react-router-dom";
import HeaderNav from "../../Shared/Header/HeaderNav";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <HeaderNav />
      <div className="min-h-[calc(100vh-292px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
