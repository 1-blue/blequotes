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
  //
  ApiDetailMovieRequest,
  ApiDetailMovieResponse,
  DetailMovieRequest,
  DetailMovieResponse,
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
  //
  ApiDetailDramaRequest,
  ApiDetailDramaResponse,
  DetailDramaRequest,
  DetailDramaResponse,
} from "./drama";

// book type
export {
  //
  ApiSearchBooksRequest,
  ApiSearchBooksResponse,
  SearchBooksRequest,
  SearchBooksResponse,
  //
  ApiSuggestedBooksRequest,
  ApiSuggestedBooksResponse,
  SuggestedBooksRequest,
  SuggestedBooksResponse,
  //
  ApiSimilarBooksRequest,
  ApiSimilarBooksResponse,
  SimilarBooksRequest,
  SimilarBooksResponse,
  //
  ApiDetailBookRequest,
  ApiDetailBookResponse,
  DetailBookRequest,
  DetailBookResponse,
} from "./book";

// s3(image) type
export type {
  ApiFetchPresignedURLRequest,
  ApiFetchPresignedURLResponse,
  FetchPresignedURLRequest,
  FetchPresignedURLResponse,
  ApiDeleteImageRequest,
  ApiDeleteImageResponse,
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
