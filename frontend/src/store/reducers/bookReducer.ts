import { createSlice } from "@reduxjs/toolkit";

// thunk
import { bookThunkService } from "../thunks";

// type
import type { Book } from "../types";

interface BookState {
  searchedBooks: Book[];
  suggestedBooks: string[];
  similarBooks: Book[];

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
}

const initialState: BookState = {
  searchedBooks: [],
  suggestedBooks: [],
  similarBooks: [],

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
        state.searchBooksError = `도서 검색에 실패했습니다.`;

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
        state.suggestedBooksError = `추천 도서 검색어들을 찾는데 실패했습니다.`;

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
        state.similarBooksError = `유사 도서 검색어들을 찾는데 실패했습니다.`;

        console.error("similarBooks >> ", action);
      }
    );
  },
});

/**
 * "book"관련 액션 크리에이터
 */
export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
