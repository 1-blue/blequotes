import axios from "axios";

/**
 * 2022/12/05 - 영화 관련 axios 인스턴스 ( 기본 URL : https://api.themoviedb.org/3/movie ) - by 1-blue
 */
const movieInstance = axios.create({
  baseURL: process.env.REACT_APP_MOVIE_API_URL,
  withCredentials: false,
  timeout: 10000,
});

export { movieInstance };

export { apiFetchMovie } from "./movie";
