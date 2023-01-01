import { createSlice } from "@reduxjs/toolkit";

// thunk
import { bookThunkService } from "../thunks";

// type
import type { Book } from "../types";

interface BookState {
  searchedBooks: Book[];
  suggestedBooks: string[];
  similarBooks: Book[];

  detailBook: Book | null;

  // 특정 카테고리의 도서들 요청
  fetchBooksLoading: boolean;
  fetchBooksDone: null | string;
  fetchBooksError: null | string;

  // 도서 검색
  searchBooksLoading: boolean;
  searchBooksDone: null | string;
  searchBooksError: null | string;

  // 추천 검색어
  suggestedBooksLoading: boolean;
  suggestedBooksDone: null | string;
  suggestedBooksError: null | string;

  // 유사 검색어
  similarBooksLoading: boolean;
  similarBooksDone: null | string;
  similarBooksError: null | string;

  // 특정 영화 상세 정보
  detailBookLoading: boolean;
  detailBookDone: null | string;
  detailBookError: null | string;
}

const initialState: BookState = {
  searchedBooks: [],
  suggestedBooks: [],
  similarBooks: [],

  detailBook: null,

  fetchBooksLoading: false,
  fetchBooksDone: null,
  fetchBooksError: null,

  searchBooksLoading: false,
  searchBooksDone: null,
  searchBooksError: null,

  suggestedBooksLoading: false,
  suggestedBooksDone: null,
  suggestedBooksError: null,

  similarBooksLoading: false,
  similarBooksDone: null,
  similarBooksError: null,

  detailBookLoading: false,
  detailBookDone: null,
  detailBookError: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    resetMessage(state) {
      state.fetchBooksLoading = false;
      state.fetchBooksDone = null;
      state.fetchBooksError = null;

      state.searchBooksLoading = false;
      state.searchBooksDone = null;
      state.searchBooksError = null;

      state.suggestedBooksLoading = false;
      state.suggestedBooksDone = null;
      state.suggestedBooksError = null;

      state.similarBooksLoading = false;
      state.similarBooksDone = null;
      state.similarBooksError = null;

      state.detailBookLoading = false;
      state.detailBookDone = null;
      state.detailBookError = null;
    },
  },

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    // 도서 검색
    builder.addCase(bookThunkService.searchBooksThunk.pending, (state) => {
      state.searchBooksLoading = true;
    });
    builder.addCase(
      bookThunkService.searchBooksThunk.fulfilled,
      (state, action) => {
        state.searchBooksLoading = false;
        state.searchBooksDone = action.payload.data.message;
        state.searchedBooks = action.payload.data.books;
      }
    );
    builder.addCase(
      bookThunkService.searchBooksThunk.rejected,
      (state, action) => {
        state.searchBooksLoading = false;
        if (action.payload?.message) {
          state.searchBooksError = action.payload.message;
        }

        console.error("searchBooks >> ", action);
      }
    );

    // 추천 도서 검색어
    builder.addCase(bookThunkService.suggestedBooksThunk.pending, (state) => {
      state.suggestedBooksLoading = true;
    });
    builder.addCase(
      bookThunkService.suggestedBooksThunk.fulfilled,
      (state, action) => {
        state.suggestedBooksLoading = false;
        state.suggestedBooksDone = action.payload.data.message;
        state.suggestedBooks = action.payload.data.titles;
      }
    );
    builder.addCase(
      bookThunkService.suggestedBooksThunk.rejected,
      (state, action) => {
        state.suggestedBooksLoading = false;
        if (action.payload?.message) {
          state.suggestedBooksError = action.payload.message;
        }

        console.error("suggestedBooks >> ", action);
      }
    );

    // 유사 도서 검색어
    builder.addCase(bookThunkService.similarBooksThunk.pending, (state) => {
      state.similarBooksLoading = true;
    });
    builder.addCase(
      bookThunkService.similarBooksThunk.fulfilled,
      (state, action) => {
        state.similarBooksLoading = false;
        state.similarBooksDone = action.payload.data.message;
        state.similarBooks = action.payload.data.books;
      }
    );
    builder.addCase(
      bookThunkService.similarBooksThunk.rejected,
      (state, action) => {
        state.similarBooksLoading = false;
        if (action.payload?.message) {
          state.similarBooksError = action.payload.message;
        }

        console.error("similarBooks >> ", action);
      }
    );

    // 특정 도서 상세 정보 요청
    builder.addCase(bookThunkService.detailBookThunk.pending, (state) => {
      state.detailBookLoading = true;
    });
    builder.addCase(
      bookThunkService.detailBookThunk.fulfilled,
      (state, action) => {
        state.detailBookLoading = false;
        state.detailBookDone = action.payload.data.message;
        state.detailBook = action.payload.data.book;
      }
    );
    builder.addCase(
      bookThunkService.detailBookThunk.rejected,
      (state, action) => {
        state.detailBookLoading = false;
        if (action.payload?.message) {
          state.detailBookError = action.payload.message;
        }

        console.error("detailBook >> ", action);
      }
    );
  },
});

/**
 * "book"관련 액션 크리에이터
 */
export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
