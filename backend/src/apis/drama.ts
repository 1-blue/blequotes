import { movieDBInstance } from ".";

// type
import type {
  ApiFetchDramasRequest,
  ApiFetchDramasResponse,
  ApiSearchDramasRequest,
  ApiSearchDramasResponse,
  ApiSuggestDramasRequest,
  ApiSuggestDramasResponse,
  ApiSimilarDramasRequest,
  ApiSimilarDramasResponse,
} from "../types";

/**
 * 2022/12/17 - 특정 카테고리의 드라마들 요청 - by 1-blue
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 드라마들
 */
const apiFetchDramas = async ({
  category,
  language = "ko-kr",
}: ApiFetchDramasRequest) =>
  await movieDBInstance.get<ApiFetchDramasResponse>(
    `/tv/${category}?api_key=${process.env.MOVIE_DB_API_KEY}&language=${language}`
  );

/**
 * 2022/12/17 - 드라마 검색 요청 - by 1-blue
 * @param title 드라마 제목
 * @returns 검색된 드라마
 */
const apiSaerchDramas = async ({
  title,
  language = "ko-kr",
}: ApiSearchDramasRequest) =>
  await movieDBInstance.get<ApiSearchDramasResponse>(
    `/search/tv?api_key=${
      process.env.MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(title)}`
  );

/**
 * 2022/12/17 - 추천 드라마 검색어 요청 - by 1-blue
 * @param title 드라마 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 드라마 검색어들
 */
const apiSuggestedDramas = async ({
  keyword,
  language = "ko-kr",
}: ApiSuggestDramasRequest) =>
  await movieDBInstance.get<ApiSuggestDramasResponse>(
    `/search/tv?api_key=${
      process.env.MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(keyword)}`
  );

/**
 * 2022/12/17 - 유사 드라마 검색어 요청 - by 1-blue
 * @param movieId "DramaDB"에서 받은 드라마 식별자
 * @returns 유사한 드라마들
 */
const apiSimilarDramas = async ({
  dramaId,
  language = "ko-kr",
}: ApiSimilarDramasRequest) =>
  await movieDBInstance.get<ApiSimilarDramasResponse>(
    `/tv/${dramaId}/similar?api_key=${process.env.MOVIE_DB_API_KEY}&language=${language}`
  );

/**
 * 2022/12/17 - 드라마 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const dramaService = {
  apiFetchDramas,
  apiSaerchDramas,
  apiSuggestedDramas,
  apiSimilarDramas,
};
