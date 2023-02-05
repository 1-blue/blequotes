type ApiType = "axios" | "prisma" | "unknown";

/**
 * "Response" 필수 타입을 지정한 타입
 */
export type ApiResponse<T> = {
  meta: { ok: boolean; type?: ApiType };
  data: { message: string } & T;
};

/**
 * AsyncThunk의 에러 처리를 위한 타입
 */
export type CreateAsyncThunkErrorType = { rejectValue: { message: string } };

export type {
  Movie,
  DetailMovie,
  FetchMoviesHandler,
  FetchMoviesResponse,
  SearchMoviesHandler,
  SearchMoviesResponse,
  SuggestMoviesHandler,
  SuggestMoviesResponse,
  SimilarMoviesHandler,
  SimilarMoviesResponse,
  DetailMovieHandler,
  DetailMovieResponse,
} from "./movie";

export type {
  Drama,
  DetailDrama,
  FetchDramasHandler,
  FetchDramasResponse,
  SearchDramasHandler,
  SearchDramasResponse,
  SuggestDramasHandler,
  SuggestDramasResponse,
  SimilarDramasHandler,
  SimilarDramasResponse,
  DetailDramaHandler,
  DetailDramaResponse,
} from "./drama";

export type {
  Book,
  SearchBooksHandler,
  SearchBooksResponse,
  SuggestBooksHandler,
  SuggestBooksResponse,
  SimilarBooksHandler,
  SimilarBooksResponse,
  DetailBookHandler,
  DetailBookResponse,
} from "./book";

export type {
  FetchPresignedURLHandler,
  CreateImageHandler,
  DeleteImageHandler,
} from "./image";

export type {
  Post,
  CreatePostHandler,
  CreatePostResponse,
  GetPostsHandler,
  GetPostsResponse,
  UpdateLikeOrHateHandler,
  UpdateLikeOrHateResponse,
  GetPostsOfTargetHandler,
  GetPostsOfTargetResponse,
} from "./post";
