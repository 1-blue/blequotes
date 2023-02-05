// type
import type { AxiosResponse } from "axios";
import type { ApiResponse } from ".";
import type { PostCategory, PostSortBy } from "@src/types";

/**
 * 2022/12/24 - DB에 저장되는 게시글 타입 ( 백엔드의 prisma에서 만든 타입 ) - by 1-blue
 */
export type Post = {
  id: number;
  idx: string;
  title: string;
  category: PostCategory;
  speech: string;
  like: number;
  hate: number;
  updatedAt: Date;
  time: string | null;
  episode: number | null;
  page: number | null;
  thumbnail: string | null;
};

// ============================== 게시글 생성 요청 관련 ==============================
/**
 * 2022/12/22 - 게시글 생성 요청 수신 타입 ( F -> B ) - by 1-blue
 */
type CreatePostRequest = {
  idx: string;
  title: string;
  category: PostCategory;
  speech: string;
  thumbnail: string;

  // 영화 / 드라마 용
  time?: string;

  // 드라마 용
  episode?: number;

  // 도서 용
  page?: number;
};
/**
 * 2022/12/22 - 게시글 생성 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type CreatePostResponse = ApiResponse<{}>;
/**
 * 2023/02/05 - 게시글 생성 API 요청 함수 시그니처 - by 1-blue
 */
export type CreatePostHandler = (
  body: CreatePostRequest
) => Promise<AxiosResponse<CreatePostResponse, any>>;

// ============================== 게시글들 가져오기 요청 관련 ==============================
/**
 * 2022/12/24 - 게시글들 가져오기 요청 수신 타입 ( F -> B ) - by 1-blue
 */
type GetPostsRequest = {
  category: PostCategory;
  sortBy: PostSortBy;
  take: number;
  lastId: number;
};
/**
 * 2022/12/24 - 게시글들 가져오기 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type GetPostsResponse = ApiResponse<{
  take: number;
  category: PostCategory;
  posts: Post[];
}>;
/**
 * 2023/02/05 - 게시글들 가져오기 API 요청 함수 시그니처 - by 1-blue
 */
export type GetPostsHandler = (
  body: GetPostsRequest
) => Promise<AxiosResponse<GetPostsResponse, any>>;

// ============================== 게시글 좋아요/싫어요 요청 관련 ==============================
/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 수신 타입 ( F -> B ) - by 1-blue
 */
type UpdateLikeOrHateRequest = {
  id: number;
  already: boolean;
  isLike: boolean;
  isDuplication: boolean;
};
/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type UpdateLikeOrHateResponse = ApiResponse<{ resultPost?: Post }>;
/**
 * 2023/02/05 - 게시글 좋아요/싫어요 API 요청 함수 시그니처 - by 1-blue
 */
export type UpdateLikeOrHateHandler = (
  body: UpdateLikeOrHateRequest
) => Promise<AxiosResponse<UpdateLikeOrHateResponse, any>>;

// ============================== 특정 영화/드라마/도서의 게시글들 요청 관련 ==============================
/**
 * 2022/12/30 - 특정 대상의 게시글들 요청 수신 타입 ( F -> B ) - by 1-blue
 */
type GetPostsOfTargetRequest = {
  idx: string;
  sortBy: PostSortBy;
  take: number;
  lastId: number;
};
/**
 * 2022/12/30 - 특정 대상의 게시글들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type GetPostsOfTargetResponse = ApiResponse<{
  take: number;
  posts: Post[];
}>;
/**
 * 2023/02/05 - 특정 대상의 게시글들 API 요청 함수 시그니처 - by 1-blue
 */
export type GetPostsOfTargetHandler = (
  body: GetPostsOfTargetRequest
) => Promise<AxiosResponse<GetPostsOfTargetResponse, any>>;
