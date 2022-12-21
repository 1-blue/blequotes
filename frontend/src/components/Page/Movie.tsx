import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { movieThunkService } from "@src/store/thunks";

// util
import { getMovieDBImagePath } from "@src/utils";

// component
import Image from "@src/components/Common/Image";
import SlickSlider from "@src/components/Common/SlickSlider";
import Loading from "@src/components/Common/Loading";

// type
import type { PostCategory } from "@src/types";

const Movie = () => {
  const dispatch = useAppDispatch();
  const { popular, top_rated, now_playing, fetchMoviesLoading } =
    useAppSelector(({ movie }) => movie);

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
            id: movie.id,
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
            id: movie.id,
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
            id: movie.id,
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
    </>
  );
};

export default Movie;
