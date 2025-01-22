import React from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import { useQuery } from "@tanstack/react-query";

const useAllUser = () => {
  const axiosSecret = useAxiosSecret();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const response = await axiosSecret.get("/users");
      return response.data;
    },
  });

  return [users, isLoading, refetch];
};

export default useAllUser;
