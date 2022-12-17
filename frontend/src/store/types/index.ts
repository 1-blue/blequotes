type ApiType = "axios" | "prisma" | "unknown";

/**
 * "Response" 필수 타입을 지정한 타입
 */
export type ApiResponse<T> = {
  meta: { ok: boolean; type?: ApiType };
  data: { message: string } & T;
};

export type {
  Movie,
  FetchMoviesRequest,
  FetchMoviesResponse,
  SearchMoviesRequest,
  SearchMoviesResponse,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
} from "./movie";

export type {
  Drama,
  FetchDramasRequest,
  FetchDramasResponse,
  SearchDramasRequest,
  SearchDramasResponse,
  SuggestDramasRequest,
  SuggestDramasResponse,
  SimilarDramasRequest,
  SimilarDramasResponse,
} from "./drama";