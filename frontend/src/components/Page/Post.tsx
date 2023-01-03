import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { postActions } from "@src/store/reducers/postReducer";
import {
  bookThunkService,
  dramaThunkService,
  movieThunkService,
  postThunkService,
} from "@src/store/thunks";

// util
import {
  dateFormat,
  getMovieDBImagePath,
  numberWithSeparator,
} from "@src/utils";

// hook
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import useInnerSize from "@src/hooks/useInnerSize";
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// component
import Image from "@src/components/Common/Image";
import PostHeader from "@src/components/Posts/PostHeader";
import GridPosts from "@src/components/Posts/GridPosts";
import NotFoundPost from "@src/components/NotFoundPost";
import SkeletonUI from "@src/components/Common/SkeletonUI";

// type
import type {
  LinkState,
  PostSortBy,
  TargetData,
  TargetInformation,
} from "@src/types";

const Post = () => {
  const dispatch = useAppDispatch();
  const { title } = useParams() as { title: string };
  const { state } = useLocation() as LinkState;
  const { targetPosts, hasMoreTargetPosts, getPostsOfTargetLoading } =
    useAppSelector(({ post }) => post);

  const { detailMovie, detailMovieLoading } = useAppSelector(
    ({ movie }) => movie
  );
  const { detailDrama, detailDramaLoading } = useAppSelector(
    ({ drama }) => drama
  );
  const { detailBook, detailBookLoading } = useAppSelector(({ book }) => book);
  // 2022/12/31 - 현재 대상에 대한 상세 정보 요청 - by 1-blue
  useEffect(() => {
    if (!state?.idx) return;

    switch (state.category) {
      case "MOVIE":
        dispatch(movieThunkService.detailMovieThunk({ movieIdx: state.idx }));
        break;
      case "DRAMA":
        dispatch(dramaThunkService.detailDramaThunk({ dramaIdx: state.idx }));
        break;
      case "BOOK":
        dispatch(bookThunkService.detailBookThunk({ bookIdx: state.idx }));
        break;
    }
  }, [state, dispatch]);
  // 2022/12/31 - 영화/드라마/도서의 상세 정보 중 필요한 정보만 추출한 변수 - by 1-blue
  const [data, setData] = useState<TargetData | null>(null);
  useEffect(() => {
    if (!state) return;

    // 영화
    if (state.category === "MOVIE" && detailMovie) {
      setData({
        idx: detailMovie.id + "",
        title: detailMovie.title,
        description: detailMovie.overview,
        date: detailMovie.release_date,
        paths: [detailMovie.poster_path, detailMovie.backdrop_path]
          .filter((v) => v)
          .map((v) => getMovieDBImagePath(v)),
        category: state.category,
      });
    }
    // 드라마
    if (state.category === "DRAMA" && detailDrama) {
      setData({
        idx: detailDrama.id + "",
        title: detailDrama.name,
        description: detailDrama.overview,
        date: detailDrama.first_air_date,
        paths: [detailDrama.poster_path, detailDrama.backdrop_path]
          .filter((v) => v)
          .map((v) => getMovieDBImagePath(v)),
        category: state.category,
      });
    }
    // 도서
    if (state.category === "BOOK" && detailBook) {
      setData({
        idx: detailBook.isbn,
        title: detailBook.title,
        description: detailBook.contents,
        date: dateFormat(new Date(detailBook.datetime), "YYYY-MM-DD"),
        paths: [detailBook.thumbnail],
        category: state.category,
      });
    }
  }, [state, detailMovie, detailDrama, detailBook]);

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
    if (!state?.idx) return;

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
  // 2022/12/30 - 현재 대상의 게시글들 더 가져오기 - by 1-blue
  const fetchMoreMovies = useCallback(() => {
    if (getPostsOfTargetLoading) return;
    if (!hasMoreTargetPosts) return;
    if (!state?.idx) return;

    dispatch(
      postThunkService.getPostsOfTarget({
        idx: state.idx,
        sortBy,
        take: 20,
        lastId: targetPosts[targetPosts.length - 1].id,
      })
    );
  }, [
    getPostsOfTargetLoading,
    hasMoreTargetPosts,
    dispatch,
    state,
    sortBy,
    targetPosts,
  ]);
  // 2022/12/30 - 현재 대상의 게시글들 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreMovies,
    hasMore: hasMoreTargetPosts,
  });

  // 2022/12/30 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2023/01/03 - 영화/드라마/도서에서 필요한 데이터 추출 - by 1-blue
  const information = useMemo<TargetInformation | undefined>(() => {
    if (!state) return;

    switch (state.category) {
      case "MOVIE":
        if (!detailMovie) return;
        return {
          tagline: detailMovie.tagline,
          genres: detailMovie.genres,
          runtime: detailMovie.runtime,
        };

      case "DRAMA":
        if (!detailDrama) return;
        return {
          tagline: detailDrama.tagline,
          genres: detailDrama.genres,
          runtime: detailDrama.episode_run_time[0],
          numerOfEpisodes: detailDrama.number_of_episodes,
        };

      case "BOOK":
        if (!detailBook) return;
        return {
          price: numberWithSeparator(detailBook.price, ","),
          authors: detailBook.authors,
        };
    }
  }, [state, detailMovie, detailDrama, detailBook]);

  // 링크 클릭을 하지 않고 "URL"로 바로 접근한 경우
  if (!state) return <NotFoundPost title={title} />;

  // 현재 대상의 데이터 패치중
  if (detailMovieLoading || detailDramaLoading || detailBookLoading || !data)
    return (
      <>
        <SkeletonUI.DetailTarget />;
        <div className="my-6" />
        <ul className="mx-4 grid gap-4 grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          <SkeletonUI.Posts />
        </ul>
      </>
    );

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
        information={information}
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

      {/* FIXME: 위치를 우측 하단 fixed로 고정하는 방법 생각해보기 */}
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
