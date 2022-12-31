import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { postActions } from "@src/store/reducers/postReducer";
import { movieThunkService, postThunkService } from "@src/store/thunks";

// util
import { getMovieDBImagePath } from "@src/utils";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInnerSize from "@src/hooks/useInnerSize";
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// component
import Image from "@src/components/Common/Image";
import PostHeader from "@src/components/Posts/PostHeader";
import GridPosts from "@src/components/Posts/GridPosts";

// hook
// type
import type { LinkState, PostSortBy, TargetData } from "@src/types";

const Post = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation() as LinkState;
  const { detailMovie, detailMovieLoading } = useAppSelector(
    ({ movie }) => movie
  );
  const { targetPosts, hasMoreTargetPosts, getPostsOfTargetLoading } =
    useAppSelector(({ post }) => post);

  // 2022/12/31 - 현재 대상에 대한 상세 정보 요청 - by 1-blue
  useEffect(() => {
    if (!state.idx) return;

    switch (state.category) {
      case "MOVIE":
        dispatch(movieThunkService.detailMovieThunk({ movieIdx: state.idx }));
        break;
      case "DRAMA":
        break;
      case "BOOK":
        break;
    }
  }, [state, dispatch]);
  // 2022/12/31 - 영화/드라마/도서의 상세 정보 중 필요한 정보만 추출한 변수 - by 1-blue
  const [data, setData] = useState<TargetData | null>(null);
  useEffect(() => {
    if (state.category === "MOVIE" && detailMovie) {
      setData({
        idx: detailMovie.id + "",
        title: detailMovie.title,
        description: detailMovie.overview,
        date: detailMovie.release_date,
        paths: [detailMovie.poster_path, detailMovie.backdrop_path]
          .filter((v) => v)
          .map((v) => getMovieDBImagePath(v)),
        category: "MOVIE",
      });
    }
    // if(state.category === "DRAMA" && detailMovie) {}
    // if(state.category === "BOOK" && detailMovie) {}
  }, [state, detailMovie]);

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

  // 2022/12/30 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // >>> 스켈레톤 UI 추가하기
  if (detailMovieLoading || !data) return <></>;

  return (
    <>
      <Image.BackgroundImage
        title={data.title}
        description={data.description}
        date={data.date}
        alt={`${data.title}의 포스터 이미지`}
        path={
          data.paths[1] && innerWidth >= 1030 ? data.paths[1] : data.paths[0]
        }
        className="w-full h-screen"
      />

      {/* 게시글들 */}
      <section className="mx-4 mt-8">
        <PostHeader
          title={`"${data.title}"의 명대사들`}
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
        />

        <GridPosts posts={targetPosts} ref={setObserverRef} />
      </section>

      <aside className="absolute bottom-4 right-4">
        <Link
          to={`/write/${data.title}`}
          state={{ ...state }}
          className="text-white bg-main-500 px-3 py-3 rounded-md font-bold transition-colors hover:bg-main-600"
        >
          명대사 작성하기
        </Link>
      </aside>
    </>
  );
};

export default Post;
