import axios from "axios";

const instance = axios.create({
  baseURL: "https://nexira-server.vercel.app",
});

const usePublicAxios = () => {
  return instance;
};

export default usePublicAxios;
