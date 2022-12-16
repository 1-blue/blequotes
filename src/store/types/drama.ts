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
 * 2022/12/15 - 드라마 송신 타입 - by 1-blue
 */
export type FetchDrama = {
  category: DramaCategory;
  language?: DramaLanguage;
};
/**
 * 2022/12/15 - 드라마 수신 타입 - by 1-blue
 */
export type ReceiveDrama = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Drama[];
};

/**
 * 2022/12/15 - 드라마 검색 송신 타입 - by 1-blue
 */
export type SearchDramaRequest = {
  title: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/15 - 드라마 검색 수신 타입 - by 1-blue
 */
export type SearchDramaResponse = ReceiveDrama;

/**
 * 2022/12/13 - 추천 드라마 검색어 검색 송신 타입 - by 1-blue
 */
export type SuggestDramaRequest = {
  keyword: string;
  language?: DramaLanguage;
};
/**
 * 2022/12/15 - 추천 드라마 검색어 검색 수신 타입 - by 1-blue
 */
export type SuggestDramaResponse = ReceiveDrama;

/**
 * 2022/12/15 - 유사 드라마 검색어 검색 송신 타입 - by 1-blue
 */
export type SimilarDramaRequest = {
  dramaId: number;
  language?: DramaLanguage;
};
/**
 * 2022/12/15 - 유사 드라마 검색어 검색 수신 타입 - by 1-blue
 */
export type SimilarDramaResponse = ReceiveDrama;
