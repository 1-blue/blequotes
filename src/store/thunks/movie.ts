import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { apiFetchMovie, apiSaerchMovie, apiSuggestedMovie } from "../apis";

// type
import type {
  FetchMoive,
  SearchMoiveRequest,
  SuggestMoiveRequest,
} from "../types";

/**
 * 2022/12/05 - 영화 패치 요청 thunk - by 1-blue
 */
export const fetchMovie = createAsyncThunk(
  // 액션 타입 결정
  "fetch/movie",

  // promise를 반환하는 액션 작성
  async ({ category, language }: FetchMoive, { rejectWithValue }) => {
    try {
      const { data } = await apiFetchMovie({ category, language });

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
 * 2022/12/07 - 영화 검색 요청 thunk - by 1-blue
 */
export const searchMovie = createAsyncThunk(
  "search/movie",
  async ({ title, language }: SearchMoiveRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiSaerchMovie({ title, language });
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
 * 2022/12/13 - 추천 영화 검색어 요청 thunk - by 1-blue
 */
export const suggestedMovie = createAsyncThunk(
  "suggested/movie",
  async ({ keyword, language }: SuggestMoiveRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiSuggestedMovie({ keyword, language });

      // 제목이 같은 영화는 추천 검색어에서 하나만 표시하도록 제외
      const uniqueData = {
        ...data,
        results: data.results.filter(
          (result, i, arr) =>
            i === arr.findIndex((v) => v.title === result.title)
        ),
      };

      return uniqueData;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue("알 수 없는 에러");
    }
  }
);
