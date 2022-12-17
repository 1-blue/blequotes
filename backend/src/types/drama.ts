// "frontend/src/store/types"와 유사한 타입들

// type
import type { ApiResponse } from ".";

/**
 * 2022/12/17 - 요청할 드라마 카테고리 ( 인기, 현재 상영 등 ) - by 1-blue
 */
type DramaCategory = "popular" | "top_rated" | "on_the_air";

/**
 * 2022/12/17 - 드라마 언어 - by 1-blue
 */
type DramaLanguage = "ko-kr" | "en-us";

/**
 * 2022/12/17 - 드라마 타입 - by 1-blue
 */
type Drama = {
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
/**
 * 2022/12/17 - 일반적으로 드라마 요청 api 송신 타입 ( by "MovieDB" ) - by 1-blue
 */
type ReceiveDrama = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Drama[];
};

// ============================== 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 관련 ==============================
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiFetchDramasRequest = {
  category: DramaCategory;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiFetchDramasResponse = ReceiveDrama;
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type FetchDramasRequest = ApiFetchDramasRequest;
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type FetchDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 드라마 검색 관련 ==============================
/**
 * 2022/12/17 - 드라마들 검색 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSearchDramasRequest = {
  title: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 드라마들 검색 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSearchDramasResponse = ReceiveDrama;
/**
 * 2022/12/17 - 드라마들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SearchDramasRequest = ApiSearchDramasRequest;
/**
 * 2022/12/17 - 드라마들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 드라마 추천 검색어 관련 ==============================
/**
 * 2022/12/17 - 추천 드라마 검색어 검색 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSuggestDramasRequest = {
  keyword: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 추천 드라마 검색어 검색 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSuggestDramasResponse = ReceiveDrama;
/**
 * 2022/12/17 - 드라마들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestDramasRequest = ApiSuggestDramasRequest;
/**
 * 2022/12/17 - 드라마들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 * >>> 오늘(12/17)에 나중에 필요한 것만 가져가도록 수정하기
 */
export type SuggestDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 현재 검색된 드라마와 유사한 드라마들 관련 ==============================
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSimilarDramasRequest = {
  dramaId: number;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSimilarDramasResponse = ReceiveDrama;
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarDramasRequest = ApiSimilarDramasRequest;
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarDramasResponse = ApiResponse<{ dramas: Drama[] }>;
