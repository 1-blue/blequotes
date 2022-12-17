import axios from "axios";

/**
 * 2022/12/17 - 구현한 백엔드에 API 요청하는 axios 인스턴스 ( 프록시 서버로 사용 ( 보안키를 숨기기 위해서 사용 ) ) ( 기본 URL : 개발용 => http://localhost:3050 ) - by 1-blue
 */
export const serverInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 4000,
});

export { movieApiService } from "./movie";
export { dramaApiService } from "./drama";

export { apiSearchBook } from "./book";
