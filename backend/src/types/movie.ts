// "frontend/src/store/types"와 유사한 타입들

// type
import type { ApiResponse } from ".";

/**
 * 2022/12/17 - 요청할 영화 카테고리 ( 인기, 현재 상영 등 ) - by 1-blue
 */
type MovieCategory = "popular" | "top_rated" | "now_playing";

/**
 * 2022/12/17 - 영화 언어 - by 1-blue
 */
type MovieLanguage = "ko-kr" | "en-us";

/**
 * 2022/12/17 - 영화 타입 - by 1-blue
 */
type Movie = {
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
/**
 * 2022/12/17 - 일반적으로 영화 요청 api 송신 타입 ( by "MovieDB" ) - by 1-blue
 */
type ReceiveMovie = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

/**
 * 2022/12/31 - 영화 상세 타입 - by 1-blue
 */
type DetailMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// ============================== 인기 / 최신 / 꾸준한 인기 영화들 관련 ==============================
/**
 * 2022/12/17 - 인기 / 최신 / 꾸준한 인기 영화들 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiFetchMoviesRequest = {
  category: MovieCategory;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 인기 / 최신 / 꾸준한 인기 영화들 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiFetchMoviesResponse = ReceiveMovie;
/**
 * 2022/12/17 - 인기 / 현재 상영중 / 꾸준한 인기 영화들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type FetchMoviesRequest = ApiFetchMoviesRequest;
/**
 * 2022/12/17 - 인기 / 현재 상영중 / 꾸준한 인기 영화들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type FetchMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 영화 검색 관련 ==============================
/**
 * 2022/12/17 - 영화들 검색 api 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSearchMoviesRequest = {
  title: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 영화들 검색 api 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSearchMoviesResponse = ReceiveMovie;
/**
 * 2022/12/17 - 영화들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SearchMoviesRequest = ApiSearchMoviesRequest;
/**
 * 2022/12/17 - 영화들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 영화 추천 검색어 관련 ==============================
/**
 * 2022/12/17 - 추천 영화 검색어 검색 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSuggestMoviesRequest = {
  keyword: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 추천 영화 검색어 검색 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSuggestMoviesResponse = ReceiveMovie;
/**
 * 2022/12/17 - 영화들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestMoviesRequest = ApiSuggestMoviesRequest;
/**
 * 2022/12/17 - 영화들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestMoviesResponse = ApiResponse<{ titles: string[] }>;

// ============================== 현재 검색된 영화와 유사한 영화들 관련 ==============================
/**
 * 2022/12/17 - 유사 영화 검색어 검색 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiSimilarMoviesRequest = {
  movieIdx: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/17 - 유사 영화 검색어 검색 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiSimilarMoviesResponse = ReceiveMovie;
/**
 * 2022/12/17 - 유사 영화 검색어 검색 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarMoviesRequest = ApiSimilarMoviesRequest;
/**
 * 2022/12/17 - 유사 영화 검색어 검색 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarMoviesResponse = ApiResponse<{ movies: Movie[] }>;

// ============================== 특정 영화 상세 정보 요청 관련 ==============================
/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 송신 타입 ( B -> "MovieDB" ) - by 1-blue
 */
export type ApiDetailMovieRequest = {
  movieIdx: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 수신 타입 ( "MovieDB" -> B ) - by 1-blue
 */
export type ApiDetailMovieResponse = DetailMovie;
/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type DetailMovieRequest = ApiDetailMovieRequest;
/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type DetailMovieResponse = ApiResponse<{ movie: DetailMovie }>;
