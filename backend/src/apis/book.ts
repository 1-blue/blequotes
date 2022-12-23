import { bookInstance } from "./index";

// type
import type {
  ApiSearchBooksRequest,
  ApiSearchBooksResponse,
  ApiSimilarBooksRequest,
  ApiSimilarBooksResponse,
  ApiSuggestedBooksRequest,
  ApiSuggestedBooksResponse,
} from "../types";

/**
 * 2022/12/18 - 도서 검색 요청 - by 1-blue
 * @param title 도서 제목
 * @returns 검색된 도서들
 */
export const apiSearchBooks = async ({ title }: ApiSearchBooksRequest) =>
  await bookInstance.get<ApiSearchBooksResponse>(`/v3/search/book`, {
    params: { page: 1, size: 20, query: title },
  });

/**
 * 2022/12/18 - 도서 추천 검색어 요청 - by 1-blue
 * @param title 도서 제목 or 저자 ( 전체 or 일부분 )
 * @returns 검색된 도서 추천 검색어들
 */
export const apiSuggestedBooks = async ({
  keyword,
}: ApiSuggestedBooksRequest) =>
  await bookInstance.get<ApiSuggestedBooksResponse>(`/v3/search/book`, {
    params: { page: 1, size: 20, query: keyword },
  });

/**
 * 2022/12/18 - 유사 도서 요청 ( 같은 저자 ) - by 1-blue
 * @param title 저자 성명
 * @returns 검색된 유사 도서들 ( 같은 저자인 도서 )
 */
export const apiSimilarBooks = async ({ author }: ApiSimilarBooksRequest) =>
  await bookInstance.get<ApiSimilarBooksResponse>(`/v3/search/book`, {
    params: { page: 1, size: 20, target: "person", query: author },
  });

/**
 * 2022/12/18 - 도서 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const bookService = {
  apiSearchBooks,
  apiSuggestedBooks,
  apiSimilarBooks,
};
