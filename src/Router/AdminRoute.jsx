import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
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

export default AdminRoute;
