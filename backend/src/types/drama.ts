// "frontend/src/store/types"와 유사한 타입들

// type
import type { AxiosResponse } from "axios";
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

/**
 * 2022/12/31 - 드라마 상세 정보 타입 - by 1-blue
 */
type DetailDrama = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air: null | string;
  networks: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

// ============================== 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 관련 ==============================
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
type ApiFetchDramasRequest = {
  category: DramaCategory;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
type ApiFetchDramasResponse = ReceiveDrama;
/**
 * 2023/02/04 - 인기 / 꾸준한 / 현재 방영중인 인기 드라마들 API 요청 함수 시그니처 ( "MovieDB" ) - by 1-blue
 */
export type ApiFetchDramasHandler = (
  body: ApiFetchDramasRequest
) => Promise<AxiosResponse<ApiFetchDramasResponse, any>>;

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
type ApiSearchDramasRequest = {
  title: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 드라마들 검색 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
type ApiSearchDramasResponse = ReceiveDrama;
/**
 * 2023/02/04 - 드라마들 검색 API 요청 함수 시그니처 ( "MovieDB" ) - by 1-blue
 */
export type ApiSearchDramasHandler = (
  body: ApiSearchDramasRequest
) => Promise<AxiosResponse<ApiSearchDramasResponse, any>>;

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
 * 2022/12/17 - 추천 드라마 검색어들 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
type ApiSuggestDramasRequest = {
  keyword: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 추천 드라마 검색어들 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
type ApiSuggestDramasResponse = ReceiveDrama;
/**
 * 2023/02/04 - 추천 드라마 검색어들 API 요청 함수 시그니처 ( "MovieDB" ) - by 1-blue
 */
export type ApiSuggestDramasHandler = (
  body: ApiSuggestDramasRequest
) => Promise<AxiosResponse<ApiSuggestDramasResponse, any>>;

/**
 * 2022/12/17 - 추천 드라마들 검색어 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestDramasRequest = ApiSuggestDramasRequest;
/**
 * 2022/12/17 - 추천 드라마들 검색어 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestDramasResponse = ApiResponse<{ titles: string[] }>;

// ============================== 현재 검색된 드라마와 유사한 드라마들 관련 ==============================
/**
 * 2022/12/17 - 유사 드라마 검색어들 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
type ApiSimilarDramasRequest = {
  dramaIdx: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/17 - 유사 드라마 검색어들 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
type ApiSimilarDramasResponse = ReceiveDrama;
/**
 * 2023/02/04 - 유사 드라마 검색어들 API 요청 함수 시그니처 ( "MovieDB" ) - by 1-blue
 */
export type ApiSimilarDramasHandler = (
  body: ApiSimilarDramasRequest
) => Promise<AxiosResponse<ApiSimilarDramasResponse, any>>;

/**
 * 2022/12/17 - 유사 드라마 검색어 검색 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarDramasRequest = ApiSimilarDramasRequest;
/**
 * 2022/12/17 - 유사 드라마 검색어 검색 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarDramasResponse = ApiResponse<{ dramas: Drama[] }>;

// ============================== 특정 드라마 상세 정보 요청 관련 ==============================
/**
 * 2022/12/31 - 특정 드라마 상세 정보 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
type ApiDetailDramaRequest = {
  dramaIdx: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/31 - 특정 드라마 상세 정보 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
type ApiDetailDramaResponse = DetailDrama;
/**
 * 2023/02/04 - 특정 드라마 상세 정보 API 요청 함수 시그니처 ( "MovieDB" ) - by 1-blue
 */
export type ApiDetailDramaHandler = (
  body: ApiDetailDramaRequest
) => Promise<AxiosResponse<ApiDetailDramaResponse, any>>;

/**
 * 2022/12/31 - 특정 드라마 상세 정보 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type DetailDramaRequest = ApiDetailDramaRequest;
/**
 * 2022/12/31 - 특정 드라마 상세 정보 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type DetailDramaResponse = ApiResponse<{ drama: DetailDrama }>;
