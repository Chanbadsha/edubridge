import axios from "axios";

const axiosSecret = axios.create({
  // baseURL: "https://edu-bridge-server.vercel.app",
  baseURL: "http://localhost:5000",
});
const useAxiosSecret = () => {
  return axiosSecret;
};

export default useAxiosSecret;
