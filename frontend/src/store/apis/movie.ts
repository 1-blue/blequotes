import { serverInstance } from ".";

// type
import type {
  FetchMoviesRequest,
  FetchMoviesResponse,
  SearchMoviesRequest,
  SearchMoviesResponse,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
} from "../types";

/**
 * 2022/12/17 - 인기 / 최신 / 꾸준한 인기 영화들 요청 - by 1-blue
 * @param category 인기, 최신, 꾸준한 인기 등
 * @param language 언어
 * @returns 인기 / 최신 / 꾸준한 인기 영화들
 */
const apiFetchMovies = async ({
  category,
  language = "ko-kr",
}: FetchMoviesRequest) =>
  await serverInstance.get<FetchMoviesResponse>(`/api/movie`, {
    params: { category, language },
  });

/**
 * 2022/12/17 - 영화 검색 요청 - by 1-blue
 * @param title 영화 제목
 * @returns 검색된 영화
 */
const apiSearchMovies = async ({
  title,
  language = "ko-kr",
}: SearchMoviesRequest) =>
  await serverInstance.get<SearchMoviesResponse>(`/api/movie/search`, {
    params: { title, language },
  });

/**
 * 2022/12/17 - 추천 영화 검색어 요청 - by 1-blue
 * @param title 영화 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 영화 검색어들
 */
const apiSuggestedMovies = async ({
  keyword,
  language = "ko-kr",
}: SuggestMoviesRequest) =>
  await serverInstance.get<SuggestMoviesResponse>(`/api/movie/suggested`, {
    params: { keyword, language },
  });

/**
 * 2022/12/17 - 유사 영화들 요청 - by 1-blue
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @returns 유사한 영화들
 */
const apiSimilarMovies = async ({
  movieId,
  language = "ko-kr",
}: SimilarMoviesRequest) =>
  await serverInstance.get<SimilarMoviesResponse>(`/api/movie/similar`, {
    params: { movieId, language },
  });

/**
 * 2022/12/17 - 영화 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const movieApiService = {
  apiFetchMovies,
  apiSearchMovies,
  apiSuggestedMovies,
  apiSimilarMovies,
};
