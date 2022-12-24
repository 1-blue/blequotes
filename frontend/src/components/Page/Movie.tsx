import { useEffect, useMemo, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { movieThunkService, postThunkService } from "@src/store/thunks";
import { postActions } from "@src/store/reducers/postReducer";

// util
import { getMovieDBImagePath } from "@src/utils";

// hook
import useInfiniteScrolling from "@src/hooks/useInfiniteScrolling";

// component
import Image from "@src/components/Common/Image";
import SlickSlider from "@src/components/Common/SlickSlider";
import Loading from "@src/components/Common/Loading";
import GridPosts from "@src/components/GridPosts";

// type
import type { PostCategory } from "@src/types";

const Movie = () => {
  const dispatch = useAppDispatch();
  const { popular, top_rated, now_playing, fetchMoviesLoading } =
    useAppSelector(({ movie }) => movie);
  const { moviePosts, hasMoreMoviePosts, getPostsLoading } = useAppSelector(
    ({ post }) => post
  );

  // 2022/12/24 - 영화 게시글들 패치 - by 1-blue
  useEffect(() => {
    dispatch(postActions.reset());

    dispatch(
      postThunkService.getPostsThunk({
        category: "MOVIE",
        sort: "latest",
        take: 20,
        lastId: -1,
      })
    );
  }, [dispatch]);

  // 2022/12/05 - 각종 영화들 패치 - by 1-blue
  useEffect(() => {
    if (popular.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "popular" }));
    }
    if (top_rated.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "top_rated" }));
    }
    if (now_playing.length === 0) {
      dispatch(movieThunkService.fetchMoviesThunk({ category: "now_playing" }));
    }
  }, [dispatch, popular, top_rated, now_playing]);

  // 2022/12/24 - 무한 스크롤링을 위해 관찰할 태그 ref ( 해당 태그가 뷰포트에 들어오면 게시글 추가 패치 실행 ) - by 1-blue
  // ( ref지만 값에 의해 렌더링에 영향을 끼지기 때문에 "useState()""사용 )
  const [observerRef, setObserverRef] = useState<null | HTMLDivElement>(null);
  // 2022/12/24 - 영화 더 가져오기 - by 1-blue
  const fetchMoreMovies = useCallback(() => {
    if (getPostsLoading) return;
    if (!hasMoreMoviePosts) return;

    dispatch(
      postThunkService.getPostsThunk({
        category: "MOVIE",
        sort: "latest",
        take: 20,
        lastId: moviePosts[moviePosts.length - 1].id,
      })
    );
  }, [getPostsLoading, hasMoreMoviePosts, dispatch, moviePosts]);
  // 2022/12/24 - 영화 가져오기 무한 스크롤링 적용 - by 1-blue
  useInfiniteScrolling({
    observerRef,
    fetchMore: fetchMoreMovies,
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
            id: movie.id + "",
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
            id: movie.id + "",
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
            id: movie.id + "",
            category: "MOVIE" as PostCategory,
            paths,
            title: movie.title,
            description: movie.overview,
            date: movie.release_date,
          };
        }),
    [now_playing]
  );

  // 영화를 패치하는 중이라면
  if (
    popular.length === 0 ||
    top_rated.length === 0 ||
    now_playing.length === 0
  )
    return <Loading.Movie />;
  if (fetchMoviesLoading) return <Loading.Movie />;

  // 메인 이미지로 사용할 랜덤한 영화 선택
  const index0To2 = Math.floor(Math.random() * 3);
  const index0To19 = Math.floor(Math.random() * 20);
  const target =
    index0To2 === 0 ? popular : index0To2 === 1 ? top_rated : now_playing;
  const randomImage = getMovieDBImagePath(target[index0To19].poster_path);

  return (
    <>
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
      <section>
        <h3 className="font-jua text-4xl px-4 pb-2">영화 명대사들</h3>
        {moviePosts.length > 0 ? (
          <GridPosts posts={moviePosts} ref={setObserverRef} />
        ) : (
          <>
            <span className="inline-block w-full text-center font-bold text-xl">
              ** 첫 번째로 명대사를 작성해보세요...! **
            </span>
            <div className="mb-6" />
          </>
        )}
      </section>
    </>
  );
};

export default Movie;
