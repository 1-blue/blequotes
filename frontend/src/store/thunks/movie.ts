import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { movieApiService } from "../apis";

// type
import type {
  FetchMoviesRequest,
  SearchMoviesRequest,
  SuggestMoviesRequest,
  SimilarMoviesRequest,
} from "../types";

/**
 * 2022/12/05 - 영화 패치 요청 thunk - by 1-blue
 */
const fetchMoviesThunk = createAsyncThunk(
  // 액션 타입 결정
  "fetch/movie",

  // promise를 반환하는 액션 작성
  async ({ category, language }: FetchMoviesRequest, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiFetchMovies({
        category,
        language,
      });

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
const searchMoviesThunk = createAsyncThunk(
  "search/movie",
  async ({ title, language }: SearchMoviesRequest, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiSearchMovies({
        title,
        language,
      });
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
const suggestedMoviesThunk = createAsyncThunk(
  "suggested/movie",
  async ({ keyword, language }: SuggestMoviesRequest, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiSuggestedMovies({
        keyword,
        language,
      });

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
 * 2022/12/15 - 유사 영화 검색 요청 thunk - by 1-blue
 */
const similarMoviesThunk = createAsyncThunk(
  "similar/movie",
  async ({ movieId, language }: SimilarMoviesRequest, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiSimilarMovies({
        movieId,
        language,
      });

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
 * 2022/12/17 - 영화 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const movieThunkService = {
  fetchMoviesThunk,
  searchMoviesThunk,
  suggestedMoviesThunk,
  similarMoviesThunk,
};
