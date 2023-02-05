import { serverInstance } from ".";

// type
import type {
  CreatePostHandler,
  GetPostsHandler,
  UpdateLikeOrHateHandler,
  GetPostsOfTargetHandler,
} from "../types";

/**
 * 2022/12/22 - 게시글 생성 요청 - by 1-blue ( 2023/02/05 )
 * @param data 게시글 생성에 필요한 데이터들
 * @returns 게시글 생성 요청 Promise
 */
const apiCreatePost: CreatePostHandler = async (data) =>
  serverInstance.post(`/api/post`, data);

/**
 * 2022/12/24 - 게시글들 가져오기 요청 - by 1-blue ( 2023/02/05 )
 * @param data 식별자, 카테고리(영화,드라마,도서), 정렬기준(인기,최신)
 * @returns 게시글들 가져오기 요청 Promise
 */
const apiGetPosts: GetPostsHandler = async (data) =>
  serverInstance.get(`/api/post`, { params: data });

/**
 * 2022/12/26 - 게시글 좋아요/싫어요 요청 - by 1-blue ( 2023/02/05 )
 * @param data 게시글 식별자, 이미 눌렀는지, 좋아요/싫어요 판단 변수
 * @returns 게시글 좋아요/싫어요 요청 Promise
 */
const apiUpdateLikeOrHate: UpdateLikeOrHateHandler = async (data) =>
  serverInstance.post(`/api/post/like`, data);

/**
 * 2022/12/30 - 특정 대상의 게시글들 요청 - by 1-blue ( 2023/02/05 )
 * @param data 대상 식별자, 정렬 기준, 요청 개수, 요청 기준
 * @returns 특정 대상의 게시글들 요청 Promise
 */
const apiGetPostsOfTarget: GetPostsOfTargetHandler = async (data) =>
  serverInstance.get(`/api/post/${data.idx}`, {
    params: { lastId: data.lastId, sortBy: data.sortBy, take: data.take },
  });

/**
 * 2022/12/22 - 게시글 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const postApiService = {
  apiCreatePost,
  apiGetPosts,
  apiUpdateLikeOrHate,
  apiGetPostsOfTarget,
};
