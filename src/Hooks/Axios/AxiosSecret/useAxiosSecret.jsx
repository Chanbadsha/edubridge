import axios from "axios";

const axiosSecret = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecret = () => {
  return axiosSecret;
};

export default useAxiosSecret;
