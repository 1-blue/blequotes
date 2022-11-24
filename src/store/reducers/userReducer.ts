import { createSlice } from "@reduxjs/toolkit";

// thunk
import { fetchUser } from "../thunks";

// type
import type { User } from "../types";

interface UserState {
  user: User | null;

  fetchUserLoading: boolean;
  fetchUserDone: null | string;
  fetchUserError: null | string;
}

/**
 * >>> 예시
 */
const initialState: UserState = {
  user: null,

  fetchUserLoading: false,
  fetchUserDone: null,
  fetchUserError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.fetchUserLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.fetchUserLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.fetchUserLoading = false;

      console.log("실패 >> ", action);
    });
  },
});

/**
 * "user"관련 액션 크리에이터
 */
export const userActions = userSlice.actions;

export default userSlice.reducer;
