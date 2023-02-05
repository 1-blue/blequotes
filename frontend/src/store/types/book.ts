// type
import type { AxiosResponse } from "axios";
import type { ApiResponse } from ".";

export type Book = {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};

// ============================== 도서 검색 관련 ==============================
/**
 * 2022/12/18 - 도서들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
type SearchBooksRequest = {
  title: string;
};
/**
 * 2022/12/18 - 도서들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchBooksResponse = ApiResponse<{ books: Book[] }>;
/**
 * 2023/02/05 - 도서들 검색 API 요청 함수 시그니처 - by 1-blue
 */
export type SearchBooksHandler = (
  body: SearchBooksRequest
) => Promise<AxiosResponse<SearchBooksResponse, any>>;

// ============================== 도서 추천 검색어 관련 ==============================
/**
 * 2022/12/18 - 도서 추천 검색어들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
type SuggestBooksRequest = {
  keyword: string;
};
/**
 * 2022/12/18 - 도서 추천 검색어들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestBooksResponse = ApiResponse<{ titles: string[] }>;
/**
 * 2023/02/05 - 도서 추천 검색어들 API 요청 함수 시그니처 - by 1-blue
 */
export type SuggestBooksHandler = (
  body: SuggestBooksRequest
) => Promise<AxiosResponse<SuggestBooksResponse, any>>;

// ============================== 유사 도서 관련 ==============================
/**
 * 2022/12/18 - 유사 도서들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
type SimilarBooksRequest = {
  author: string;
};
/**
 * 2022/12/18 - 유사 도서들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarBooksResponse = ApiResponse<{ books: Book[] }>;
/**
 * 2023/02/05 - 유사 도서들 API 요청 함수 시그니처 - by 1-blue
 */
export type SimilarBooksHandler = (
  body: SimilarBooksRequest
) => Promise<AxiosResponse<SimilarBooksResponse, any>>;

// ============================== 특정 도서 상세 정보 요청 관련 ==============================
/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 송신 타입 ( F -> B ) - by 1-blue
 */
type DetailBookRequest = {
  bookIdx: string;
};
/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type DetailBookResponse = ApiResponse<{ book: Book }>;
/**
 * 2023/02/05 - 특정 도서 상세 정보 API 요청 함수 시그니처 - by 1-blue
 */
export type DetailBookHandler = (
  body: DetailBookRequest
) => Promise<AxiosResponse<DetailBookResponse, any>>;
