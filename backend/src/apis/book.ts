import { bookInstance } from "./index";

// type
import type {
  ApiSearchBooksHandler,
  ApiSuggestedBooksHandler,
  ApiSimilarBooksHandler,
  ApiDetailBookHandler,
} from "../types";

/**
 * 2022/12/18 - 도서 검색 요청 - by 1-blue ( 2023/02/04 )
 * @param title 도서 제목
 * @returns 도서 검색 요청 Promise
 */
export const apiSearchBooks: ApiSearchBooksHandler = async ({ title }) =>
  bookInstance.get(`/v3/search/book`, {
    params: { page: 1, size: 20, query: title },
  });

/**
 * 2022/12/18 - 도서 추천 검색어 요청 - by 1-blue ( 2023/02/04 )
 * @param keyword 도서 제목 or 저자 ( 전체 or 일부분 )
 * @returns 도서 추천 검색어 요청의 Promise
 */
export const apiSuggestedBooks: ApiSuggestedBooksHandler = async ({
  keyword,
}) =>
  bookInstance.get(`/v3/search/book`, {
    params: { page: 1, size: 20, query: keyword },
  });

/**
 * 2022/12/18 - 유사 도서들 요청 ( 같은 저자 ) - by 1-blue ( 2023/02/04 )
 * @param author 저자 성명
 * @returns 유사 도서들 요청의 Promise ( 같은 저자인 도서 )
 */
export const apiSimilarBooks: ApiSimilarBooksHandler = async ({ author }) =>
  bookInstance.get(`/v3/search/book`, {
    params: { page: 1, size: 20, target: "person", query: author },
  });

/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 - by 1-blue ( 2023/02/04 )
 * @param bookIdx isbn
 * @returns 특정 도서 상세 정보 요청의 Promise
 */
export const apiDetailBook: ApiDetailBookHandler = async ({ bookIdx }) =>
  bookInstance.get(`/v3/search/book`, {
    params: { page: 1, size: 10, target: "isbn", query: bookIdx },
  });

/**
 * 2022/12/18 - 도서 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const bookService = {
  apiSearchBooks,
  apiSuggestedBooks,
  apiSimilarBooks,
  apiDetailBook,
};
