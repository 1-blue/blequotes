import { createSlice } from "@reduxjs/toolkit";

// thunk
import {
  fetchDrama,
  searchDrama,
  similarDrama,
  suggestedDrama,
} from "../thunks";

// type
import type {
  ReceiveDrama,
  SearchDramaResponse,
  SimilarDramaResponse,
  SuggestDramaResponse,
} from "../types";

interface DramaState {
  popular: ReceiveDrama | null;
  top_rated: ReceiveDrama | null;
  on_the_air: ReceiveDrama | null;
  searchedDramas: SearchDramaResponse | null;
  suggestedDramas: SuggestDramaResponse | null;
  similarDramas: SimilarDramaResponse | null;

  // 특정 카테고리의 드라마들 요청
  fetchDramaLoading: boolean;
  fetchDramaDone: null | string;
  fetchDramaError: null | string;

  // 드라마 검색
  searchDramaLoading: boolean;
  searchDramaDone: null | string;
  searchDramaError: null | string;

  // 추천 검색어
  suggestedDramaLoading: boolean;
  suggestedDramaDone: null | string;
  suggestedDramaError: null | string;

  // 유사 검색어
  similarDramaLoading: boolean;
  similarDramaDone: null | string;
  similarDramaError: null | string;
}

const initialState: DramaState = {
  popular: null,
  top_rated: null,
  on_the_air: null,
  searchedDramas: null,
  suggestedDramas: null,
  similarDramas: null,

  fetchDramaLoading: false,
  fetchDramaDone: null,
  fetchDramaError: null,

  searchDramaLoading: false,
  searchDramaDone: null,
  searchDramaError: null,

  suggestedDramaLoading: false,
  suggestedDramaDone: null,
  suggestedDramaError: null,

  similarDramaLoading: false,
  similarDramaDone: null,
  similarDramaError: null,
};

const dramaSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMessage(state) {
      state.fetchDramaLoading = false;
      state.fetchDramaDone = null;
      state.fetchDramaError = null;

      state.searchDramaLoading = false;
      state.searchDramaDone = null;
      state.searchDramaError = null;
    },
  },

  // "thunk"가 적용된 액션 ( 비동기 액션 )
  extraReducers(builder) {
    // 특정 카테고리의 드라마들 요청
    builder.addCase(fetchDrama.pending, (state) => {
      state.fetchDramaLoading = true;
    });
    builder.addCase(fetchDrama.fulfilled, (state, action) => {
      state.fetchDramaLoading = false;
      state.fetchDramaDone = "드라마들을 가져오는데 성공했습니다.";
      state[action.meta.arg.category] = action.payload;
    });
    builder.addCase(fetchDrama.rejected, (state, action) => {
      state.fetchDramaLoading = false;
      state.fetchDramaError = "드라마들을 가져오는데 실패했습니다.";

      console.error("fetchDrama >> ", action);
    });

    // 드라마 검색
    builder.addCase(searchDrama.pending, (state) => {
      state.searchDramaLoading = true;
    });
    builder.addCase(searchDrama.fulfilled, (state, action) => {
      state.searchDramaLoading = false;
      state.searchDramaDone = `드라마를 검색했습니다.`;
      state.searchedDramas = action.payload;
    });
    builder.addCase(searchDrama.rejected, (state, action) => {
      state.searchDramaLoading = false;
      state.searchDramaError = `드라마 검색에 실패했습니다.`;

      console.error("searchDrama >> ", action);
    });

    // 추천 드라마 검색어
    builder.addCase(suggestedDrama.pending, (state) => {
      state.suggestedDramaLoading = true;
    });
    builder.addCase(suggestedDrama.fulfilled, (state, action) => {
      state.suggestedDramaLoading = false;
      state.suggestedDramaDone = `추천 드라마 검색어들을 검색했습니다.`;
      state.suggestedDramas = action.payload;
    });
    builder.addCase(suggestedDrama.rejected, (state, action) => {
      state.suggestedDramaLoading = false;
      state.suggestedDramaError = `추천 드라마 검색어들을 찾는데 실패했습니다.`;

      console.error("suggestedDrama >> ", action);
    });

    // 유사 드라마 검색
    builder.addCase(similarDrama.pending, (state) => {
      state.similarDramaLoading = true;
    });
    builder.addCase(similarDrama.fulfilled, (state, action) => {
      state.similarDramaLoading = false;
      state.similarDramaDone = `유사 드라마들을 검색했습니다.`;
      state.similarDramas = action.payload;
    });
    builder.addCase(similarDrama.rejected, (state, action) => {
      state.similarDramaLoading = false;
      state.similarDramaError = `유사 드라마들의 검색에 실패했습니다.`;

      console.error("suggestedDrama >> ", action);
    });
  },
});

/**
 * "drama"관련 액션 크리에이터
 */
export const dramaActions = dramaSlice.actions;

export default dramaSlice.reducer;
