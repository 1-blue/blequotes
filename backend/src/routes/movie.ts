import express from "express";

// api
import { movieService } from "../apis";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  FetchMoviesRequest,
  FetchMoviesResponse,
  SearchMoviesRequest,
  SearchMoviesResponse,
  SimilarMoviesRequest,
  SimilarMoviesResponse,
  SuggestMoviesRequest,
  SuggestMoviesResponse,
} from "../types";

const movieRouter = express.Router();

// 인기 / 최신 / 꾸준한 인기 영화들 요청
movieRouter.get(
  "/",
  async (
    req: Request<{}, {}, {}, FetchMoviesRequest>,
    res: Response<FetchMoviesResponse>,
    next: NextFunction
  ) => {
    try {
      const { category, language } = req.query;

      const { data } = await movieService.apiFetchMovies({
        category,
        language,
      });

      let message = "";
      message = category === "now_playing" ? "현재 상영중인" : "";
      message = category === "popular" ? "인기있는" : "";
      message = category === "top_rated" ? "꾸준히 인기있는" : "";

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `${message} 영화들을 가져왔습니다."`,
          movies: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 영화 검색 요청
movieRouter.get(
  "/search",
  async (
    req: Request<{}, {}, {}, SearchMoviesRequest>,
    res: Response<SearchMoviesResponse>,
    next: NextFunction
  ) => {
    try {
      const { title, language } = req.query;

      const { data } = await movieService.apiSaerchMovies({ title, language });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `제목이 "${title}"인 영화를 검색했습니다."`,
          movies: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 영화 추천 검색어 요청
movieRouter.get(
  "/suggested",
  async (
    req: Request<{}, {}, {}, SuggestMoviesRequest>,
    res: Response<SuggestMoviesResponse>,
    next: NextFunction
  ) => {
    try {
      const { keyword, language } = req.query;

      const { data } = await movieService.apiSuggestedMovies({
        keyword,
        language,
      });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${keyword}"의 추천 검색어입니다."`,
          movies: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 유사 영화 검색어 요청
movieRouter.get(
  "/similar",
  async (
    req: Request<{}, {}, {}, SimilarMoviesRequest>,
    res: Response<SimilarMoviesResponse>,
    next: NextFunction
  ) => {
    try {
      const { movieId, language } = req.query;

      const { data } = await movieService.apiSimilarMovies({
        movieId: +movieId,
        language,
      });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `현재 검색한 영화와 유사한 영화들입니다."`,
          movies: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default movieRouter;
