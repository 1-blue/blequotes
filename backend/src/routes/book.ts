import express from "express";

// api
import { bookService } from "../apis";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  SearchBooksRequest,
  SearchBooksResponse,
  SimilarBooksRequest,
  SimilarBooksResponse,
  SuggestedBooksRequest,
  SuggestedBooksResponse,
} from "../types";

const bookRouter = express.Router();

// 도서 검색 요청
bookRouter.get(
  "/search",
  async (
    req: Request<{}, {}, {}, SearchBooksRequest>,
    res: Response<SearchBooksResponse>,
    next: NextFunction
  ) => {
    try {
      const { title } = req.query;

      const { data } = await bookService.apiSearchBooks({ title });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${title}"인 도서를 검색했습니다."`,
          books: data.documents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 도서 추천 검색어 요청
bookRouter.get(
  "/suggested",
  async (
    req: Request<{}, {}, {}, SuggestedBooksRequest>,
    res: Response<SuggestedBooksResponse>,
    next: NextFunction
  ) => {
    try {
      const { keyword } = req.query;

      const { data } = await bookService.apiSuggestedBooks({ keyword });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${keyword}"인 도서의 추천 검색어를 가져왔습니다."`,
          titles: [...new Set(data.documents.map((book) => book.title))],
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 유사 도서 요청
bookRouter.get(
  "/similar",
  async (
    req: Request<{}, {}, {}, SimilarBooksRequest>,
    res: Response<SimilarBooksResponse>,
    next: NextFunction
  ) => {
    try {
      const { author } = req.query;

      const { data } = await bookService.apiSimilarBooks({ author });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `저자가 "${author}"인 도서의 추천 검색어를 가져왔습니다."`,
          books: data.documents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default bookRouter;
