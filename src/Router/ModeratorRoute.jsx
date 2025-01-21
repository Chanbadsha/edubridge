import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";
import useUserData from "../Hooks/UsersData/useUserData";

const ModeratorRoute = ({ children }) => {
  const { user, loading, userLogOut } = useAuth();
  const [usersInfo, isLoading] = useUserData();
  const location = useLocation();
  if (loading || isLoading) {
    return <Loader />;
  }
  if (!user || usersInfo?.role !== "Moderator") {
    userLogOut();
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default ModeratorRoute;
