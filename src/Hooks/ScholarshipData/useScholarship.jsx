import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Axios/AxiosPublic/useAxiosPublic";
import axios from "axios";

const useScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const response = await axiosPublic.get("/scholarships");
      return response.data;
    },
  });
  return [scholarships, refetch];
};

export default useScholarship;
