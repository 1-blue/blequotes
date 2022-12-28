import { createSlice } from "@reduxjs/toolkit";

// thunk
import { postThunkService } from "../thunks";

// type
import { Post } from "../types";

interface PostState {
  // 게시글들
  moviePosts: Post[];
  dramaPosts: Post[];
  bookPosts: Post[];

  // 게시글 더 패치 가능 여부
  hasMoreMoviePosts: boolean;
  hasMoreDramaPosts: boolean;
  hasMoreBookPosts: boolean;

  // 게시글 생성
  createPostLoading: boolean;
  createPostDone: null | string;
  createPostError: null | string;

  // 게시글들 가져오기
  getPostsLoading: boolean;
  getPostsDone: null | string;
  getPostsError: null | string;

  // 게시글 좋아요/싫어요
  updateLikeOrHateLoading: boolean;
  updateLikeOrHateDone: null | string;
  updateLikeOrHateError: null | string;
}

const initialState: PostState = {
  moviePosts: [],
  dramaPosts: [],
  bookPosts: [],

  hasMoreMoviePosts: true,
  hasMoreDramaPosts: true,
  hasMoreBookPosts: true,

  createPostLoading: false,
  createPostDone: null,
  createPostError: null,

  getPostsLoading: false,
  getPostsDone: null,
  getPostsError: null,

  updateLikeOrHateLoading: false,
  updateLikeOrHateDone: null,
  updateLikeOrHateError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetMessage(state) {
      state.createPostLoading = false;
      state.createPostDone = null;
      state.createPostError = null;

      state.getPostsLoading = false;
      state.getPostsDone = null;
      state.getPostsError = null;

      state.updateLikeOrHateLoading = false;
      state.updateLikeOrHateDone = null;
      state.updateLikeOrHateError = null;
    },
    reset(state) {
      state.moviePosts = [];
      state.dramaPosts = [];
      state.bookPosts = [];

      state.hasMoreMoviePosts = true;
      state.hasMoreDramaPosts = true;
      state.hasMoreBookPosts = true;
    },
  },

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    // 게시글 생성
    builder.addCase(postThunkService.createPostThunk.pending, (state) => {
      state.createPostLoading = true;
    });
    builder.addCase(
      postThunkService.createPostThunk.fulfilled,
      (state, action) => {
        state.createPostLoading = false;
        state.createPostDone = action.payload.message;
      }
    );
    builder.addCase(
      postThunkService.createPostThunk.rejected,
      (state, action) => {
        state.createPostLoading = false;
        if (action.payload?.message) {
          state.createPostError = action.payload.message;
        }

        console.error("createPost >> ", action);
      }
    );

    // 게시글들 가져오기
    builder.addCase(postThunkService.getPostsThunk.pending, (state) => {
      state.getPostsLoading = true;
    });
    builder.addCase(
      postThunkService.getPostsThunk.fulfilled,
      (state, action) => {
        state.getPostsLoading = false;
        state.getPostsDone = action.payload.message;

        switch (action.payload.category) {
          case "MOVIE":
            state.moviePosts.push(...action.payload.posts);
            state.hasMoreMoviePosts =
              action.payload.take === action.payload.posts.length;
            break;
          case "DRAMA":
            state.dramaPosts = action.payload.posts;
            break;
          case "BOOK":
            state.bookPosts = action.payload.posts;
            break;
        }
      }
    );
    builder.addCase(
      postThunkService.getPostsThunk.rejected,
      (state, action) => {
        state.getPostsLoading = false;
        if (action.payload?.message) {
          state.getPostsError = action.payload.message;
        }

        console.error("getPosts >> ", action);
      }
    );

    // 게시글에 좋아요/싫어요 요청
    builder.addCase(postThunkService.updateLikeOrHate.pending, (state) => {
      state.updateLikeOrHateLoading = true;
    });
    builder.addCase(
      postThunkService.updateLikeOrHate.fulfilled,
      (state, action) => {
        state.updateLikeOrHateLoading = false;
        state.updateLikeOrHateDone = action.payload.message;

        const { resultPost } = action.payload;

        if (!resultPost) return;

        let targetIndex = -1;

        switch (resultPost.category) {
          case "MOVIE":
            targetIndex = state.moviePosts.findIndex(
              (post) => post.id === resultPost.id
            );
            state.moviePosts[targetIndex] = resultPost;
            break;
          case "DRAMA":
            targetIndex = state.dramaPosts.findIndex(
              (drama) => drama.id !== resultPost.id
            );
            state.dramaPosts[targetIndex] = resultPost;
            break;
          case "BOOK":
            targetIndex = state.bookPosts.findIndex(
              (book) => book.id !== resultPost.id
            );
            state.bookPosts[targetIndex] = resultPost;
            break;
        }
      }
    );
    builder.addCase(
      postThunkService.updateLikeOrHate.rejected,
      (state, action) => {
        state.updateLikeOrHateLoading = false;
        if (action.payload?.message) {
          state.updateLikeOrHateError = action.payload.message;
        }

        console.error("updateLikeOrHate >> ", action);
      }
    );
  },
});

/**
 * "post"관련 액션 크리에이터
 */
export const postActions = postSlice.actions;

export default postSlice.reducer;
