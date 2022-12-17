import { createSlice } from "@reduxjs/toolkit";

// thunk
import { movieThunkService } from "../thunks";

// type
import type { Movie } from "../types";

interface MovieState {
  popular: Movie[];
  top_rated: Movie[];
  now_playing: Movie[];

  searchedMovies: Movie[];
  suggestedMovies: Movie[];
  similarMovies: Movie[];

  // 특정 카테고리의 영화들 요청
  fetchMoviesLoading: boolean;
  fetchMoviesDone: null | string;
  fetchMoviesError: null | string;

  // 영화 검색
  searchMoviesLoading: boolean;
  searchMoviesDone: null | string;
  searchMoviesError: null | string;

  // 추천 검색어
  suggestedMoviesLoading: boolean;
  suggestedMoviesDone: null | string;
  suggestedMoviesError: null | string;

  // 유사 검색어
  similarMoviesLoading: boolean;
  similarMoviesDone: null | string;
  similarMoviesError: null | string;
}

const initialState: MovieState = {
  popular: [],
  top_rated: [],
  now_playing: [],
  searchedMovies: [],
  suggestedMovies: [],
  similarMovies: [],

  fetchMoviesLoading: false,
  fetchMoviesDone: null,
  fetchMoviesError: null,

  searchMoviesLoading: false,
  searchMoviesDone: null,
  searchMoviesError: null,

  suggestedMoviesLoading: false,
  suggestedMoviesDone: null,
  suggestedMoviesError: null,

  similarMoviesLoading: false,
  similarMoviesDone: null,
  similarMoviesError: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMessage(state) {
      state.fetchMoviesLoading = false;
      state.fetchMoviesDone = null;
      state.fetchMoviesError = null;

      state.searchMoviesLoading = false;
      state.searchMoviesDone = null;
      state.searchMoviesError = null;
    },
  },

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    // 특정 카테고리의 영화들 요청
    builder.addCase(movieThunkService.fetchMoviesThunk.pending, (state) => {
      state.fetchMoviesLoading = true;
    });
    builder.addCase(
      movieThunkService.fetchMoviesThunk.fulfilled,
      (state, action) => {
        state.fetchMoviesLoading = false;
        state.fetchMoviesDone = action.payload.data.message;
        state[action.meta.arg.category] = action.payload.data.movies;
      }
    );
    builder.addCase(
      movieThunkService.fetchMoviesThunk.rejected,
      (state, action) => {
        state.fetchMoviesLoading = false;
        state.fetchMoviesError = "영화들을 가져오는데 실패했습니다.";

        console.error("fetchMovies >> ", action);
      }
    );

    // 영화 검색
    builder.addCase(movieThunkService.searchMoviesThunk.pending, (state) => {
      state.searchMoviesLoading = true;
    });
    builder.addCase(
      movieThunkService.searchMoviesThunk.fulfilled,
      (state, action) => {
        state.searchMoviesLoading = false;
        state.searchMoviesDone = action.payload.data.message;
        state.searchedMovies = action.payload.data.movies;
      }
    );
    builder.addCase(
      movieThunkService.searchMoviesThunk.rejected,
      (state, action) => {
        state.searchMoviesLoading = false;
        state.searchMoviesError = `영화 검색에 실패했습니다.`;

        console.error("searchMovies >> ", action);
      }
    );

    // 추천 영화 검색어
    builder.addCase(movieThunkService.suggestedMoviesThunk.pending, (state) => {
      state.suggestedMoviesLoading = true;
    });
    builder.addCase(
      movieThunkService.suggestedMoviesThunk.fulfilled,
      (state, action) => {
        state.suggestedMoviesLoading = false;
        state.suggestedMoviesDone = action.payload.data.message;
        state.suggestedMovies = action.payload.data.movies;
      }
    );
    builder.addCase(
      movieThunkService.suggestedMoviesThunk.rejected,
      (state, action) => {
        state.suggestedMoviesLoading = false;
        state.suggestedMoviesError = `추천 영화 검색어들을 찾는데 실패했습니다.`;

        console.error("suggestedMovies >> ", action);
      }
    );

    // 유사 영화 검색
    builder.addCase(movieThunkService.similarMoviesThunk.pending, (state) => {
      state.similarMoviesLoading = true;
    });
    builder.addCase(
      movieThunkService.similarMoviesThunk.fulfilled,
      (state, action) => {
        state.similarMoviesLoading = false;
        state.similarMoviesDone = action.payload.data.message;
        state.similarMovies = action.payload.data.movies;
      }
    );
    builder.addCase(
      movieThunkService.similarMoviesThunk.rejected,
      (state, action) => {
        state.similarMoviesLoading = false;
        state.similarMoviesError = `유사 영화들의 검색에 실패했습니다.`;

        console.error("suggestedMovies >> ", action);
      }
    );
  },
});

/**
 * "movie"관련 액션 크리에이터
 */
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
