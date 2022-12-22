import AWS from "aws-sdk";

// type
import type {
  ApiDeleteImageRequest,
  ApiFetchPresignedURLRequest,
} from "../types";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
});

const S3 = new AWS.S3({
  apiVersion: "2012-10-17",
  signatureVersion: "v4",
});

/**
 * "이미지.확장자"를 받아서 "경로/이미지_시간.확장자"으로 변경해주는 함수
 * s3 폴더 구조는 `"개발모드"/images/이미지파일.확장자` 형태입니다.
 *
 * @param name "이미지.확장자" 형태로 전송
 * @returns "경로/이미지_시간.확장자" 형태로 반환
 */
const convertS3ImagePath = (name: string) => {
  const [filename, ext] = name.split(".");

  return `${process.env.NODE_ENV}/images/${filename}_${Date.now()}.${ext}`;
};

/**
 * S3의 "preSignedURL"을 생성하는 함수
 * @param name 이미지 이름  ("이미지.확장자" 형태 )
 * @returns "preSignedURL"와 "photoURL"을 반환 ( "photoURL"은 정상적으로 완료 시 이미지 url )
 */
export const getPresignedURL = ({ name }: ApiFetchPresignedURLRequest) => {
  const photoURL = convertS3ImagePath(name);

  const preSignedURL = S3.getSignedUrl("putObject", {
    Bucket: process.env.AWS_BUCKET,
    Key: photoURL,
    Expires: 20,
  });

  return { preSignedURL, photoURL };
};

/**
 * S3의 특정 이미지 제거
 * @param name 이미지 이름 ("이미지.확장자" 형태 )
 */
export const deleteImage = ({ name }: ApiDeleteImageRequest) =>
  S3.deleteObject(
    { Bucket: process.env.AWS_BUCKET, Key: name },
    (error, data) => {
      if (error) console.error("S3 이미지 제거 error >> ", error);
    }
  ).promise();
