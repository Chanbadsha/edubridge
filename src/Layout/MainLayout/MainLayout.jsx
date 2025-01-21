import { Outlet } from "react-router-dom";
import HeaderNav from "../../Shared/Header/HeaderNav";
import Footer from "../../Shared/Footer/Footer";
import useAuth from "../../Hooks/useAuth";
import { Toaster } from "react-hot-toast";
import useUserData from "../../Hooks/UsersData/useUserData";
import Loader from "../../Components/Loader/Loader";

const MainLayout = () => {
  const { isDarkMode, loading } = useAuth();
  // const [isLoading] = useUserData();

  if (loading) {
    return <Loader />;
  }
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
