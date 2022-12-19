import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { bookApiService } from "../apis";

// type
import type {
  SearchBooksRequest,
  SimilarBooksRequest,
  SuggestBooksRequest,
} from "../types";

/**
 * 2022/12/18 - 도서들 검색 요청 thunk - by 1-blue
 */
const searchBooksThunk = createAsyncThunk(
  "search/book",
  async ({ title }: SearchBooksRequest, { rejectWithValue }) => {
    try {
      const { data } = await bookApiService.apiSearchBooks({ title });
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
 * 2022/12/18 - 추천 도서들 검색어 요청 thunk - by 1-blue
 */
const suggestedBooksThunk = createAsyncThunk(
  "suggested/book",
  async ({ keyword }: SuggestBooksRequest, { rejectWithValue }) => {
    try {
      const { data } = await bookApiService.apiSuggestedBooks({ keyword });

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
 * 2022/12/18 - 유사 도서들 검색어 요청 thunk - by 1-blue
 */
const similarBooksThunk = createAsyncThunk(
  "similar/book",
  async ({ author }: SimilarBooksRequest, { rejectWithValue }) => {
    try {
      const { data } = await bookApiService.apiSimilaredBooks({ author });

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
 * 2022/12/18 - 도서 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const bookThunkService = {
  searchBooksThunk,
  suggestedBooksThunk,
  similarBooksThunk,
};
