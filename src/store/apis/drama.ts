import { movieDBInstance } from "./index";

// type
import type {
  FetchDrama,
  ReceiveDrama,
  SearchDramaRequest,
  SearchDramaResponse,
  SuggestDramaRequest,
  SuggestDramaResponse,
  SimilarDramaRequest,
  SimilarDramaResponse,
} from "../types";

/**
 * 2022/12/15 - 특정 카테고리의 드라마들 요청 - by 1-blue
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 드라마들
 */
export const apiFetchDrama = async ({
  category,
  language = "ko-kr",
}: FetchDrama) =>
  await movieDBInstance.get<ReceiveDrama>(
    `/tv/${category}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=${language}`
  );

/**
 * 2022/12/15 - 드라마 검색 요청 - by 1-blue
 * @param title 드라마 제목
 * @returns 검색된 드라마
 */
export const apiSaerchDrama = async ({
  title,
  language = "ko-kr",
}: SearchDramaRequest) =>
  await movieDBInstance.get<SearchDramaResponse>(
    `/search/tv?api_key=${
      process.env.REACT_APP_MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(title)}`
  );

/**
 * 2022/12/15 - 추천 드라마 검색어 요청 - by 1-blue
 * @param title 드라마 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 드라마 검색어들
 */
export const apiSuggestedDrama = async ({
  keyword,
  language = "ko-kr",
}: SuggestDramaRequest) =>
  await movieDBInstance.get<SuggestDramaResponse>(
    `/search/tv?api_key=${
      process.env.REACT_APP_MOVIE_DB_API_KEY
    }&language=${language}&query=${encodeURI(keyword)}`
  );

/**
 * 2022/12/15 - 유사 드라마 검색어 요청 - by 1-blue
 * @param movieId "MovieDB"에서 받은 드라마 식별자
 * @returns 유사한 드라마들
 */
export const apiSimilarDrama = async ({
  dramaId,
  language = "ko-kr",
}: SimilarDramaRequest) =>
  await movieDBInstance.get<SimilarDramaResponse>(
    `/tv/${dramaId}/similar?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=${language}`
  );
