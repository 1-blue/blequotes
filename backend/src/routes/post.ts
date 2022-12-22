import express from "express";

import { prisma } from "../../prisma";

// type
import type { Request, Response, NextFunction } from "express";
import type { CreatePostRequest, CreatePostResponse } from "../types";

const postRouter = express.Router();

// 게시글 생성 요청
postRouter.post(
  "/",
  async (
    req: Request<{}, {}, CreatePostRequest, {}>,
    res: Response<CreatePostResponse>,
    next: NextFunction
  ) => {
    try {
      const data = req.body;

      // 게시글 생성
      await prisma.post.create({ data });

      return res.json({
        meta: { ok: true },
        data: {
          message:
            "게시글을 성공적으로 생성했습니다.\n해당 페이지로 이동합니다.",
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
