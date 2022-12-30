import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { postActions } from "@src/store/reducers/postReducer";
import { postThunkService } from "@src/store/thunks";

// component
import Image from "@src/components/Common/Image";
import NotFountPost from "@src/components/NotFoundPost";
import PostHeader from "@src/components/Posts/PostHeader";
import GridPosts from "@src/components/Posts/GridPosts";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInnerSize from "@src/hooks/useInnerSize";
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// type
import type { LinkState, PostSortBy, SStorageData } from "@src/types";

type ParamsType = { title?: string };

const Post = () => {
  const dispatch = useAppDispatch();
  const { title } = useParams<ParamsType>();
  const { state } = useLocation() as LinkState;
  const { targetPosts, hasMoreTargetPosts, getPostsOfTargetLoading } =
    useAppSelector(({ post }) => post);

  // 2022/12/30 - 게시글들 정렬 순서 - by 1-blue
  const [sortBy, setSortBy] = useState<PostSortBy>("popular");
  // 2022/12/30 - 게시글들 정렬 순서 변경 - by 1-blue
  const onChangeSortBy = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortBy(e.target.value as PostSortBy);
    },
    []
  );

  // 2022/12/30 - 현재 대상의 게시글들 요청 - by 1-blue
  useEffect(() => {
    if (!state.idx) return;

    dispatch(postActions.reset());

    dispatch(
      postThunkService.getPostsOfTarget({
        idx: state.idx,
        sortBy,
        take: 20,
        lastId: -1,
      })
    );
  }, [dispatch, state, sortBy]);

  // 2022/12/30 - 무한 스크롤링을 위해 관찰할 태그 ref ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  // ( ref지만 값에 의해 렌더링에 영향을 끼지기 때문에 "useState()""사용 )
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  // 2022/12/30 - 영화 더 가져오기 - by 1-blue
  const fetchMoreMovies = useCallback(() => {
    if (getPostsOfTargetLoading) return;
    if (!hasMoreTargetPosts) return;

    dispatch(
      postThunkService.getPostsThunk({
        category: "MOVIE",
        sortBy,
        take: 20,
        lastId: targetPosts[targetPosts.length - 1].id,
      })
    );
  }, [
    getPostsOfTargetLoading,
    hasMoreTargetPosts,
    dispatch,
    sortBy,
    targetPosts,
  ]);
  // 2022/12/30 - 영화 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreMovies,
    hasMore: hasMoreTargetPosts,
  });

  // 2022/12/30 - 세션 스토리지에 저장된 데이터 - by 1-blue
  const [data, setData] = useState<null | SStorageData>(null);
  useEffect(() => {
    const storageData = sessionStorage.getItem("data");
    if (!storageData) return;

    const parsingData = JSON.parse(storageData) as SStorageData;
    setData(parsingData);
  }, []);

  // 2022/12/30 - 게시글 작성 페이지 이동 시 클릭한 데이터 세션 스토리지에 저장 - by 1-blue
  const onSaveDataToStorage = useCallback(() => {
    sessionStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  // 2022/12/30 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/30 - 렌더링할 이미지 path - by 1-blue
  const targetPath = useMemo(() => {
    if (!data) return "";
    if (data.paths.length === 1) return data.paths[0];

    if (innerWidth >= 1030) return data.paths[1];
    else return data.paths[0];
  }, [data, innerWidth]);

  // 혹시 모르는 안전장치들
  if (
    !title ||
    !state?.idx ||
    !state?.category ||
    !data ||
    data.title !== title ||
    data.idx !== state?.idx ||
    data.category !== state?.category
  )
    return <NotFountPost title={title} />;

  return (
    <>
      <Image.BackgroundImage
        {...data}
        path={targetPath}
        className="w-full h-screen"
      />

      {/* 게시글들 */}
      <section className="mx-4 mt-8">
        <PostHeader
          title={`"${title}"의 명대사들`}
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
        />

        <GridPosts posts={targetPosts} ref={setObserverRef} />
      </section>

      <aside className="absolute bottom-4 right-4">
        <Link
          to={`/write/${data.title}`}
          state={{ ...state, title }}
          onClick={onSaveDataToStorage}
          className="text-white bg-main-500 px-3 py-3 rounded-md font-bold transition-colors hover:bg-main-600"
        >
          명대사 작성하기
        </Link>
      </aside>
    </>
  );
};

export default Post;
