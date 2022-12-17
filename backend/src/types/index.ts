type ApiType = "axios" | "prisma" | "unknown";

/**
 * "Response" 필수 타입을 지정한 타입
 */
export type ApiResponse<T> = {
  meta: { ok: boolean; type?: ApiType };
  data: { message: string } & T;
};
/**
 * 에러를 위한 "Response"
 */
export type ApiErrorResponse = ApiResponse<{}>;

// book type
export {
  SearchBookRequest,
  SearchBookResponse,
  ApiSearchBookRequest,
  ApiSearchBookResponse,
} from "./book";

export type {
  //
  ApiFetchMoviesRequest,
  ApiFetchMoviesResponse,
  FetchMoviesRequest,
  FetchMoviesResponse,
  //
  ApiSearchMoviesRequest,
  ApiSearchMoviesResponse,
  SearchMoviesRequest,
  SearchMoviesResponse,
  //
  ApiSuggestMoviesRequest,
  ApiSuggestMoviesResponse,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
  //
  ApiSimilarMoviesRequest,
  ApiSimilarMoviesResponse,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
} from "./movie";

export type {
  //
  ApiFetchDramasRequest,
  ApiFetchDramasResponse,
  FetchDramasRequest,
  FetchDramasResponse,
  //
  ApiSearchDramasRequest,
  ApiSearchDramasResponse,
  SearchDramasRequest,
  SearchDramasResponse,
  //
  ApiSuggestDramasRequest,
  ApiSuggestDramasResponse,
  SuggestDramasRequest,
  SuggestDramasResponse,
  //
  ApiSimilarDramasRequest,
  ApiSimilarDramasResponse,
  SimilarDramasRequest,
  SimilarDramasResponse,
} from "./drama";
