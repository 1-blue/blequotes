// type
import type { ApiResponse } from ".";

// ============================== S3 presignedURL 생성 요청 관련 ==============================
/**
 * 2022/12/22 - S3에 presignedURL 요청 수신 타입 ( B -> S3 ) - by 1-blue
 */
export type ApiFetchPresignedURLRequest = {
  name: string;
};
/**
 * 2022/12/22 - S3에 presignedURL 요청 송신 타입 ( B -> S3 ) - by 1-blue
 */
export type ApiFetchPresignedURLResponse = {
  preSignedURL: string;
};
/**
 * 2022/12/22 - presignedURL 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type FetchPresignedURLRequest = ApiFetchPresignedURLRequest;
/**
 * 2022/12/22 - presignedURL 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type FetchPresignedURLResponse =
  ApiResponse<ApiFetchPresignedURLResponse>;

// ============================== S3 특정 이미지 제거 요청 관련 ==============================
/**
 * 2022/12/22 - S3에 특정 이미지 제거 요청 수신 타입 ( B -> S3 ) - by 1-blue
 */
export type ApiDeleteImageRequest = {
  name: string;
};
/**
 * 2022/12/22 - S3에 특정 이미지 제거 요청 송신 타입 ( B -> S3 ) - by 1-blue
 */
export type ApiDeleteImageResponse = {};
/**
 * 2022/12/22 - 특정 이미지 제거 요청 수신 타입 ( F -> B ) - by 1-blue
 */
export type DeleteImageRequest = ApiDeleteImageRequest;
/**
 * 2022/12/22 - 특정 이미지 제거 요청 송신 타입 ( B -> F ) - by 1-blue
 */
export type DeleteImageResponse = ApiResponse<ApiDeleteImageResponse>;
