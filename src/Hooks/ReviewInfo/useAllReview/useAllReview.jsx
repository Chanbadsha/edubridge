import React from "react";
import useAxiosSecret from "../../Axios/AxiosSecret/useAxiosSecret";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../useAuth";
import Loader from "../../../Components/Loader/Loader";

const useAllReview = () => {
  const axiosSecret = useAxiosSecret();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  const {
    data: AllReview = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllReview", user?.email],
    queryFn: async () => {
      const response = await axiosSecret.get("/getReview");
      return response.data;
    },
  });
  return [AllReview, isLoading, refetch];
};

export default useAllReview;
