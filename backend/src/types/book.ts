import type { AxiosResponse } from "axios";
import type { ApiResponse } from "./index";

/**
 * 2022/12/18 - 책 타입 - by 1-blue
 */
type Book = {
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

/**
 * 2022/12/18 - 책 검색 수신 타입 ( B -> kakao ) - by 1-blue
 */
type ReceiveBook = {
  documents: Book[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
};

// ============================== 도서 검색 관련 ==============================
/**
 * 2022/12/18 - 도서들 검색 api 요청 송신 타입 ( B -> "Kakao" ) - by 1-blue
 */
type ApiSearchBooksRequest = {
  title: string;
};
/**
 * 2022/12/18 - 도서들 검색 api 요청 수신 타입 ( "Kakao" -> B ) - by 1-blue
 */
type ApiSearchBooksResponse = ReceiveBook;
/**
 * 2023/02/04 - 도서들 검색 API 요청 함수 시그니처 ( "Kakao" ) - by 1-blue
 */
export type ApiSearchBooksHandler = (
  body: ApiSearchBooksRequest
) => Promise<AxiosResponse<ApiSearchBooksResponse, any>>;

/**
 * 2022/12/18 - 도서들 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SearchBooksRequest = ApiSearchBooksRequest;
/**
 * 2022/12/18 - 도서들 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SearchBooksResponse = ApiResponse<{ books: Book[] }>;

// ============================== 도서 추천 검색어 관련 ==============================
/**
 * 2022/12/18 - 도서들의 추천 검색어 검색 api 요청 송신 타입 ( B -> "Kakao" ) - by 1-blue
 */
type ApiSuggestedBooksRequest = {
  keyword: string;
};
/**
 * 2022/12/18 - 도서들 추천 검색어 api 요청 수신 타입 ( "Kakao" -> B ) - by 1-blue
 */
type ApiSuggestedBooksResponse = ReceiveBook;
/**
 * 2023/02/04 - 도서들 추천 검색어 API 요청 함수 시그니처 ( "Kakao" ) - by 1-blue
 */
export type ApiSuggestedBooksHandler = (
  body: ApiSuggestedBooksRequest
) => Promise<AxiosResponse<ApiSuggestedBooksResponse, any>>;

/**
 * 2022/12/18 - 드라마들 추천 검색어 검색 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SuggestedBooksRequest = ApiSuggestedBooksRequest;
/**
 * 2022/12/18 - 드라마들 추천 검색어 검색 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SuggestedBooksResponse = ApiResponse<{ titles: string[] }>;

// ============================== 유사 도서 관련 ==============================
/**
 * 2022/12/18 - 유사 도서들 api 요청 송신 타입 ( B -> "Kakao" ) - by 1-blue
 * ( 같은 저자 )
 */
type ApiSimilarBooksRequest = {
  author: string;
};
/**
 * 2022/12/18 - 유사 도서들 api 요청 수신 타입 ( "Kakao" -> B ) - by 1-blue
 */
type ApiSimilarBooksResponse = ReceiveBook;
/**
 * 2023/02/04 - 유사 도서들 API 요청 함수 시그니처 ( "Kakao" ) - by 1-blue
 */
export type ApiSimilarBooksHandler = (
  body: ApiSimilarBooksRequest
) => Promise<AxiosResponse<ApiSimilarBooksResponse, any>>;

/**
 * 2022/12/18 - 유사 도서들 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type SimilarBooksRequest = ApiSimilarBooksRequest;
/**
 * 2022/12/18 - 유사 도서들 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type SimilarBooksResponse = ApiResponse<{ books: Book[] }>;

// ============================== 특정 도서 상세 정보 요청 관련 ==============================
/**
 * 2022/12/31 - 특정 도서 상세 정보 api 요청 송신 타입 ( B -> "Kakao" ) - by 1-blue
 */
type ApiDetailBookRequest = {
  bookIdx: string;
};
/**
 * 2022/12/31 - 특정 도서 상세 정보 api 요청 수신 타입 ( "Kakao" -> B ) - by 1-blue
 */
type ApiDetailBookResponse = ReceiveBook;
/**
 * 2023/02/04 - 특정 도서 상세 정보 API 요청 함수 시그니처 ( "Kakao" ) - by 1-blue
 */
export type ApiDetailBookHandler = (
  body: ApiDetailBookRequest
) => Promise<AxiosResponse<ApiDetailBookResponse, any>>;

/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 송신 타입 ( F -> B ) - by 1-blue
 */
export type DetailBookRequest = ApiDetailBookRequest;
/**
 * 2022/12/31 - 특정 도서 상세 정보 요청 수신 타입 ( B -> F ) - by 1-blue
 */
export type DetailBookResponse = ApiResponse<{ book: Book }>;
