import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { bookApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  SearchBooksHandler,
  SearchBooksResponse,
  SuggestBooksHandler,
  SuggestBooksResponse,
  SimilarBooksHandler,
  SimilarBooksResponse,
  DetailBookHandler,
  DetailBookResponse,
} from "../types";

/**
 * 2022/12/18 - 도서들 검색 요청 thunk - by 1-blue
 */
const searchBooksThunk = createAsyncThunk<
  SearchBooksResponse,
  Parameters<SearchBooksHandler>[0],
  CreateAsyncThunkErrorType
>("search/book", async (body, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSearchBooks(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 도서 검색에 실패했습니다..",
    });
  }
});

/**
 * 2022/12/18 - 추천 도서들 검색어 요청 thunk - by 1-blue
 */
const suggestedBooksThunk = createAsyncThunk<
  SuggestBooksResponse,
  Parameters<SuggestBooksHandler>[0],
  CreateAsyncThunkErrorType
>("suggested/book", async (body, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSuggestedBooks(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 도서 추천 검색어 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/18 - 유사 도서들 검색어 요청 thunk - by 1-blue
 */
const similarBooksThunk = createAsyncThunk<
  SimilarBooksResponse,
  Parameters<SimilarBooksHandler>[0],
  CreateAsyncThunkErrorType
>("similar/book", async (body, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSimilaredBooks(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 유사 도서들을 가져오는데 실패했습니다.",
    });
  }
});

/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 thunk - by 1-blue
 */
const detailBookThunk = createAsyncThunk<
  DetailBookResponse,
  Parameters<DetailBookHandler>[0],
  CreateAsyncThunkErrorType
>("detail/book", async (body, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiDetailBook(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 특정 도서 정보 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/18 - 도서 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const bookThunkService = {
  searchBooksThunk,
  suggestedBooksThunk,
  similarBooksThunk,
  detailBookThunk,
};
