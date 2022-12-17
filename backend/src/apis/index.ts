import axios from "axios";

/**
 * 2022/12/17 - "movieDB" axios 인스턴스 ( 영화 / 드라마 패치 용도로 사용 ) ( 기본 URL : https://api.themoviedb.org/3 ) - by 1-blue
 */
export const movieDBInstance = axios.create({
  baseURL: process.env.MOVIE_DB_API_URL,
  withCredentials: false,
  timeout: 10000,
  headers: { "Accept-Encoding": "gzip,deflate,compress" },
});

/**
 * 2022/12/17 - "kakao" axios 인스턴스 ( 도서 패치 용도로 사용 ) ( 기본 URL : https://dapi.kakao.com ) - by 1-blue
 */
export const bookInstance = axios.create({
  baseURL: process.env.KAKAO_API_URL,
  withCredentials: false,
  timeout: 10000,
  headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
});

export { movieService } from "./moive";
export { dramaService } from "./drama";
export { apiFetchBook } from "./book";
