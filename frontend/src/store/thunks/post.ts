import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { postApiService } from "../apis";

// type
import type { CreatePostRequest, GetPostsRequest } from "../types";

/**
 * 2022/12/22 - 게시글 생성 요청 thunk - by 1-blue
 */
const createPostThunk = createAsyncThunk(
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
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue("알 수 없는 에러");
    }
  }
);

/**
 * 2022/12/24 - 게시글들 가져오기 요청 thunk - by 1-blue
 */
const getPostsThunk = createAsyncThunk(
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
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue("알 수 없는 에러");
    }
  }
);

/**
 * 2022/12/22 - 게시글 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const postThunkService = {
  createPostThunk,
  getPostsThunk,
};
