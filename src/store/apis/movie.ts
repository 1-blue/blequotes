import { movieDBInstance } from "./index";

// type
import type {
  FetchMoive,
  ReceiveMoive,
  SearchMoiveRequest,
  SearchMoiveResponse,
} from "../types";

/**
 * 2022/12/05 - 특정 카테고리의 영화들 요청 - by 1-blue
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 영화들
 */
export const apiFetchMovie = async ({
  category,
  language = "ko-kr",
}: FetchMoive) =>
  await movieDBInstance.get<ReceiveMoive>(
    `/movie/${category}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=${language}`
  );

/**
 * 2022/12/07 - 영화 검색 요청 - by 1-blue
 * @param title 영화 제목
 * @returns 검색된 영화
 */
export const apiSaerchMovie = async ({
  title,
  language = "ko-kr",
}: SearchMoiveRequest) =>
  await movieDBInstance.get<SearchMoiveResponse>(
    `/search/movie?api_key=${
      process.env.REACT_APP_MOVIE_API_KEY
    }&language=${language}&query=${encodeURI(title)}`
  );
