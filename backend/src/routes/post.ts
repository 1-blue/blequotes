import express from "express";

import { prisma } from "../../prisma";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  CreatePostRequest,
  CreatePostResponse,
  GetPostsOfTargetRequest,
  GetPostsOfTargetResponse,
  GetPostsRequest,
  GetPostsResponse,
  UpdateLikeOrHateRequest,
  UpdateLikeOrHateResponse,
} from "../types";
import type { Post } from "@prisma/client";

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
      const { category, sortBy } = req.query;
      const take = +req.query.take;
      const lastId = +req.query.lastId;

      // 게시글 정렬 기준
      let orderBy = {};
      if (sortBy === "popular")
        orderBy = [{ like: "desc" }, { updatedAt: "desc" }];
      else if (sortBy === "latest")
        orderBy = [{ updatedAt: "desc" }, { like: "desc" }];

      // 게시글 카테고리
      let where = category === "ALL" ? {} : { category };

      const posts = await prisma.post.findMany({
        where,
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

// 특정 게시글 좋아요/싫어요 요청
postRouter.post(
  "/like",
  async (
    req: Request<{}, {}, UpdateLikeOrHateRequest, {}>,
    res: Response<UpdateLikeOrHateResponse>,
    next: NextFunction
  ) => {
    try {
      // 이미 싫어요를 눌렀다면 "-1", "+1"
      // 좋아요만 눌렀다면 "+1"
      const { id, already, isLike, isDuplication } = req.body;

      // 존재하는 게시글인지 찾기
      const exPost = await prisma.post.findUnique({ where: { id } });

      let resultPost: undefined | Post = undefined;

      if (!exPost)
        return res.status(404).json({
          meta: { ok: false, type: "unknown" },
          data: { message: "존재하지 않는 게시글입니다.", resultPost },
        });

      let message = "";

      // 이미 좋아요/싫어요를 누른 상태라면
      if (already) {
        // 좋아요인데 좋아요를 누른 경우 -> 좋아요 취소
        if (isDuplication && isLike === true) {
          resultPost = await prisma.post.update({
            where: { id },
            data: { like: exPost.like - 1 },
          });

          message = "좋아요를 취소했습니다.";
        }
        // 싫어요인데 싫어요를 누른 경우 -> 싫어요 취소
        else if (isDuplication && isLike === false) {
          resultPost = await prisma.post.update({
            where: { id },
            data: { hate: exPost.hate - 1 },
          });

          message = "싫어요를 취소했습니다.";
        }
        // 좋아요/싫어요를 누르고 반대로 누른 경우
        else {
          // 좋아요를 누른 경우 -> 좋아요 "+1", 싫어요 "-1"
          if (isLike) {
            resultPost = await prisma.post.update({
              where: { id },
              data: { like: exPost.like + 1, hate: exPost.hate - 1 },
            });

            message = "싫어요를 취소하고 좋아요를 눌렀습니다.";
          }
          // 싫어요를 누른 경우 -> 좋아요 "-1", 싫어요 "+1"
          else {
            resultPost = await prisma.post.update({
              where: { id },
              data: { like: exPost.like - 1, hate: exPost.hate + 1 },
            });

            message = "좋아요를 취소하고 싫어요를 눌렀습니다.";
          }
        }
      }
      // 처음 누른 경우
      else {
        // 좋아요를 누른 경우 -> 좋아요 "+1"
        if (isLike) {
          resultPost = await prisma.post.update({
            where: { id },
            data: { like: exPost.like + 1 },
          });

          message = "좋아요를 눌렀습니다.";
        }
        // 싫어요를 누른 경우 -> 싫어요 "+1"
        else {
          resultPost = await prisma.post.update({
            where: { id },
            data: { hate: exPost.hate + 1 },
          });

          message = "싫어요를 눌렀습니다.";
        }
      }

      return res.json({
        meta: { ok: true },
        data: { message, resultPost },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 특정 대상의 게시글들 요청
postRouter.get(
  "/:idx",
  async (
    req: Request<
      Pick<GetPostsOfTargetRequest, "idx">,
      {},
      {},
      Omit<GetPostsOfTargetRequest, "idx">
    >,
    res: Response<GetPostsOfTargetResponse>,
    next: NextFunction
  ) => {
    try {
      const idx = req.params.idx;
      const { sortBy } = req.query;
      const take = +req.query.take;
      const lastId = +req.query.lastId;

      let orderBy = {};
      if (sortBy === "popular")
        orderBy = [{ like: "desc" }, { updatedAt: "desc" }];
      else if (sortBy === "latest")
        orderBy = [{ updatedAt: "desc" }, { like: "desc" }];

      // 게시글들 찾기
      const posts = await prisma.post.findMany({
        where: { idx },
        take,
        skip: lastId === -1 ? 0 : 1,
        ...(lastId !== -1 && { cursor: { id: lastId } }),
        orderBy,
      });

      return res.json({
        meta: { ok: true },
        data: { message: "게시글들을 가져왔습니다.", take, posts },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
