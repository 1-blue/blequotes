import { useEffect, useMemo, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { movieThunkService, postThunkService } from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

// util
import { getMovieDBImagePath } from "@src/utils";

// hook
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// component
import HeadInfo from "@src/components/Common/HeadInfo";
import Image from "@src/components/Common/Image";
import SlickSlider from "@src/components/Common/SlickSlider";
import SkeletonUI from "@src/components/Common/SkeletonUI";
import GridPosts from "@src/components/Posts/GridPosts";
import PostHeader from "@src/components/Posts/PostHeader";

// type
import type { PostCategory, PostSortBy } from "@src/types";

const Movie = () => {
  const dispatch = useAppDispatch();
  const { popular, top_rated, now_playing, fetchMoviesLoading } =
    useAppSelector(({ movie }) => movie);
  const { moviePosts, hasMoreMoviePosts, getPostsLoading } = useAppSelector(
    ({ post }) => post
  );

  // 2022/12/28 - 게시글들 정렬 순서 - by 1-blue
  const [sortBy, setSortBy] = useState<PostSortBy>("popular");

  // 2022/12/24 - 영화 게시글들 패치 - by 1-blue
  useEffect(() => {
    dispatch(postActions.reset());

    dispatch(
      postThunkService.getPostsThunk({
        category: "MOVIE",
        sortBy,
        take: 20,
        lastId: -1,
      })
    );
  }, [dispatch, sortBy]);

  // 2022/12/05 - 인기 영화들 패치 - by 1-blue ( 2023/02/04 )
  useEffect(() => {
    if (popular.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "popular" }));
    }
  }, [dispatch, popular]);
  // 2022/12/05 - 상위 영화들 패치 - by 1-blue ( 2023/02/04 )
  useEffect(() => {
    if (top_rated.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "top_rated" }));
    }
  }, [dispatch, top_rated]);
  // 2022/12/05 - 현재 상영중인 영화들 패치 - by 1-blue ( 2023/02/04 )
  useEffect(() => {
    if (now_playing.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "now_playing" }));
    }
  }, [dispatch, now_playing]);

  // 2022/12/24 - 무한 스크롤링을 위해 관찰할 태그 ref ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  // ( ref지만 값에 의해 렌더링에 영향을 끼지기 때문에 "useState()""사용 )
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  // 2022/12/24 - 영화 게시글 더 가져오기 - by 1-blue
  const fetchMoreMoviePosts = useCallback(() => {
    if (getPostsLoading) return;
    if (!hasMoreMoviePosts) return;

    dispatch(
      postThunkService.getPostsThunk({
        category: "MOVIE",
        sortBy,
        take: 20,
        lastId: moviePosts[moviePosts.length - 1].id,
      })
    );
  }, [getPostsLoading, hasMoreMoviePosts, dispatch, sortBy, moviePosts]);
  // 2022/12/24 - 영화 게시글 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreMoviePosts,
    hasMore: hasMoreMoviePosts,
  });

  // 2022/12/15 - 인기 / 꾸준한 인기 / 현재 상영중인 영화들 필터링 - by 1-blue
  const filteredPopularDatas = useMemo(
    () =>
      popular
        .filter((movie) => movie.backdrop_path || movie.poster_path)
        .map((movie) => {
          const paths: string[] = [];

          if (movie.poster_path) {
            paths.push(getMovieDBImagePath(movie.poster_path));
          }
          if (movie.backdrop_path) {
            paths.push(getMovieDBImagePath(movie.backdrop_path));
          }

          return {
            idx: movie.id + "",
            category: "MOVIE" as PostCategory,
            paths,
            title: movie.title,
            description: movie.overview,
            date: movie.release_date,
          };
        }),
    [popular]
  );
  const filteredTopRatedDatas = useMemo(
    () =>
      top_rated
        .filter((movie) => movie.backdrop_path || movie.poster_path)
        .map((movie) => {
          const paths: string[] = [];

          if (movie.poster_path) {
            paths.push(getMovieDBImagePath(movie.poster_path));
          }
          if (movie.backdrop_path) {
            paths.push(getMovieDBImagePath(movie.backdrop_path));
          }

          return {
            idx: movie.id + "",
            category: "MOVIE" as PostCategory,
            paths,
            title: movie.title,
            description: movie.overview,
            date: movie.release_date,
          };
        }),
    [top_rated]
  );
  const filteredNowPlayingDatas = useMemo(
    () =>
      now_playing
        .filter((movie) => movie.backdrop_path || movie.poster_path)
        .map((movie) => {
          const paths: string[] = [];

          if (movie.poster_path) {
            paths.push(getMovieDBImagePath(movie.poster_path));
          }
          if (movie.backdrop_path) {
            paths.push(getMovieDBImagePath(movie.backdrop_path));
          }

          return {
            idx: movie.id + "",
            category: "MOVIE" as PostCategory,
            paths,
            title: movie.title,
            description: movie.overview,
            date: movie.release_date,
          };
        }),
    [now_playing]
  );

  // 2022/12/28 - 게시글들 정렬 순서 변경 - by 1-blue
  const onChangeSortBy: React.ChangeEventHandler<HTMLSelectElement> =
    useCallback((e) => {
      setSortBy(e.target.value as PostSortBy);
    }, []);

  // 영화를 패치하는 중이라면
  if (
    popular.length === 0 ||
    top_rated.length === 0 ||
    now_playing.length === 0
  )
    return <SkeletonUI.Page />;
  if (fetchMoviesLoading) return <SkeletonUI.Page />;

  // 메인 이미지로 사용할 랜덤한 영화 선택
  const index0To2 = Math.floor(Math.random() * 3);
  const index0To19 = Math.floor(Math.random() * 20);
  const target =
    index0To2 === 0 ? popular : index0To2 === 1 ? top_rated : now_playing;
  const randomImage = getMovieDBImagePath(target[index0To19].poster_path);

  return (
    <>
      {/* meta */}
      <HeadInfo
        title="영화 | 명대사"
        description="최근 인기 있는 영화들의 목록과 작성된 영화 명대사를 보는 페이지입니다."
        image={randomImage}
      />

      <Image.BackgroundImage
        className="w-full h-screen"
        path={randomImage}
        title={target[index0To19].title}
        description={target[index0To19].overview}
        date={target[index0To19].release_date}
        alt={target[index0To19].title + " 포스터 이미지"}
      />

      <div className="py-6" />

      {/* 인기 */}
      {filteredPopularDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">인기 영화들</h3>
          <SlickSlider datas={filteredPopularDatas} />

          <div className="py-6" />
        </section>
      )}

      {/* 최신 영화들 */}
      {filteredNowPlayingDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">최신 영화들</h3>
          <SlickSlider datas={filteredNowPlayingDatas} />

          <div className="py-6" />
        </section>
      )}

      {/* 지속적 인기 */}
      {filteredTopRatedDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">꾸준한 인기 영화들</h3>
          <SlickSlider datas={filteredTopRatedDatas} />

          <div className="py-6" />
        </section>
      )}

      {/* 게시글들 */}
      <section className="mx-4">
        <PostHeader
          title="영화 명대사들"
          onChangeSortBy={onChangeSortBy}
          sortBy={sortBy}
        />

        <GridPosts posts={moviePosts} ref={setObserverRef} />
      </section>
    </>
  );
};

export default Movie;
