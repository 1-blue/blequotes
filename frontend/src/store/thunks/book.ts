import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { bookApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  SearchBooksRequest,
  SearchBooksResponse,
  SimilarBooksRequest,
  SimilarBooksResponse,
  SuggestBooksRequest,
  SuggestBooksResponse,
} from "../types";

/**
 * 2022/12/18 - 도서들 검색 요청 thunk - by 1-blue
 */
const searchBooksThunk = createAsyncThunk<
  SearchBooksResponse,
  SearchBooksRequest,
  CreateAsyncThunkErrorType
>("search/book", async ({ title }, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSearchBooks({ title });

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
  SuggestBooksRequest,
  CreateAsyncThunkErrorType
>("suggested/book", async ({ keyword }, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSuggestedBooks({ keyword });

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
  SimilarBooksRequest,
  CreateAsyncThunkErrorType
>("similar/book", async ({ author }, { rejectWithValue }) => {
  try {
    const { data } = await bookApiService.apiSimilaredBooks({ author });

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
 * 2022/12/18 - 도서 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const bookThunkService = {
  searchBooksThunk,
  suggestedBooksThunk,
  similarBooksThunk,
};
