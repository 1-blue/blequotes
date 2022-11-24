import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { apiFetchUser } from "../apis";

/**
 * >>> 예시
 */
export const fetchUser = createAsyncThunk(
  // 액션 타입 결정
  "user/fetch",

  // promise를 반환하는 액션 작성
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await apiFetchUser(id);

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
