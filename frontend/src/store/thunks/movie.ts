import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { movieApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  FetchMoviesRequest,
  FetchMoviesResponse,
  SearchMoviesRequest,
  SearchMoviesResponse,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
} from "../types";

/**
 * 2022/12/05 - 영화 패치 요청 thunk - by 1-blue
 */
const fetchMoviesThunk = createAsyncThunk<
  FetchMoviesResponse,
  FetchMoviesRequest,
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "fetch/movie",

  // promise를 반환하는 액션 작성
  async ({ category, language }, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiFetchMovies({
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
        message: "알 수 없는 이유로 영화들을 가져오는데 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/07 - 영화 검색 요청 thunk - by 1-blue
 */
const searchMoviesThunk = createAsyncThunk<
  SearchMoviesResponse,
  SearchMoviesRequest,
  CreateAsyncThunkErrorType
>("search/movie", async ({ title, language }, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSearchMovies({
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
      message: "알 수 없는 이유로 영화 검색에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/13 - 추천 영화 검색어 요청 thunk - by 1-blue
 */
const suggestedMoviesThunk = createAsyncThunk<
  SuggestMoviesResponse,
  SuggestMoviesRequest,
  CreateAsyncThunkErrorType
>("suggested/movie", async ({ keyword, language }, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSuggestedMovies({
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
      message: "알 수 없는 이유로 추천 검색어 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/15 - 유사 영화 검색 요청 thunk - by 1-blue
 */
const similarMoviesThunk = createAsyncThunk<
  SimilarMoviesResponse,
  SimilarMoviesRequest,
  CreateAsyncThunkErrorType
>("similar/movie", async ({ movieId, language }, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSimilarMovies({
      movieId,
      language,
    });

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 유사 영화들 검색에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/17 - 영화 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const movieThunkService = {
  fetchMoviesThunk,
  searchMoviesThunk,
  suggestedMoviesThunk,
  similarMoviesThunk,
};
