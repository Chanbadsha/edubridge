import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../useAuth";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";

const useApplicationInfo = () => {
  const axiosSecret = useAxiosSecret();
  const { user } = useAuth();
  const {
    data: applicationList = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applicationList", user.email],
    queryFn: async () => {
      const response = await axiosSecret.get(
        `/applications?email=${user.email}`
      );
      return response.data;
    },
  });

  return [applicationList, isLoading, refetch];
};

export default useApplicationInfo;
