import { serverInstance } from ".";

// type
import type {
  FetchDramasHandler,
  SearchDramasHandler,
  SuggestDramasHandler,
  SimilarDramasHandler,
  DetailDramaHandler,
} from "../types";

/**
 * 2022/12/15 - 특정 카테고리의 드라마들 요청 - by 1-blue ( 2023/02/05 )
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 드라마들
 */
const apiFetchDramas: FetchDramasHandler = async ({
  category,
  language = "ko-kr",
}) => serverInstance.get(`/api/drama`, { params: { category, language } });

/**
 * 2022/12/15 - 드라마 검색 요청 - by 1-blue ( 2023/02/05 )
 * @param title 드라마 제목
 * @returns 드라마 검색 요청 Promise
 */
const apiSearchDramas: SearchDramasHandler = async ({
  title,
  language = "ko-kr",
}) => serverInstance.get(`/api/drama/search`, { params: { title, language } });

/**
 * 2022/12/15 - 추천 드라마들 요청 - by 1-blue ( 2023/02/05 )
 * @param title 드라마 제목 ( 전체 or 일부분 )
 * @returns 추천 드라마들 요청 Promise
 */
const apiSuggestedDramas: SuggestDramasHandler = async ({
  keyword,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/drama/suggested`, { params: { keyword, language } });

/**
 * 2022/12/15 - 유사 드라마들 요청 - by 1-blue ( 2023/02/05 )
 * @param movieId "MovieDB"에서 받은 드라마 식별자
 * @returns 유사 드라마들 요청 Promise
 */
const apiSimilarDramas: SimilarDramasHandler = async ({
  dramaIdx,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/drama/similar`, { params: { dramaIdx, language } });

/**
 * 2022/12/31 - 특정 드라마 상세 정보 요청 - by 1-blue ( 2023/02/05 )
 * @param dramaIdx "MovieDB"에서 받은 드라마 식별자
 * @returns 특정 드라마 상세 정보 요청 Promise
 */
const apiDetailDrama: DetailDramaHandler = async ({
  dramaIdx,
  language = "ko-kr",
}) =>
  serverInstance.get(`/api/drama/detail`, { params: { dramaIdx, language } });

/**
 * 2022/12/17 - 드라마 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const dramaApiService = {
  apiFetchDramas,
  apiSearchDramas,
  apiSuggestedDramas,
  apiSimilarDramas,
  apiDetailDrama,
};
