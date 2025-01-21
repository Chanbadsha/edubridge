import { useQuery } from "@tanstack/react-query";
import useAxiosSecret from "../Axios/AxiosSecret/useAxiosSecret";
import useAuth from "../useAuth";

const UserPendingApplication = () => {
  const axiosSecret = useAxiosSecret();
  const { user } = useAuth();
  const {
    data: getUserPendingApplication = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userPendingApplication", user.email],
    queryFn: async () => {
      const response = await axiosSecret.get(
        `/pendingApplication?email=${user.email}`
      );
      return response.data;
    },
  });
  return [getUserPendingApplication, isLoading, refetch];
};

export default UserPendingApplication;
