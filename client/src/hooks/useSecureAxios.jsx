import axios from "axios";
import { useMemo } from "react";

const useSecureAxios = () => {
  const instance = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: "https://nexira-server.vercel.app",
    });

    axiosInstance.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    });

    return axiosInstance;
  }, []);

  return instance;
};

export default useSecureAxios;
