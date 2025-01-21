import React from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../useAuth";
import { useQuery } from "@tanstack/react-query";

const PendingApplication = () => {
  const axiosSecret = useAxiosSecret();
  const { user } = useAuth();
  const {
    data: getAllPendingApplication = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pendingApplication", user.email],
    queryFn: async () => {
      const response = await axiosSecret.get("/pendingApplication");
      return response.data;
    },
  });
  return [getAllPendingApplication, isLoading, refetch];
};

export default PendingApplication;
