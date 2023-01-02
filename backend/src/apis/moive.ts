import { movieDBInstance } from ".";

// type
import type {
  ApiFetchMoviesRequest,
  ApiFetchMoviesResponse,
  ApiSearchMoviesRequest,
  ApiSearchMoviesResponse,
  ApiSuggestMoviesRequest,
  ApiSuggestMoviesResponse,
  ApiSimilarMoviesRequest,
  ApiSimilarMoviesResponse,
  ApiDetailMovieRequest,
  ApiDetailMovieResponse,
} from "../types";

/**
 * 2022/12/17 - 특정 카테고리의 영화들 요청 - by 1-blue
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 영화들
 */
const apiFetchMovies = async ({
  category,
  language = "ko-kr",
}: ApiFetchMoviesRequest) =>
  await movieDBInstance.get<ApiFetchMoviesResponse>(`/movie/${category}`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/17 - 영화들 검색 요청 - by 1-blue
 * @param title 영화 제목
 * @returns 검색된 영화들
 */
const apiSearchMovies = async ({
  title,
  language = "ko-kr",
}: ApiSearchMoviesRequest) =>
  await movieDBInstance.get<ApiSearchMoviesResponse>(`/search/movie`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: title, language },
  });

/**
 * 2022/12/17 - 영화 추천 검색어들 요청 - by 1-blue
 * @param title 영화 제목 ( 전체 or 일부분 )
 * @returns 영화 추천 검색어들
 */
const apiSuggestedMovies = async ({
  keyword,
  language = "ko-kr",
}: ApiSuggestMoviesRequest) =>
  await movieDBInstance.get<ApiSuggestMoviesResponse>(`/search/movie`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: keyword, language },
  });

/**
 * 2022/12/17 - 유사한 영화들 요청 - by 1-blue
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @returns 유사한 영화들
 */
const apiSimilarMovies = async ({
  movieIdx,
  language = "ko-kr",
}: ApiSimilarMoviesRequest) =>
  await movieDBInstance.get<ApiSimilarMoviesResponse>(
    `/movie/${movieIdx}/similar`,
    { params: { api_key: process.env.MOVIE_DB_API_KEY, language } }
  );

/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 - by 1-blue
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @returns 특정 영화 상세 정보
 */
const apiDetailMovie = async ({
  movieIdx,
  language = "ko-kr",
}: ApiDetailMovieRequest) =>
  await movieDBInstance.get<ApiDetailMovieResponse>(`/movie/${movieIdx}`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/17 - 영화 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const movieService = {
  apiFetchMovies,
  apiSearchMovies,
  apiSuggestedMovies,
  apiSimilarMovies,
  apiDetailMovie,
};
