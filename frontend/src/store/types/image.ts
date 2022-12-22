// type
import type { ApiResponse } from ".";

// >>> ***** 해당 요청들은 redux를 통하지 않고 요청함 ( 굳이 저장할 필요 없이 한번 쓰고 버릴 데이터이기 때문 ) *****

// ============================== S3 presignedURL 생성 요청 관련 ==============================
/**
 * 2022/12/22 - presignedURL 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type FetchPresignedURLRequest = {
  name: string;
};
/**
 * 2022/12/22 - presignedURL 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type FetchPresignedURLResponse = ApiResponse<{ preSignedURL: string }>;

// ============================== S3 특정 이미지 생성 요청 관련 ==============================
/**
 * 2022/12/22 - S3 이미지 생성 요청 수신 타입 ( F -> S3 ) - by 1-blue
 */
export type CreateImageRequest = {
  preSignedURL: string;
  file: File;
};
/**
 * 2022/12/22 - S3 이미지 생성 요청 송신 타입 ( S3 -> F ) - by 1-blue
 */
export type CreateImageResponse = {};

// ============================== S3 특정 이미지 제거 요청 관련 ==============================
/**
 * 2022/12/22 - S3 이미지 제거 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type DeleteImageRequest = {
  name: string;
};
/**
 * 2022/12/22 - S3 이미지 제거 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type DeleteImageResponse = ApiResponse<{}>;
