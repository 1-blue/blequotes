import { createSlice } from "@reduxjs/toolkit";

// thunk
import { fetchMovie } from "../thunks";

// type
import type { ReceiveMoive } from "../types";

interface MovieState {
  popular: ReceiveMoive | null;
  top_rated: ReceiveMoive | null;
  now_playing: ReceiveMoive | null;

  fetchMovieLoading: boolean;
  fetchMovieDone: null | string;
  fetchMovieError: null | string;
}

const initialState: MovieState = {
  popular: null,
  top_rated: null,
  now_playing: null,

  fetchMovieLoading: false,
  fetchMovieDone: null,
  fetchMovieError: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    builder.addCase(fetchMovie.pending, (state) => {
      state.fetchMovieLoading = true;
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.fetchMovieLoading = false;
      state[action.meta.arg.category] = action.payload;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.fetchMovieLoading = false;

      console.log("실패 >> ", action);
    });
  },
});

/**
 * "movie"관련 액션 크리에이터
 */
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
