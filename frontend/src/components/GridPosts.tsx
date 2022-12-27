import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { postThunkService } from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

// hook
import useToastify from "@src/hooks/useToastify";

// components
import Icon from "@src/components/Common/Icon";
import SkeletonUI from "@src/components/Common/SkeletonUI";

// type
import type { Post } from "@src/store/types";
import type { LStorageData } from "@src/types";

type Props = {
  posts: Post[];
};

const GridPosts = React.forwardRef<HTMLDivElement, Props>(({ posts }, ref) => {
  const dispatch = useAppDispatch();
  const { getPostsLoading, updateLikeOrHateDone, updateLikeOrHateError } =
    useAppSelector(({ post }) => post);

  // 2022/12/26 - 좋아요/싫어요 이전에 누른 정보 - by 1-blue
  const [likeAndHateDatas, setLikeAndHateDatas] = useState<
    null | LStorageData[]
  >(null);
  // 2022/12/26 - 좋아요/싫어요 이전에 누른 정보 불러오기 ( from "localStorage" ) - by 1-blue
  const fetchLikeAndHateDatas = useCallback(() => {
    // 기존 좋아요 정보 불러오기 ( from "localStorage" )
    const stringifyData = localStorage.getItem("quotes");

    if (!stringifyData) return setLikeAndHateDatas(null);

    // 좋아요/싫어요 흔적이 남아있다면 파싱
    setLikeAndHateDatas(JSON.parse(stringifyData));
  }, []);
  // 2022/12/26 - 좋아요/싫어요 이전에 누른 정보 초기화 - by 1-blue
  useEffect(fetchLikeAndHateDatas, [fetchLikeAndHateDatas]);

  // 2022/12/26 - 좋아요/싫어요 버튼 클릭 이벤트 ( 이벤트 버블링 ) - by 1-blue
  const onClickLikeOrHate = useCallback(
    (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.dataset.type) return;
      if (!e.target.dataset.id) return;

      const isLike = e.target.dataset.type === "like" ? true : false;
      const id = +e.target.dataset.id;
      let already = false;
      let isDuplication = false;

      // 좋아요/싫어요 흔적이 있다면
      if (likeAndHateDatas) {
        // 이미 좋아요/싫어요를 누른 데이터 찾기
        const targetData = likeAndHateDatas.find((data) => data.postId === id);

        // 이미 좋아요/싫어요를 누른 경우
        if (targetData) {
          let temporaryData: null | LStorageData[] = null;

          // 좋아요인데 좋아요를 누른 경우 -> 좋아요 취소 ( 기록 제거 )
          if (targetData.isLike === isLike && isLike === true) {
            temporaryData = likeAndHateDatas.filter(
              (data) => data.postId !== id
            );

            // 좋아요 정보가 없다면
            if (temporaryData.length === 0) {
              localStorage.removeItem("quotes");
            } else {
              localStorage.setItem("quotes", JSON.stringify(temporaryData));
            }

            isDuplication = true;
          }
          // 싫어요인데 싫어요를 누른 경우 -> 싫어요 취소 ( 기록 제거 )
          else if (targetData.isLike === isLike && isLike === false) {
            temporaryData = likeAndHateDatas.filter(
              (data) => data.postId !== id
            );

            // 좋아요 정보가 없다면
            if (temporaryData.length === 0) {
              localStorage.removeItem("quotes");
            } else {
              localStorage.setItem("quotes", JSON.stringify(temporaryData));
            }

            isDuplication = true;
          }
          // 좋아요/싫어요를 누르고 반대로 누른 경우 -> 취소 및 추가
          else {
            temporaryData = likeAndHateDatas.filter(
              (data) => data.postId !== id
            );
            targetData.isLike = !targetData.isLike;

            localStorage.setItem(
              "quotes",
              JSON.stringify([...temporaryData, targetData])
            );
          }

          already = true;
        }
        // 아직 좋아요/싫어요를 누르지 않은 경우 -> 기존 기록 + 새로운 기록
        else {
          localStorage.setItem(
            "quotes",
            JSON.stringify([...likeAndHateDatas, { postId: id, isLike }])
          );
        }
      }
      // 좋아요/싫어요 흔적이 없다면 -> 기록 추가
      else {
        // 아예 처음이라면 -> 기록 추가
        localStorage.setItem(
          "quotes",
          JSON.stringify([{ postId: id, isLike }])
        );
      }

      // 서버에 변경 요청
      dispatch(
        postThunkService.updateLikeOrHate({
          id,
          already,
          isLike,
          isDuplication,
        })
      );

      // "localStorage" 데이터 현재 컴포넌트에서 최신화
      fetchLikeAndHateDatas();
    },
    [likeAndHateDatas, dispatch, fetchLikeAndHateDatas]
  );

  // 2022/12/26 - 좋아요/싫어요 토스트 메시지 - by 1-blue
  useToastify({
    doneMessage: updateLikeOrHateDone,
    errorMessage: updateLikeOrHateError,
    callback: () => dispatch(postActions.resetMessage()),
  });

  // 2022/12/27 - 좋아요/싫어요 누른 포스트들 필터링 ( 구분을 위함 ) - by 1-blue
  const likePostIds = useMemo(
    () =>
      likeAndHateDatas
        ?.filter((data) => data.isLike === true)
        .map((data) => data.postId) || [],
    [likeAndHateDatas]
  );
  const hatePostIds = useMemo(
    () =>
      likeAndHateDatas
        ?.filter((data) => data.isLike === false)
        .map((data) => data.postId) || [],
    [likeAndHateDatas]
  );

  return (
    <>
      <ul
        className="grid gap-4 mx-[20px] grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5"
        onClick={onClickLikeOrHate}
      >
        {posts.map((post) => (
          <li
            key={post.id}
            style={{ backgroundImage: `url("${post.thumbnail}")` }}
            className="group/post relative pt-[80%] bg-center bg-cover bg-no-repeat bg-gray-200 rounded-md shadow-xl overflow-hidden text-white transition-all hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 transition-colors group-hover/post:bg-black/50" />

            <div className="absolute top-[10%] left-[10%] space-y-2 z-[1]">
              <h4 className="text-center text-2xl">
                <b>{post.title}</b>
              </h4>
              <p className="text-sm whitespace-pre-wrap">
                <b>"{post.speech}"</b>
              </p>
            </div>

            <form className="absolute bottom-[4%] right-[4%] self-end z-[1] space-y-1">
              <button
                type="button"
                className="group/like flex items-center space-x-1"
                data-type="like"
                data-id={post.id}
              >
                <Icon
                  shape="like"
                  className="w-5 h-5 pointer-events-none transition-colors group-hover/like:text-main-400"
                  isFill={likePostIds.includes(post.id)}
                />
                <span className="text-sm pointer-events-none transition-colors group-hover/like:text-main-400">
                  <b>{post.like}</b>
                </span>
              </button>
              <button
                type="button"
                className="group/hate flex items-center space-x-1"
                data-type="hate"
                data-id={post.id}
              >
                <Icon
                  shape="hate"
                  className="w-5 h-5 pointer-events-none transition-colors group-hover/hate:text-main-400"
                  isFill={hatePostIds.includes(post.id)}
                />
                <span className="text-sm pointer-events-none transition-colors group-hover/hate:text-main-400">
                  <b>{post.hate}</b>
                </span>
              </button>
            </form>
          </li>
        ))}

        {getPostsLoading && <SkeletonUI.Posts />}
      </ul>

      <div className="py-6" ref={ref} />
    </>
  );
});

export default React.memo(GridPosts);
