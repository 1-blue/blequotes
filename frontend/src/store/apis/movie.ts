import { serverInstance } from ".";

// type
import type {
  FetchMoviesHandler,
  SearchMoviesHandler,
  SuggestMoviesHandler,
  SimilarMoviesHandler,
  DetailMovieHandler,
} from "../types";

/**
 * 2022/12/17 - 인기 / 최신 / 꾸준한 인기 영화들 요청 - by 1-blue ( 2023/02/05 )
 * @param category 인기, 최신, 꾸준한 인기 등
 * @param language 언어
 * @returns 인기 / 최신 / 꾸준한 인기 영화들 요청 Promise
 */
const apiFetchMovies: FetchMoviesHandler = async ({
  category,
  language = "ko-kr",
}) => serverInstance.get(`/api/movie`, { params: { category, language } });

/**
 * 2022/12/17 - 영화들 검색 요청 - by 1-blue ( 2023/02/05 )
 * @param title 영화 제목
 * @returns 영화들 검색 요청 Promise
 */
const apiSearchMovies: SearchMoviesHandler = async ({
  title,
  language = "ko-kr",
}) => serverInstance.get(`/api/movie/search`, { params: { title, language } });

/**
 * 2022/12/17 - 영화 추천 검색어들 요청 - by 1-blue ( 2023/02/05 )
 * @param title 영화 제목 ( 전체 or 일부분 )
 * @returns 영화 추천 검색어들 요청 Promise
 */
const apiSuggestedMovies: SuggestMoviesHandler = async ({
  keyword,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/movie/suggested`, { params: { keyword, language } });

/**
 * 2022/12/17 - 유사 영화들 요청 - by 1-blue ( 2023/02/05 )
 * @param movieId "MovieDB"에서 받은 영화 식별자
 * @returns 유사한 영화들 요청 Promise
 */
const apiSimilarMovies: SimilarMoviesHandler = async ({
  movieIdx,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/movie/similar`, { params: { movieIdx, language } });

/**
 * 2022/12/31 - 특정 영화 상세 정보 요청 - by 1-blue ( 2023/02/05 )
 * @param movieIdx "MovieDB"에서 받은 영화 식별자
 * @returns 특정 영화 상세 정보 요청 Promise
 */
const apiDetailMovie: DetailMovieHandler = async ({
  movieIdx,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/movie/detail`, { params: { movieIdx, language } });

/**
 * 2022/12/17 - 영화 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const movieApiService = {
  apiFetchMovies,
  apiSearchMovies,
  apiSuggestedMovies,
  apiSimilarMovies,
  apiDetailMovie,
};
