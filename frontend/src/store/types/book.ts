// type
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
export type SearchBooksRequest = {
  title: string;
};
/**
 * 2022/12/18 - 도서들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchBooksResponse = ApiResponse<{ books: Book[] }>;

// ============================== 도서 추천 검색어 관련 ==============================
/**
 * 2022/12/18 - 도서들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestBooksRequest = {
  keyword: string;
};
/**
 * 2022/12/18 - 도서들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestBooksResponse = ApiResponse<{ titles: string[] }>;

// ============================== 유사 도서 관련 ==============================
/**
 * 2022/12/18 - 유사 도서들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarBooksRequest = {
  author: string;
};
/**
 * 2022/12/18 - 유사 도서들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarBooksResponse = ApiResponse<{ books: Book[] }>;

// ============================== 특정 도서 상세 정보 요청 관련 ==============================
/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type DetailBookRequest = {
  bookIdx: string;
};
/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type DetailBookResponse = ApiResponse<{ book: Book }>;
