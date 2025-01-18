import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default ModeratorRoute;
