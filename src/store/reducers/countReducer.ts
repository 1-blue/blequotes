import { createSlice } from "@reduxjs/toolkit";

// type
import type { PayloadAction } from "@reduxjs/toolkit";

interface CountState {
  count: number;
}

const initialState: CountState = {
  count: 0,
};

/**
 * >>> 예시
 */
const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    addCount(state, action: PayloadAction<{ count: number }>) {
      state.count = action.payload.count;
    },
  },
});

/**
 * "count"관련 액션 크리에이터
 */
export const countActions = countSlice.actions;

export default countSlice.reducer;
