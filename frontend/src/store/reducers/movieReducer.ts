import { createSlice } from "@reduxjs/toolkit";

// thunk
import { movieThunkService } from "../thunks";

// type
import type { DetailMovie, Movie } from "../types";

interface MovieState {
  popular: Movie[];
  top_rated: Movie[];
  now_playing: Movie[];

  searchedMovies: Movie[];
  suggestedMovies: string[];
  similarMovies: Movie[];

  detailMovie: DetailMovie | null;

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

  // 특정 영화 상세 정보
  detailMovieLoading: boolean;
  detailMovieDone: null | string;
  detailMovieError: null | string;
}

const initialState: MovieState = {
  popular: [],
  top_rated: [],
  now_playing: [],

  searchedMovies: [],
  suggestedMovies: [],
  similarMovies: [],

  detailMovie: null,

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

  detailMovieLoading: false,
  detailMovieDone: null,
  detailMovieError: null,
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

      state.suggestedMoviesLoading = false;
      state.suggestedMoviesDone = null;
      state.suggestedMoviesError = null;

      state.similarMoviesLoading = false;
      state.similarMoviesDone = null;
      state.similarMoviesError = null;

      state.detailMovieLoading = false;
      state.detailMovieDone = null;
      state.detailMovieError = null;
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
        if (action.payload?.message) {
          state.fetchMoviesError = action.payload.message;
        }

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
        if (action.payload?.message) {
          state.searchMoviesError = action.payload.message;
        }

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
        state.suggestedMovies = action.payload.data.titles;
      }
    );
    builder.addCase(
      movieThunkService.suggestedMoviesThunk.rejected,
      (state, action) => {
        state.suggestedMoviesLoading = false;
        if (action.payload?.message) {
          state.suggestedMoviesError = action.payload.message;
        }

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
        if (action.payload?.message) {
          state.similarMoviesError = action.payload.message;
        }

        console.error("suggestedMovies >> ", action);
      }
    );

    // 특정 영화 상세 정보 요청
    builder.addCase(movieThunkService.detailMovieThunk.pending, (state) => {
      state.detailMovieLoading = true;
    });
    builder.addCase(
      movieThunkService.detailMovieThunk.fulfilled,
      (state, action) => {
        state.detailMovieLoading = false;
        state.detailMovieDone = action.payload.data.message;
        state.detailMovie = action.payload.data.movie;
      }
    );
    builder.addCase(
      movieThunkService.detailMovieThunk.rejected,
      (state, action) => {
        state.detailMovieLoading = false;
        if (action.payload?.message) {
          state.detailMovieError = action.payload.message;
        }

        console.error("detailMovie >> ", action);
      }
    );
  },
});

/**
 * "movie"관련 액션 크리에이터
 */
export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
