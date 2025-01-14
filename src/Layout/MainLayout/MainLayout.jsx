import { Outlet } from "react-router-dom";
import HeaderNav from "../../Shared/Header/HeaderNav";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <HeaderNav />
      <div className="mt-[82px] min-h-[calc(100vh-306px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
