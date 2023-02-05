import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { movieApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  FetchMoviesHandler,
  FetchMoviesResponse,
  SearchMoviesHandler,
  SearchMoviesResponse,
  SuggestMoviesHandler,
  SuggestMoviesResponse,
  SimilarMoviesHandler,
  SimilarMoviesResponse,
  DetailMovieResponse,
  DetailMovieHandler,
} from "../types";

/**
 * 2022/12/05 - 영화 패치 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const fetchMoviesThunk = createAsyncThunk<
  FetchMoviesResponse,
  Parameters<FetchMoviesHandler>[0],
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "fetch/movie",

  // promise를 반환하는 액션 작성
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await movieApiService.apiFetchMovies(body);

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
 * 2022/12/07 - 영화 검색 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const searchMoviesThunk = createAsyncThunk<
  SearchMoviesResponse,
  Parameters<SearchMoviesHandler>[0],
  CreateAsyncThunkErrorType
>("search/movie", async (body, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSearchMovies(body);
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
 * 2022/12/13 - 추천 영화 검색어 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const suggestedMoviesThunk = createAsyncThunk<
  SuggestMoviesResponse,
  Parameters<SuggestMoviesHandler>[0],
  CreateAsyncThunkErrorType
>("suggested/movie", async (body, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSuggestedMovies(body);

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
 * 2022/12/15 - 유사 영화 검색 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const similarMoviesThunk = createAsyncThunk<
  SimilarMoviesResponse,
  Parameters<SimilarMoviesHandler>[0],
  CreateAsyncThunkErrorType
>("similar/movie", async (body, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiSimilarMovies(body);

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
 * 2022/12/31 - 특정 영화 상세 정보 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const detailMovieThunk = createAsyncThunk<
  DetailMovieResponse,
  Parameters<DetailMovieHandler>[0],
  CreateAsyncThunkErrorType
>("detail/movie", async (body, { rejectWithValue }) => {
  try {
    const { data } = await movieApiService.apiDetailMovie(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 특정 영화 정보 요청에 실패했습니다.",
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
  detailMovieThunk,
};
