import { serverInstance } from ".";

// type
import type { CreatePostRequest, CreatePostResponse } from "../types";

/**
 * 2022/12/22 - 게시글 생성 - by 1-blue
 * @param data 게시글 생성에 필요한 데이터들
 * @returns 게시글 식별자 반환
 */
const apiCreatePost = async (data: CreatePostRequest) =>
  await serverInstance.post<CreatePostResponse>(`/api/post`, data);

/**
 * 2022/12/22 - 게시글 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const postApiService = {
  apiCreatePost,
};
