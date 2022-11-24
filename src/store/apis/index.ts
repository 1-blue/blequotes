import axios from "axios";

const axiosInstance = axios.create({
  // 기본 URL : https://jsonplaceholder.typicode.com
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;

export { apiFetchUser } from "./user";
