import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { postApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  CreatePostRequest,
  CreatePostResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateLikeOrHateRequest,
  UpdateLikeOrHateResponse,
} from "../types";

/**
 * 2022/12/22 - 게시글 생성 요청 thunk - by 1-blue
 */
const createPostThunk = createAsyncThunk<
  CreatePostResponse["data"],
  CreatePostRequest,
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "create/post",

  // promise를 반환하는 액션 작성
  async (body: CreatePostRequest, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await postApiService.apiCreatePost(body);

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유로 게시글 생성에 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/24 - 게시글들 가져오기 요청 thunk - by 1-blue
 */
const getPostsThunk = createAsyncThunk<
  GetPostsResponse["data"],
  GetPostsRequest,
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "fetch/posts",

  // promise를 반환하는 액션 작성
  async (body: GetPostsRequest, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await postApiService.apiGetPosts(body);

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유로 게시글들 가져오기에 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/26 - 게시글에 좋아요/싫어요 요청 thunk - by 1-blue
 */
const updateLikeOrHate = createAsyncThunk<
  UpdateLikeOrHateResponse["data"],
  UpdateLikeOrHateRequest,
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "update/post/likeOrHate",

  // promise를 반환하는 액션 작성
  async (body: UpdateLikeOrHateRequest, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await postApiService.apiUpdateLikeOrHate(body);

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유료 게시글 싫어요/좋아요에 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/22 - 게시글 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const postThunkService = {
  createPostThunk,
  getPostsThunk,
  updateLikeOrHate,
};
