import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2004",
  withCredentials: true,
});

export default axiosInstance;
