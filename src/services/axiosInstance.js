import axios from "axios";
import { baseURL } from "../../utils/static";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (axiosConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
