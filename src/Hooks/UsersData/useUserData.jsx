import { useState, useEffect } from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../useAuth";
import Loader from "../../Components/Loader/Loader";

const useUserData = () => {
  const { user, loading } = useAuth();
  const [userInfo, setUserInfo] = useState({});
  const axiosSecret = useAxiosSecret();

  useEffect(() => {
    if (!loading && user?.email) {
      const fetchUserData = async () => {
        try {
          const response = await axiosSecret.get(`/users?email=${user.email}`);
          setUserInfo(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [loading, user, axiosSecret]);

  if (loading) {
    return <Loader />;
  }

  return userInfo;
};

export default useUserData;
