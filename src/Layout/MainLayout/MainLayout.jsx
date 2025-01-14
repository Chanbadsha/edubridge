import { Outlet } from "react-router-dom";
import HeaderNav from "../../Shared/Header/HeaderNav";
import Footer from "../../Shared/Footer/Footer";
import useAuth from "../../Hooks/useAuth";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const { isDarkMode } = useAuth();
  return (
    <div>
      <HeaderNav />
      <Toaster></Toaster>
      <div
        className={`mt-[82px] min-h-[calc(100vh-306px)] ${
          isDarkMode
            ? "bg-gray-900 text-textBlack"
            : "bg-[#dcdde1] text-textLight"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
