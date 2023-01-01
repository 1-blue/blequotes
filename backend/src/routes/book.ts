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
  DetailBookRequest,
  DetailBookResponse,
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

      // 카카오에서 "isbn" 기반으로 검색할 때 전체를 입력하면 안되고 공백을 기준으로 앞부분만 입력해야 작동해서 아래처럼 처리함
      const books = data.documents.map((document) => ({
        ...document,
        isbn: document.isbn.split(" ")[0],
      }));

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${title}"인 도서를 검색했습니다."`,
          books,
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

      // 카카오에서 "isbn" 기반으로 검색할 때 전체를 입력하면 안되고 공백을 기준으로 앞부분만 입력해야 작동해서 아래처럼 처리함
      const books = data.documents.map((document) => ({
        ...document,
        isbn: document.isbn.split(" ")[0],
      }));

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `저자가 "${author}"인 도서의 추천 검색어를 가져왔습니다."`,
          books,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 특정 도서 상세 정보 요청
bookRouter.get(
  "/detail",
  async (
    req: Request<{}, {}, {}, DetailBookRequest>,
    res: Response<DetailBookResponse>,
    next: NextFunction
  ) => {
    try {
      const { bookIdx } = req.query;

      const { data } = await bookService.apiDetailBook({ bookIdx });

      // 카카오에서 "isbn" 기반으로 검색할 때 전체를 입력하면 안되고 공백을 기준으로 앞부분만 입력해야 작동해서 아래처럼 처리함
      const book = {
        ...data.documents[0],
        isbn: data.documents[0].isbn.split(" ")[0],
      };

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${book.title}"인 도서를 검색했습니다."`,
          book,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default bookRouter;
