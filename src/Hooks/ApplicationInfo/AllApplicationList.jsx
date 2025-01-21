import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";

const AllApplicationList = () => {
  const axiosSecret = useAxiosSecret();
  const { user } = useAuth();

  const {
    data: getAllApplication = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getAllApplication", user?.email],
    queryFn: async () => {
      const response = await axiosSecret.get(`/applications`);
      return response.data;
    },
  });
  return [getAllApplication, isLoading, refetch];
};

export default AllApplicationList;
