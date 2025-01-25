import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../useAuth";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import Loader from "../../Components/Loader/Loader";

const singleApplication = (id) => {
  const axiosSecret = useAxiosSecret();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  const userInfo = {
    email: user.email,
    id: id,
  };
  // console.log(user.email);
  const {
    data: singleApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleApplications", user.email],
    queryFn: async () => {
      const response = await axiosSecret.get(`/SingleApplication`, {
        params: userInfo, // userInfo as query parameters
      });

      return response.data;
    },
  });

  return [singleApplications, isLoading, refetch];
};

export default singleApplication;
