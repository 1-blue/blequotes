import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

// api
import { dramaApiService } from "../apis";

// type
import type {
  CreateAsyncThunkErrorType,
  FetchDramasHandler,
  FetchDramasResponse,
  SearchDramasHandler,
  SearchDramasResponse,
  SuggestDramasHandler,
  SuggestDramasResponse,
  SimilarDramasHandler,
  SimilarDramasResponse,
  DetailDramaResponse,
  DetailDramaHandler,
} from "../types";

/**
 * 2022/12/15 - 드라마 패치 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const fetchDramasThunk = createAsyncThunk<
  FetchDramasResponse,
  Parameters<FetchDramasHandler>[0],
  CreateAsyncThunkErrorType
>(
  // 액션 타입 결정
  "fetch/drama",

  // promise를 반환하는 액션 작성
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await dramaApiService.apiFetchDramas(body);

      return data;
    } catch (error) {
      console.error("error >> ", error);

      if (error instanceof AxiosError) {
        return rejectWithValue({ message: error.response?.data.data.message });
      }

      return rejectWithValue({
        message: "알 수 없는 이유로 드라마들을 가져오는데 실패했습니다.",
      });
    }
  }
);

/**
 * 2022/12/15 - 드라마 검색 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const searchDramasThunk = createAsyncThunk<
  SearchDramasResponse,
  Parameters<SearchDramasHandler>[0],
  CreateAsyncThunkErrorType
>("search/drama", async (body, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiSearchDramas(body);
    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 드라마 검색에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/15 - 추천 드라마 검색어 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const suggestedDramasThunk = createAsyncThunk<
  SuggestDramasResponse,
  Parameters<SuggestDramasHandler>[0],
  CreateAsyncThunkErrorType
>("suggested/drama", async (body, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiSuggestedDramas(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 드라마 추천 검색어 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/15 - 유사 드라마 검색 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const similarDramasThunk = createAsyncThunk<
  SimilarDramasResponse,
  Parameters<SimilarDramasHandler>[0],
  CreateAsyncThunkErrorType
>("similar/drama", async (body, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiSimilarDramas(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 유사 드라마 검색에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/31 - 특정 드라마 상세 정보 요청 thunk - by 1-blue ( 2023/02/05 )
 */
const detailDramaThunk = createAsyncThunk<
  DetailDramaResponse,
  Parameters<DetailDramaHandler>[0],
  CreateAsyncThunkErrorType
>("detail/drama", async (body, { rejectWithValue }) => {
  try {
    const { data } = await dramaApiService.apiDetailDrama(body);

    return data;
  } catch (error) {
    console.error("error >> ", error);

    if (error instanceof AxiosError) {
      return rejectWithValue({ message: error.response?.data.data.message });
    }

    return rejectWithValue({
      message: "알 수 없는 이유로 특정 드라마 정보 요청에 실패했습니다.",
    });
  }
});

/**
 * 2022/12/17 - 드라마 thunk 메서드들을 갖는 객체 - by 1-blue
 */
export const dramaThunkService = {
  fetchDramasThunk,
  searchDramasThunk,
  suggestedDramasThunk,
  similarDramasThunk,
  detailDramaThunk,
};
