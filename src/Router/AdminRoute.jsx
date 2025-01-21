import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuth from "../Hooks/useAuth";
import useUserData from "../Hooks/UsersData/useUserData";

const AdminRoute = ({ children }) => {
  const { user, loading, userLogOut } = useAuth();
  const [usersInfo, isLoading] = useUserData();
  const location = useLocation();
  if (loading || isLoading) {
    return <Loader />;
  }
  if (!user || usersInfo?.role !== "Admin") {
    userLogOut();
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default AdminRoute;
