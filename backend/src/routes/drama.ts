import express from "express";

// api
import { dramaService } from "../apis";

// type
import type { Request, Response, NextFunction } from "express";
import type {
  FetchDramasRequest,
  FetchDramasResponse,
  SearchDramasRequest,
  SearchDramasResponse,
  SimilarDramasRequest,
  SimilarDramasResponse,
  SuggestDramasRequest,
  SuggestDramasResponse,
  DetailDramaRequest,
  DetailDramaResponse,
} from "../types";

const dramaRouter = express.Router();

// 인기 / 최신 / 꾸준한 인기 드라마들 요청
dramaRouter.get(
  "/",
  async (
    req: Request<{}, {}, {}, FetchDramasRequest>,
    res: Response<FetchDramasResponse>,
    next: NextFunction
  ) => {
    try {
      const { category, language } = req.query;

      const { data } = await dramaService.apiFetchDramas({
        category,
        language,
      });

      let message = "";
      message = category === "on_the_air" ? "현재 상영중인" : "";
      message = category === "popular" ? "인기있는" : "";
      message = category === "top_rated" ? "꾸준히 인기있는" : "";

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `${message} 드라마들을 가져왔습니다."`,
          dramas: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 드라마 검색 요청
dramaRouter.get(
  "/search",
  async (
    req: Request<{}, {}, {}, SearchDramasRequest>,
    res: Response<SearchDramasResponse>,
    next: NextFunction
  ) => {
    try {
      const { title, language } = req.query;

      const { data } = await dramaService.apiSearchDramas({ title, language });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `제목이 "${title}"인 드라마를 검색했습니다."`,
          dramas: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 드라마 추천 검색어 요청
dramaRouter.get(
  "/suggested",
  async (
    req: Request<{}, {}, {}, SuggestDramasRequest>,
    res: Response<SuggestDramasResponse>,
    next: NextFunction
  ) => {
    try {
      const { keyword, language } = req.query;

      const { data } = await dramaService.apiSuggestedDramas({
        keyword,
        language,
      });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${keyword}"의 추천 검색어입니다."`,
          titles: [...new Set(data.results.map((v) => v.name))],
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 유사 드라마 검색어 요청
dramaRouter.get(
  "/similar",
  async (
    req: Request<{}, {}, {}, SimilarDramasRequest>,
    res: Response<SimilarDramasResponse>,
    next: NextFunction
  ) => {
    try {
      const { dramaId, language } = req.query;

      const { data } = await dramaService.apiSimilarDramas({
        dramaId: +dramaId,
        language,
      });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `현재 검색한 드라마와 유사한 드라마들입니다."`,
          dramas: data.results,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 특정 드라마 상세 정보 요청
dramaRouter.get(
  "/detail",
  async (
    req: Request<{}, {}, {}, DetailDramaRequest>,
    res: Response<DetailDramaResponse>,
    next: NextFunction
  ) => {
    try {
      const { dramaIdx, language } = req.query;

      const { data } = await dramaService.apiDetailDrama({
        dramaIdx,
        language,
      });

      return res.status(200).json({
        meta: { ok: true },
        data: {
          message: `"${data.name}"에 대한 상세 정보입니다`,
          drama: data,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default dramaRouter;
