import axios from "axios";

const instance = axios.create({
  baseURL: "https://nexira-server.shyabid.com/",
});

const usePublicAxios = () => {
  return instance;
};

export default usePublicAxios;
