// type
import type { ApiResponse } from ".";
import type { PostCategory } from "@src/types";

// ============================== 게시글 생성 요청 관련 ==============================
/**
 * 2022/12/22 - 게시글 생성 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type CreatePostRequest = {
  idx: string;
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
 * 2022/12/22 - 게시글 생성 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type CreatePostResponse = ApiResponse<{}>;
