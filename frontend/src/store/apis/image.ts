import axios from "axios";
import { serverInstance } from ".";

// type
import type {
  FetchPresignedURLHandler,
  CreateImageHandler,
  DeleteImageHandler,
} from "../types";

/**
 * 2022/12/22 - presignedURL 요청 - by 1-blue ( 2023/02/05 )
 * @param name 저장할 이미지의 이름
 * @returns presignedURL 요청 Promise
 */
const apiFetchPresinedURL: FetchPresignedURLHandler = async ({ name }) =>
  serverInstance.get(`/api/image`, { params: { name } });

/**
 * 2022/12/22 - S3에 이미지 생성 요청 - by 1-blue ( 2023/02/05 )
 * @param preSignedURL AWS-S3의 presignedURL
 * @param file 입력받은 파일 객체
 * @returns S3에 이미지 생성 요청 Promise ( 네트워크 요청의 응답 데이터는 사용하지 않음 )
 */
const apiCreateImage: CreateImageHandler = async ({ preSignedURL, file }) =>
  axios.put(preSignedURL, file, { headers: { "Content-Type": file.type } });

/**
 * 2022/12/22 - S3에 이미지 제거 요청 - by 1-blue ( 2023/02/05 )
 * @param name 삭제할 이미지의 이름
 * @returns S3에 이미지 제거 요청 Promise ( 네트워크 요청의 응답 데이터는 사용하지 않음 )
 */
const apiDeleteImage: DeleteImageHandler = async ({ name }) =>
  serverInstance.delete(`/api/image`, { params: { name } });

/**
 * 2022/12/22 - 이미지 api 요청 메서드들을 갖는 객체 - by 1-blue
 */
export const imageApiService = {
  apiFetchPresinedURL,
  apiCreateImage,
  apiDeleteImage,
};
