import React from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../useAuth";
import Loader from "../../Components/Loader/Loader";

const useUserData = () => {
  const { user, loading } = useAuth();
  const axiosSecret = useAxiosSecret();
  if (loading) {
    return <Loader />;
  }
  const users = async () => {
    const response = await axiosSecret.get(`/users?email=${user.email}`);
    console.log(response.data);
    return response.data;
  };
  return [users];
};

export default useUserData;
