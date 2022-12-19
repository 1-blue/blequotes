// type
import type { ApiResponse } from ".";

/**
 * 2022/12/15 - 요청할 드라마 카테고리 ( 인기, 현재 상영 등 ) - by 1-blue
 */
type DramaCategory = "popular" | "top_rated" | "on_the_air";

/**
 * 2022/12/15 - 드라마 언어 - by 1-blue
 */
type DramaLanguage = "ko-kr" | "en-us";

/**
 * 2022/12/15 - 드라마 타입 - by 1-blue
 */
export type Drama = {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

// ============================== 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 관련 ==============================
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type FetchDramasRequest = {
  category: DramaCategory;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type FetchDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 드라마 검색 관련 ==============================
/**
 * 2022/12/17 - 드라마들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SearchDramasRequest = {
  title: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 드라마들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 드라마 추천 검색어 관련 ==============================
/**
 * 2022/12/17 - 드라마들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestDramasRequest = {
  keyword: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 드라마들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestDramasResponse = ApiResponse<{ titles: string[] }>;

// ============================== 현재 검색된 드라마와 유사한 드라마들 관련 ==============================
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarDramasRequest = {
  dramaId: number;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarDramasResponse = ApiResponse<{ dramas: Drama[] }>;
