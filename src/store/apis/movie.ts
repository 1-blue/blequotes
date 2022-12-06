import { movieInstance } from "./index";

// type
import type { FetchMoive, ReceiveMoive } from "../types";

/**
 * 2022/12/05 - 특정 유저의 정보 요청 - by 1-blue
 * @param category 인기, 최신 등
 * @param language 언어
 * @returns 특정 유저의 정보
 */
export const apiFetchMovie = async ({
  category,
  language = "ko-kr",
}: FetchMoive) =>
  await movieInstance.get<ReceiveMoive>(
    `/${category}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=${language}`
  );
