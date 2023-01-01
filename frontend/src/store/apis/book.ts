import { serverInstance } from "./index";

// type
import type {
  DetailBookRequest,
  DetailBookResponse,
  SearchBooksRequest,
  SimilarBooksRequest,
  SimilarBooksResponse,
  SuggestBooksRequest,
  SuggestBooksResponse,
} from "../types";

/**
 * 2022/12/18 - 도서 검색 요청 - by 1-blue
 * @param title 도서 제목
 * @returns 검색된 도서들
 */
const apiSearchBooks = async ({ title }: SearchBooksRequest) =>
  await serverInstance.get(`/api/book/search`, {
    params: { title },
  });

/**
 * 2022/12/18 - 추천 도서 검색어 요청 - by 1-blue
 * @param title 도서 제목 ( 전체 or 일부분 )
 * @returns 검색된 추천 도서 검색어들
 */
const apiSuggestedBooks = async ({ keyword }: SuggestBooksRequest) =>
  await serverInstance.get<SuggestBooksResponse>(`/api/book/suggested`, {
    params: { keyword },
  });

/**
 * 2022/12/18 - 유사 도서들 요청 - by 1-blue
 * @param title 도서의 저자
 * @returns 검색된 유사 도서들
 */
const apiSimilaredBooks = async ({ author }: SimilarBooksRequest) =>
  await serverInstance.get<SimilarBooksResponse>(`/api/book/similar`, {
    params: { author },
  });

/**
 * 2022/12/31 - 특정 도서 상셍 정보 요청 - by 1-blue
 * @param bookIdx isbn
 * @returns 특정 도서 상셍 정보
 */
const apiDetailBook = async ({ bookIdx }: DetailBookRequest) =>
  await serverInstance.get<DetailBookResponse>(`/api/book/detail`, {
    params: { bookIdx },
  });

/**
 * 2022/12/18 - 도서 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const bookApiService = {
  apiSearchBooks,
  apiSuggestedBooks,
  apiSimilaredBooks,
  apiDetailBook,
};
