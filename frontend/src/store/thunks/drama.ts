import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { dramaApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  FetchDramasRequest,
  FetchDramasResponse,
  SearchDramasRequest,
  SearchDramasResponse,
  SuggestDramasRequest,
  SuggestDramasResponse,
  SimilarDramasRequest,
  SimilarDramasResponse,
} from "../types";

/**
 * 2022/12/15 - 드라마 패치 요청 thunk - by 1-blue
 */
const fetchDramasThunk = createAsyncThunk<
  FetchDramasResponse,
  FetchDramasRequest,
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "fetch/drama",

  // promise를 반환하는 액션 작성
  async ({ category, language }: FetchDramasRequest, { rejectWithValue }) => {
    try {
      const { data } = await dramaApiService.apiFetchDramas({
        category,
        language,
      });

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유로 드라마들을 가져오는데 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/15 - 드라마 검색 요청 thunk - by 1-blue
 */
const searchDramasThunk = createAsyncThunk<
  SearchDramasResponse,
  SearchDramasRequest,
  CreateAsyncThunkErrorType
>("search/drama", async ({ title, language }, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiSearchDramas({
      title,
      language,
    });
    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 드라마 검색에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/15 - 추천 드라마 검색어 요청 thunk - by 1-blue
 */
const suggestedDramasThunk = createAsyncThunk<
  SuggestDramasResponse,
  SuggestDramasRequest,
  CreateAsyncThunkErrorType
>("suggested/drama", async ({ keyword, language }, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiSuggestedDramas({
      keyword,
      language,
    });

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 드라마 추천 검색어 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/15 - 유사 드라마 검색 요청 thunk - by 1-blue
 */
const similarDramasThunk = createAsyncThunk<
  SimilarDramasResponse,
  SimilarDramasRequest,
  CreateAsyncThunkErrorType
>(
  "similar/drama",
  async ({ dramaId, language }: SimilarDramasRequest, { rejectWithValue }) => {
    try {
      const { data } = await dramaApiService.apiSimilarDramas({
        dramaId,
        language,
      });

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유로 유사 드라마 검색에 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/17 - 드라마 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const dramaThunkService = {
  fetchDramasThunk,
  searchDramasThunk,
  suggestedDramasThunk,
  similarDramasThunk,
};
