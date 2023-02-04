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

export type {
  //
  ApiFetchMoviesHandler,
  FetchMoviesRequest,
  FetchMoviesResponse,
  //
  ApiSearchMoviesHandler,
  SearchMoviesRequest,
  SearchMoviesResponse,
  //
  ApiSuggestMoviesHandler,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
  //
  ApiSimilarMoviesHandler,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
  //
  ApiDetailMovieHandler,
  DetailMovieRequest,
  DetailMovieResponse,
} from "./movie";

export type {
  //
  ApiFetchDramasHandler,
  FetchDramasRequest,
  FetchDramasResponse,
  //
  ApiSearchDramasHandler,
  SearchDramasRequest,
  SearchDramasResponse,
  //
  ApiSuggestDramasHandler,
  SuggestDramasRequest,
  SuggestDramasResponse,
  //
  ApiSimilarDramasHandler,
  SimilarDramasRequest,
  SimilarDramasResponse,
  //
  ApiDetailDramaHandler,
  DetailDramaRequest,
  DetailDramaResponse,
} from "./drama";

// book type
export {
  ApiSearchBooksHandler,
  SearchBooksRequest,
  SearchBooksResponse,
  ApiSuggestedBooksHandler,
  SuggestedBooksRequest,
  SuggestedBooksResponse,
  ApiSimilarBooksHandler,
  SimilarBooksRequest,
  SimilarBooksResponse,
  ApiDetailBookHandler,
  DetailBookRequest,
  DetailBookResponse,
} from "./book";

// s3(image) type
export type {
  ApiFetchPresignedURLHandler,
  FetchPresignedURLRequest,
  FetchPresignedURLResponse,
  ApiDeleteImageHandler,
  DeleteImageRequest,
  DeleteImageResponse,
} from "./image";

// post type
export type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateLikeOrHateRequest,
  UpdateLikeOrHateResponse,
  GetPostsOfTargetRequest,
  GetPostsOfTargetResponse,
} from "./post";
