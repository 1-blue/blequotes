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

export type {
  Book,
  SearchBooksRequest,
  SearchBooksResponse,
  SuggestBooksRequest,
  SuggestBooksResponse,
  SimilarBooksRequest,
  SimilarBooksResponse,
} from "./book";

export type {
  FetchPresignedURLRequest,
  FetchPresignedURLResponse,
  CreateImageRequest,
  CreateImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
} from "./image";

export type {
  Post,
  CreatePostRequest,
  CreatePostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateLikeOrHateRequest,
  UpdateLikeOrHateResponse,
  GetPostsOfTargetRequest,
  GetPostsOfTargetResponse,
} from "./post";
