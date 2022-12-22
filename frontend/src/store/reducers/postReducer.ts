import { createSlice } from "@reduxjs/toolkit";

// thunk
import { postThunkService } from "../thunks";

interface PostState {
  // 게시글 생성
  createPostLoading: boolean;
  createPostDone: null | string;
  createPostError: null | string;
}

const initialState: PostState = {
  createPostLoading: false,
  createPostDone: null,
  createPostError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetMessage(state) {
      state.createPostLoading = false;
      state.createPostDone = null;
      state.createPostError = null;
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
        state.createPostError = "게시글을 생성하는데 실패했습니다.";

        console.error("createPost >> ", action);
      }
    );
  },
});

/**
 * "post"관련 액션 크리에이터
 */
export const postActions = postSlice.actions;

export default postSlice.reducer;
