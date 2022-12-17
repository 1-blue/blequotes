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
  await movieDBInstance.get<ApiFetchMoviesResponse>(
    `/movie/${category}?api_key=${process.env.MOVIE_DB_API_KEY}&language=${language}`
  );

/**
 * 2022/12/17 - 영화 검색 요청 - by 1-blue
 * @param title 영화 제목
 * @returns 검색된 영화
 */
const apiSaerchMovies = async ({
  title,
  language = "ko-kr",
}: ApiSearchMoviesRequest) =>
  await movieDBInstance.get<ApiSearchMoviesResponse>(
    `/search/movie?api_key=${
      process.env.MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(title)}`
  );

/**
 * 2022/12/17 - 추천 영화 검색어 요청 - by 1-blue
 * @param title 영화 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 영화 검색어들
 */
const apiSuggestedMovies = async ({
  keyword,
  language = "ko-kr",
}: ApiSuggestMoviesRequest) =>
  await movieDBInstance.get<ApiSuggestMoviesResponse>(
    `/search/movie?api_key=${
      process.env.MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(keyword)}`
  );

/**
 * 2022/12/17 - 유사 영화 검색어 요청 - by 1-blue
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @returns 유사한 영화들
 */
const apiSimilarMovies = async ({
  movieId,
  language = "ko-kr",
}: ApiSimilarMoviesRequest) =>
  await movieDBInstance.get<ApiSimilarMoviesResponse>(
    `/movie/${movieId}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=${language}`
  );

/**
 * 2022/12/17 - 영화 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const movieService = {
  apiFetchMovies,
  apiSaerchMovies,
  apiSuggestedMovies,
  apiSimilarMovies,
};
