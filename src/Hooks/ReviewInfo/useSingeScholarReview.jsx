import React from "react";
import useAxiosSecret from "../../Hooks/Axios/AxiosSecret/useAxiosSecret";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
// import useAuth from "../../useAuth";
// import Loader from "../../../Components/Loader/Loader";

const useSingeScholarReview = (id) => {
  const axiosSecret = useAxiosSecret();
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  const {
    data: singleScholarshipReview = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["singleScholarshipReview", user?.email],
    queryFn: async () => {
      const response = await axiosSecret.get(`/getReviews/${id}`);
      return response.data;
    },
  });
  return [singleScholarshipReview, isLoading, refetch];
};

export default useSingeScholarReview;
