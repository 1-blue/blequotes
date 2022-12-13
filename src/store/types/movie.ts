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
 * 2022/12/05 - 영화 송신 타입 - by 1-blue
 */
export type FetchMoive = {
  category: MovieCategory;
  language?: MovieLanguage;
};
/**
 * 2022/12/05 - 영화 수신 타입 - by 1-blue
 */
export type ReceiveMoive = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
};

/**
 * 2022/12/07 - 영화 검색 송신 타입 - by 1-blue
 */
export type SearchMoiveRequest = {
  title: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/07 - 영화 검색 수신 타입 - by 1-blue
 */
export type SearchMoiveResponse = ReceiveMoive;

/**
 * 2022/12/13 - 추천 영화 검색어 검색 송신 타입 - by 1-blue
 */
export type SuggestMoiveRequest = {
  keyword: string;
  language?: MovieLanguage;
};
/**
 * 2022/12/13 - 추천 영화 검색어 검색 수신 타입 - by 1-blue
 */
export type SuggestMoiveResponse = ReceiveMoive;
