import { serverInstance } from "./index";

// type
import type {
  SearchBooksHandler,
  SuggestBooksHandler,
  SimilarBooksHandler,
  DetailBookHandler,
} from "../types";

/**
 * 2022/12/18 - 도서 검색 요청 - by 1-blue ( 2023/02/05 )
 * @param title 도서 제목
 * @returns 검색 도서 요청 Promise
 */
const apiSearchBooks: SearchBooksHandler = async ({ title }) =>
  serverInstance.get(`/api/book/search`, { params: { title } });

/**
 * 2022/12/18 - 추천 도서 검색어들 요청 - by 1-blue ( 2023/02/05 )
 * @param title 도서 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 도서 검색어들
 */
const apiSuggestedBooks: SuggestBooksHandler = async ({ keyword }) =>
  serverInstance.get(`/api/book/suggested`, { params: { keyword } });

/**
 * 2022/12/18 - 유사 도서들 요청 - by 1-blue ( 2023/02/05 )
 * @param title 도서의 저자
 * @returns 유사 도서들 요청 Promise
 */
const apiSimilaredBooks: SimilarBooksHandler = async ({ author }) =>
  serverInstance.get(`/api/book/similar`, { params: { author } });

/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 - by 1-blue ( 2023/02/05 )
 * @param bookIdx isbn
 * @returns 특정 도서 상세 정보 요청 Promise
 */
const apiDetailBook: DetailBookHandler = async ({ bookIdx }) =>
  serverInstance.get(`/api/book/detail`, { params: { bookIdx } });

/**
 * 2022/12/18 - 도서 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const bookApiService = {
  apiSearchBooks,
  apiSuggestedBooks,
  apiSimilaredBooks,
  apiDetailBook,
};
