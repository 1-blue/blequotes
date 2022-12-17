// type
import type { ApiResponse } from ".";

/**
 * 2022/12/05 - 요청할 영화 카테고리 ( 인기, 현재 상영 등 ) - by 1-blue
 */
type MovieCategory = "popular" | "top_rated" | "now_playing";

/**
 * 2022/12/05 - 영화 언어 - by 1-blue
 */
type MovieLanguage = "ko-kr" | "en-us";

/**
 * 2022/12/05 - 영화 타입 - by 1-blue
 */
export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

// ============================== 인기 / 최신 / 꾸준한 인기 영화들 관련 ==============================
/**
 * 2022/12/17 - 인기 / 현재 상영중 / 꾸준한 인기 영화들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type FetchMoviesRequest = {
  category: MovieCategory;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 인기 / 현재 상영중 / 꾸준한 인기 영화들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type FetchMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 영화 검색 관련 ==============================
/**
 * 2022/12/17 - 영화들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SearchMoviesRequest = {
  title: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 영화들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 영화 추천 검색어 관련 ==============================
/**
 * 2022/12/17 - 영화들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestMoviesRequest = {
  keyword: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 영화들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 * >>> 오늘(12/17)에 나중에 필요한 것만 가져가도록 수정하기
 */
export type SuggestMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 현재 검색된 영화와 유사한 영화들 관련 ==============================
/**
 * 2022/12/17 - 유사 영화 검색어 검색 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarMoviesRequest = {
  movieId: number;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 유사 영화 검색어 검색 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarMoviesResponse = ApiResponse<{ movies: Movie[] }>;
