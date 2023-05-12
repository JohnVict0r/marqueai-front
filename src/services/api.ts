import axios from "axios";
import { getAuthToken } from "../utils/authentication";

const api = axios.create({
  //baseURL: "http://localhost/api",
  baseURL: "http://api.marqueai.com.br/api",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  const headers = { ...config.headers };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
