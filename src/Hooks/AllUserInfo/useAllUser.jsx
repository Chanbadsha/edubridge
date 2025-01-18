import React from "react";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import { useQuery } from "@tanstack/react-query";

const useAllUser = () => {
  const axiosSecret = useAxiosSecret();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["usersCollection"],
    queryFn: async () => {
      const response = await axiosSecret.get("/user");
      return response.data;
    },
  });

  return [users, refetch];
};

export default useAllUser;
