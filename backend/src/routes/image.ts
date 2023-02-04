import express from "express";

// util
import { getPresignedURL } from "../utils";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  FetchPresignedURLRequest,
  FetchPresignedURLResponse,
} from "../types";

const imageRouter = express.Router();

// S3에 presignedURL 요청
imageRouter.get(
  "/",
  async (
    req: Request<{}, {}, {}, FetchPresignedURLRequest>,
    res: Response<FetchPresignedURLResponse>,
    next: NextFunction
  ) => {
    try {
      const { name } = req.query;

      const response = getPresignedURL({ name });

      res.status(201).json({
        meta: { ok: true },
        data: {
          ...response,
          message: "presignedURL을 성공적으로 생성했습니다.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default imageRouter;
