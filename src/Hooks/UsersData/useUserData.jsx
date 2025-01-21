import { useState, useEffect } from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../useAuth";
import Loader from "../../Components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  const { user, loading } = useAuth();
  // const [userInfo, setUserInfo] = useState({});
  const axiosSecret = useAxiosSecret();
  if (loading) {
    return <Loader />;
  }

  const {
    data: usersInfo = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersInfo", user?.email],
    queryFn: async () => {
      const response = await axiosSecret.get(`/users?email=${user?.email}`);
      return response.data;
    },
  });
  // useEffect(() => {
  //   if (!loading && user?.email) {
  //     const fetchUserData = async () => {
  //       try {
  //         const response = await axiosSecret.get(`/users?email=${user.email}`);
  //         setUserInfo(response.data);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchUserData();
  //   }
  // }, [loading, user, axiosSecret]);

  return [usersInfo, isLoading, refetch];
};

export default useUserData;
