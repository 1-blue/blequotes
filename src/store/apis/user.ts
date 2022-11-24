import axiosInstance from "./index";

// type
import type { User } from "../types";

/**
 * >>> 예시
 * 특정 유저의 정보 요청
 * @param id 특정 유저의 식별자
 * @returns 특정 유저의 정보
 */
export const apiFetchUser = async (id: number) =>
  await axiosInstance.get<User>(`/users/${id}`);
