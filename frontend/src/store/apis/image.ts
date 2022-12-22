import axios from "axios";
import { serverInstance } from ".";

// type
import type {
  FetchPresignedURLRequest,
  FetchPresignedURLResponse,
  CreateImageRequest,
  CreateImageResponse,
  DeleteImageRequest,
  DeleteImageResponse,
} from "../types";

/**
 * 2022/12/22 - presignedURL 요청 - by 1-blue
 * @returns presignedURL, 업로드된 이미지에 접근할 URL
 */
const apiFetchPresinedURL = async ({ name }: FetchPresignedURLRequest) =>
  await serverInstance.get<FetchPresignedURLResponse>(
    `/api/image?name=${name}`
  );

/**
 * 2022/12/22 - 이미지 생성 요청 ( S3 ) - by 1-blue
 * @param param0
 * @returns
 */
const apiCreateImage = async ({ preSignedURL, file }: CreateImageRequest) =>
  await axios.put<CreateImageResponse>(preSignedURL, file, {
    headers: { "Content-Type": file.type },
  });

/**
 * 2022/12/22 - 이미지 제거 요청 ( S3 ) - by 1-blue
 */
const apiDeleteImage = async ({ name }: DeleteImageRequest) =>
  await serverInstance.delete<DeleteImageResponse>(`/api/image?name=${name}`);

/**
 * 2022/12/22 - 이미지 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const imageApiService = {
  apiFetchPresinedURL,
  apiCreateImage,
  apiDeleteImage,
};
