import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";
import useUserData from "../Hooks/UsersData/useUserData";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const userInfo = useUserData();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user || userInfo.role === "Moderator") {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default ModeratorRoute;
