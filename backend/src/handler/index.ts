// type
import { AxiosError } from "axios";
import type { ErrorRequestHandler, Response } from "express";
import type { ApiErrorResponse } from "../types";

/**
 * 에러 처리 핸들러
 * @param error 에러 객체
 * @param req "express"의 request
 * @param res "express"의 response
 * @param next "express"의 next
 */
export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res: Response<ApiErrorResponse>,
  next
) => {
  if (error instanceof AxiosError) {
    console.error("axios 에러 >> ", error);

    res.status(500).json({
      meta: { ok: false, type: "axios" },
      data: { message: "API측 문제입니다.\n잠시후에 다시 시도해주세요!" },
    });
  } else {
    console.error("알 수 없는 에러 >> ", error);

    res.status(500).json({
      meta: { ok: false, type: "unknown" },
      data: { message: "서버의 문제입니다.\n잠시후에 다시 시도해주세요!" },
    });
  }
};
