import { movieDBInstance } from ".";

// type
import type {
  ApiFetchMoviesHandler,
  ApiSearchMoviesHandler,
  ApiSuggestMoviesHandler,
  ApiSimilarMoviesHandler,
  ApiDetailMovieHandler,
} from "../types";

/**
 * 2022/12/17 - 특정 카테고리의 영화들 요청 - by 1-blue ( 2023/02/04 )
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 영화들 요청 Promise
 */
const apiFetchMovies: ApiFetchMoviesHandler = async ({
  category,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/movie/${category}`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/17 - 영화들 검색 요청 - by 1-blue ( 2023/02/04 )
 * @param title 영화 제목
 * @param language 언어
 * @returns 검색된 영화들
 */
const apiSearchMovies: ApiSearchMoviesHandler = async ({
  title,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/search/movie`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: title, language },
  });

/**
 * 2022/12/17 - 영화 추천 검색어들 요청 - by 1-blue ( 2023/02/04 )
 * @param title 영화 제목 ( 전체 or 일부분 )
 * @param language 언어
 * @returns 영화 추천 검색어들
 */
const apiSuggestedMovies: ApiSuggestMoviesHandler = async ({
  keyword,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/search/movie`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: keyword, language },
  });

/**
 * 2022/12/17 - 유사한 영화들 요청 - by 1-blue ( 2023/02/04 )
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @param language 언어
 * @returns 유사한 영화들
 */
const apiSimilarMovies: ApiSimilarMoviesHandler = async ({
  movieIdx,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/movie/${movieIdx}/similar`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 - by 1-blue ( 2023/02/04 )
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @param language 언어
 * @returns 특정 영화 상세 정보
 */
const apiDetailMovie: ApiDetailMovieHandler = async ({
  movieIdx,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/movie/${movieIdx}`, {
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
