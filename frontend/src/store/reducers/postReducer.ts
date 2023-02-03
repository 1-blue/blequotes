import { createSlice } from "@reduxjs/toolkit";

// thunk
import { postThunkService } from "../thunks";

// type
import { Post } from "../types";

interface PostState {
  // 게시글들
  posts: Post[]; // 카테고리 구분 없이 모든 게시글들
  moviePosts: Post[];
  dramaPosts: Post[];
  bookPosts: Post[];
  targetPosts: Post[]; // 특정 대상의 게시글들

  // 게시글 더 패치 가능 여부
  hasMorePosts: boolean;
  hasMoreMoviePosts: boolean;
  hasMoreDramaPosts: boolean;
  hasMoreBookPosts: boolean;
  hasMoreTargetPosts: boolean;

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

  // 특정 대상의 게시글들
  getPostsOfTargetLoading: boolean;
  getPostsOfTargetDone: null | string;
  getPostsOfTargetError: null | string;
}

const initialState: PostState = {
  posts: [],
  moviePosts: [],
  dramaPosts: [],
  bookPosts: [],
  targetPosts: [],

  hasMorePosts: true,
  hasMoreMoviePosts: true,
  hasMoreDramaPosts: true,
  hasMoreBookPosts: true,
  hasMoreTargetPosts: true,

  createPostLoading: false,
  createPostDone: null,
  createPostError: null,

  getPostsLoading: false,
  getPostsDone: null,
  getPostsError: null,

  updateLikeOrHateLoading: false,
  updateLikeOrHateDone: null,
  updateLikeOrHateError: null,

  getPostsOfTargetLoading: false,
  getPostsOfTargetDone: null,
  getPostsOfTargetError: null,
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

      state.getPostsOfTargetLoading = false;
      state.getPostsOfTargetDone = null;
      state.getPostsOfTargetError = null;
    },
    reset(state) {
      state.posts = [];
      state.moviePosts = [];
      state.dramaPosts = [];
      state.bookPosts = [];
      state.targetPosts = [];

      state.hasMorePosts = true;
      state.hasMoreMoviePosts = true;
      state.hasMoreDramaPosts = true;
      state.hasMoreBookPosts = true;
      state.hasMoreTargetPosts = true;
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
          case "ALL":
            state.posts.push(...action.payload.posts);
            state.hasMorePosts =
              action.payload.take === action.payload.posts.length;
            break;
          case "MOVIE":
            state.moviePosts.push(...action.payload.posts);
            state.hasMoreMoviePosts =
              action.payload.take === action.payload.posts.length;
            break;
          case "DRAMA":
            state.dramaPosts.push(...action.payload.posts);
            state.hasMoreDramaPosts =
              action.payload.take === action.payload.posts.length;
            break;
          case "BOOK":
            state.bookPosts.push(...action.payload.posts);
            state.hasMoreBookPosts =
              action.payload.take === action.payload.posts.length;
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

        // 상세 페이지에서 좋아요/싫어요 누른 경우
        if (state.targetPosts.length !== 0) {
          targetIndex = state.targetPosts.findIndex(
            (book) => book.id === resultPost.id
          );
          state.targetPosts[targetIndex] = resultPost;
        }
        // 상세 페이지를 제외한 나머지 페이지에서 좋아요/싫어요 누른 경우
        else {
          switch (resultPost.category) {
            case "MOVIE":
              targetIndex = state.moviePosts.findIndex(
                (post) => post.id === resultPost.id
              );
              state.moviePosts[targetIndex] = resultPost;
              break;
            case "DRAMA":
              targetIndex = state.dramaPosts.findIndex(
                (drama) => drama.id === resultPost.id
              );
              state.dramaPosts[targetIndex] = resultPost;
              break;
            case "BOOK":
              targetIndex = state.bookPosts.findIndex(
                (book) => book.id === resultPost.id
              );
              state.bookPosts[targetIndex] = resultPost;
              break;
          }
        }

        // 메인 페이지에서 누를 경우
        if (state.posts.length >= 1) {
          targetIndex = state.posts.findIndex(
            (post) => post.id === resultPost.id
          );
          if (targetIndex !== -1) state.posts[targetIndex] = resultPost;
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

    // 특정 대상의 게시글들 요청
    builder.addCase(postThunkService.getPostsOfTarget.pending, (state) => {
      state.getPostsLoading = true;
    });
    builder.addCase(
      postThunkService.getPostsOfTarget.fulfilled,
      (state, action) => {
        state.getPostsLoading = false;
        state.getPostsDone = action.payload.message;

        state.targetPosts.push(...action.payload.posts);
        state.hasMoreTargetPosts =
          action.payload.take === action.payload.posts.length;
      }
    );
    builder.addCase(
      postThunkService.getPostsOfTarget.rejected,
      (state, action) => {
        state.getPostsLoading = false;
        if (action.payload?.message) {
          state.getPostsError = action.payload.message;
        }

        console.error("getPostsOfTarget >> ", action);
      }
    );
  },
});

/**
 * "post"관련 액션 크리에이터
 */
export const postActions = postSlice.actions;

export default postSlice.reducer;
