import express from "express";

import { prisma } from "../../prisma";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsRequest,
  GetPostsResponse,
} from "../types";

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

// 게시글들 가져오기 요청
postRouter.get(
  "/",
  async (
    req: Request<{}, {}, {}, GetPostsRequest>,
    res: Response<GetPostsResponse>,
    next: NextFunction
  ) => {
    try {
      const { category, sort } = req.query;
      const take = +req.query.take;
      const lastId = +req.query.lastId;

      let orderBy = {};
      if (sort === "popular") orderBy = { like: "desc" };
      else if (sort === "latest") orderBy = { updatedAt: "desc" };

      // 게시글들 찾기
      const posts = await prisma.post.findMany({
        where: { category },
        take,
        skip: lastId === -1 ? 0 : 1,
        ...(lastId !== -1 && { cursor: { id: lastId } }),
        orderBy,
      });

      return res.json({
        meta: { ok: true },
        data: { message: "게시글들을 가져왔습니다.", take, category, posts },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
