import { serverInstance } from ".";

// type
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateLikeOrHateRequest,
  UpdateLikeOrHateResponse,
} from "../types";

/**
 * 2022/12/22 - 게시글 생성 - by 1-blue
 * @param data 게시글 생성에 필요한 데이터들
 * @returns 게시글 식별자 반환
 */
const apiCreatePost = async (data: CreatePostRequest) =>
  await serverInstance.post<CreatePostResponse>(`/api/post`, data);

/**
 * 2022/12/24 - 게시글들 가져오기 요청 - by 1-blue
 * @param data 식별자, 카테고리(영화,드라마,도서), 정렬기준(인기,최신)
 * @returns 찾은 게시글들
 */
const apiGetPosts = async (data: GetPostsRequest) =>
  await serverInstance.get<GetPostsResponse>(`/api/post`, { params: data });

/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 - by 1-blue
 * @param data 게시글 식별자, 이미 눌렀는지, 좋아요/싫어요 판단 변수
 * @returns 결과
 */
const apiUpdateLikeOrHate = async (data: UpdateLikeOrHateRequest) =>
  await serverInstance.post<UpdateLikeOrHateResponse>(`/api/post/like`, data);

/**
 * 2022/12/22 - 게시글 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const postApiService = {
  apiCreatePost,
  apiGetPosts,
  apiUpdateLikeOrHate,
};
