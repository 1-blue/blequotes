import { createSlice } from "@reduxjs/toolkit";

// thunk
import { fetchMovie, searchMovie } from "../thunks";

// type
import type { ReceiveMoive, SearchMoiveResponse } from "../types";

interface MovieState {
  popular: ReceiveMoive | null;
  top_rated: ReceiveMoive | null;
  now_playing: ReceiveMoive | null;
  search: SearchMoiveResponse | null;

  // 특정 카테고리의 영화들 요청
  fetchMovieLoading: boolean;
  fetchMovieDone: null | string;
  fetchMovieError: null | string;

  // 영화 검색
  searchMovieLoading: boolean;
  searchMovieDone: null | string;
  searchMovieError: null | string;
}

const initialState: MovieState = {
  popular: null,
  top_rated: null,
  now_playing: null,
  search: null,

  fetchMovieLoading: false,
  fetchMovieDone: null,
  fetchMovieError: null,

  searchMovieLoading: false,
  searchMovieDone: null,
  searchMovieError: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMessage(state) {
      state.fetchMovieLoading = false;
      state.fetchMovieDone = null;
      state.fetchMovieError = null;

      state.searchMovieLoading = false;
      state.searchMovieDone = null;
      state.searchMovieError = null;
    },
  },

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    // 특정 카테고리의 영화들 요청
    builder.addCase(fetchMovie.pending, (state) => {
      state.fetchMovieLoading = true;
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.fetchMovieLoading = false;
      state[action.meta.arg.category] = action.payload;
      state.fetchMovieDone = "영화들을 가져오는데 성공했습니다.";
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.fetchMovieLoading = false;
      state.fetchMovieError = "영화들을 가져오는데 실패했습니다.";

      console.log("fetchMovie >> ", action);
    });

    // 영화 검색
    builder.addCase(searchMovie.pending, (state) => {
      state.searchMovieLoading = true;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.searchMovieLoading = false;
      state.search = action.payload;
      state.searchMovieDone = `영화를 검색했습니다.`;
    });
    builder.addCase(searchMovie.rejected, (state, action) => {
      state.searchMovieLoading = false;
      state.searchMovieError = `영화 검색에 실패했습니다.`;

      console.log("searchMovie >> ", action);
    });
  },
});

/**
 * "movie"관련 액션 크리에이터
 */
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
