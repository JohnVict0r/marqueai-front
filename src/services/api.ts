import axios from "axios";
import { getAuthToken } from "../utils/authentication";

const api = axios.create({
  //baseURL: "http://localhost/api",
  baseURL: "http://ec2-3-82-22-28.compute-1.amazonaws.com/api",
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
