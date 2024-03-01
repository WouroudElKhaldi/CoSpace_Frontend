import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_PATH}`,
  withCredentials: true,
});

export default axiosInstance;
