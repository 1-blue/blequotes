import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import {
  apiFetchDrama,
  apiSaerchDrama,
  apiSimilarDrama,
  apiSuggestedDrama,
} from "../apis";

// type
import type {
  FetchDrama,
  SearchDramaRequest,
  SimilarDramaRequest,
  SuggestDramaRequest,
} from "../types";

/**
 * 2022/12/15 - 드라마 패치 요청 thunk - by 1-blue
 */
export const fetchDrama = createAsyncThunk(
  // 액션 타입 결정
  "fetch/drama",

  // promise를 반환하는 액션 작성
  async ({ category, language }: FetchDrama, { rejectWithValue }) => {
    try {
      const { data } = await apiFetchDrama({ category, language });

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
 * 2022/12/15 - 드라마 검색 요청 thunk - by 1-blue
 */
export const searchDrama = createAsyncThunk(
  "search/drama",
  async ({ title, language }: SearchDramaRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiSaerchDrama({ title, language });
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
 * 2022/12/15 - 추천 드라마 검색어 요청 thunk - by 1-blue
 */
export const suggestedDrama = createAsyncThunk(
  "suggested/drama",
  async ({ keyword, language }: SuggestDramaRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiSuggestedDrama({ keyword, language });

      // 제목이 같은 드라마는 추천 검색어에서 하나만 표시하도록 제외
      const uniqueData = {
        ...data,
        results: data.results.filter(
          (result, i, arr) => i === arr.findIndex((v) => v.name === result.name)
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

/**
 * 2022/12/15 - 유사 드라마 검색 요청 thunk - by 1-blue
 */
export const similarDrama = createAsyncThunk(
  "similar/drama",
  async ({ dramaId, language }: SimilarDramaRequest, { rejectWithValue }) => {
    try {
      const { data } = await apiSimilarDrama({ dramaId, language });

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
