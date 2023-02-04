import { movieDBInstance } from ".";

// type
import type {
  ApiFetchDramasHandler,
  ApiSearchDramasHandler,
  ApiSuggestDramasHandler,
  ApiSimilarDramasHandler,
  ApiDetailDramaHandler,
} from "../types";

/**
 * 2022/12/17 - 특정 카테고리의 드라마들 요청 - by 1-blue ( 2023/02/04 )
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 카테고리의 드라마들 요청의 Promise
 */
const apiFetchDramas: ApiFetchDramasHandler = async ({
  category,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/tv/${category}`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/17 - 드라마들 검색 요청 - by 1-blue ( 2023/02/04 )
 * @param title 드라마 제목
 * @param language 언어
 * @returns 드라마들 검색 요청의 Promise
 */
const apiSearchDramas: ApiSearchDramasHandler = async ({
  title,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/search/tv`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: title, language },
  });

/**
 * 2022/12/17 - 추천 드라마 검색어들 요청 - by 1-blue ( 2023/02/04 )
 * @param title 드라마 제목 ( 전체 or 일부분 )
 * @param language 언어
 * @returns 추천 드라마 검색어들 요청의 Promise
 */
const apiSuggestedDramas: ApiSuggestDramasHandler = async ({
  keyword,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/search/tv`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, query: keyword, language },
  });

/**
 * 2022/12/17 - 유사한 드라마들 요청 - by 1-blue ( 2023/02/04 )
 * @param dramaId "DramaDB"에서 받은 드라마 식별자
 * @param language 언어
 * @returns 유사한 드라마들 요청의 Promise
 */
const apiSimilarDramas: ApiSimilarDramasHandler = async ({
  dramaIdx,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/tv/${dramaIdx}/similar`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/31 - 특정 드라마 상세 정보 요청 - by 1-blue ( 2023/02/04 )
 * @param dramaIdx "MovieDB"에서 받은 드라마 식별자
 * @param language 언어
 * @returns 특정 드라마 상세 정보 요청의 Promise
 */
const apiDetailDrama: ApiDetailDramaHandler = async ({
  dramaIdx,
  language = "ko-kr",
}) =>
  movieDBInstance.get(`/tv/${dramaIdx}`, {
    params: { api_key: process.env.MOVIE_DB_API_KEY, language },
  });

/**
 * 2022/12/17 - 드라마 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const dramaService = {
  apiFetchDramas,
  apiSearchDramas,
  apiSuggestedDramas,
  apiSimilarDramas,
  apiDetailDrama,
};
