// type
import type { ApiResponse } from ".";
import type { Post, PostCategory } from "@prisma/client";

/**
 * 게시글들 정렬 기준
 */
type PostSortBy = "popular" | "latest";

// ============================== 게시글 생성 요청 관련 ==============================
/**
 * 2022/12/22 - 게시글 생성 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type CreatePostRequest = {
  idx: string;
  title: string;
  category: PostCategory;
  speech: string;
  thumbnail?: string;

  // 영화 / 드라마 용
  time?: string;

  // 드라마 용
  episode?: number;

  // 도서 용
  page?: number;
};
/**
 * 2022/12/22 - 게시글 생성 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type CreatePostResponse = ApiResponse<{}>;

// ============================== 게시글들 가져오기 요청 관련 ==============================
/**
 * 2022/12/24 - 게시글들 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type GetPostsRequest = {
  category: PostCategory;
  sortBy: PostSortBy;
  take: number;
  lastId: number;
};
/**
 * 2022/12/24 - 게시글들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type GetPostsResponse = ApiResponse<{
  take: number;
  category: PostCategory;
  posts: Post[];
}>;

// ============================== 게시글 좋아요/싫어요 요청 관련 ==============================
/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type UpdateLikeOrHateRequest = {
  id: number;
  already: boolean;
  isLike: boolean;
  isDuplication: boolean;
};
/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type UpdateLikeOrHateResponse = ApiResponse<{ resultPost?: Post }>;
