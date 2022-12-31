/**
 * 2022/12/05 - 아이콘 형태 타입 - by 1-blue
 */
export type IconShape =
  | "search"
  | "arrowDown"
  | "plus"
  | "change"
  | "like"
  | "hate";

/**
 * 2022/12/16 - 검색 카테고리 - by 1-blue
 */
export type SearchCategory = "movie" | "drama" | "book";

/**
 * 2022/12/19 - 게시글 카테고리 - by 1-blue
 */
export type PostCategory = "MOVIE" | "DRAMA" | "BOOK";
/**
 * 게시글들 정렬 기준
 */
export type PostSortBy = "popular" | "latest";

/**
 * 2022/12/31 - 영화/드라마/도서 데이터 통합 타입 - by 1-blue
 * post, write 페이지는 공용으로 사용하기 때문에 데이터 이름을 맞춰주기 위함
 */
export type TargetData = {
  idx: string;
  category: string;
  title: string;
  description: string;
  paths: string[];
  date: string;
};

/**
 * 2022/12/26 - 로컬 스토리지에 저장할 데이터 타입 - by 1-blue
 * 특정 게시글에 좋아요/싫어요에 관한 데이터
 */
export type LStorageData = {
  postId: number;
  isLike: boolean;
};

/**
 * 2022/12/30 - "<Link>"로 특정 대상의 페이지로 이동하는 경우 송신 및 수신 타입 - by 1-blue
 */
export type LinkState = { state: { idx?: string; category?: PostCategory } };
