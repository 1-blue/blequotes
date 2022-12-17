import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { movieThunkService, dramaThunkService } from "@src/store/thunks";
import { movieActions } from "@src/store/reducers/movieReducer";

// util
import { getMovieDBImagePath } from "@src/utils";

// hook
import useInnerSize from "@src/hooks/useInnerSize";
import useToastify from "@src/hooks/useToastify";

// components
import Image from "@src/components/Common/Image";
import Icon from "@src/components/Common/Icon";
import Loading from "@src/components/Common/Loading";
import SlickSlider from "@src/components/Common/SlickSlider";

// type
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";

// 영화
const Movie = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [queryTitle] = searchParams.getAll("title");

  const {
    searchedMovies,
    similarMovies,
    searchMoviesLoading,
    similarMoviesLoading,
    searchMoviesDone,
    searchMoviesError,
  } = useAppSelector(({ movie }) => movie);

  // 2022/12/16 - 영화 검색 - by 1-blue
  useEffect(() => {
    dispatch(movieThunkService.searchMoviesThunk({ title: queryTitle }));
  }, [dispatch, queryTitle]);

  // 2022/12/16 - 현재 검색된 영화와 유사 영화들 검색 - by 1-blue
  useEffect(() => {
    if (!searchedMovies || searchedMovies.length === 0) return;

    dispatch(
      movieThunkService.similarMoviesThunk({ movieId: searchedMovies[0].id })
    );
  }, [searchedMovies, dispatch]);

  //2022/12/16 - 검색 토스트 처리 - by 1-blue
  useToastify({
    doneMessage: searchMoviesDone,
    errorMessage: searchMoviesError,
    callback: () => dispatch(movieActions.resetMessage()),
  });

  // 2022/12/16 - 검색 결과 중 메인으로 사용할 영화 - by 1-blue
  const target = useMemo(() => {
    if (!searchedMovies || searchedMovies.length === 0) return null;

    return searchedMovies[0];
  }, [searchedMovies]);

  // 2022/12/16 - 현재 width 구하기 - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/16 - 같이 검색된 / 유사 영화 필터링 ( 메인으로 검색된 영화 제외, 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredSearchMovies = useMemo(() => {
    if (!searchedMovies) return null;

    return searchedMovies
      .filter((v) => v.id !== target?.id)
      .filter((v) => (innerWidth >= 1024 ? v.backdrop_path : v.poster_path))
      .map((v) => ({
        path: getMovieDBImagePath(
          innerWidth >= 1024 ? v.backdrop_path : v.poster_path
        ),
        title: v.title,
        description: v.overview,
        date: v.release_date,
      }));
  }, [searchedMovies, innerWidth, target]);
  const filteredSimilarMovies = useMemo(() => {
    if (!similarMovies) return null;

    return similarMovies
      .filter((movie) =>
        innerWidth >= 1024 ? movie.backdrop_path : movie.poster_path
      )
      .map((movie) => ({
        path: getMovieDBImagePath(
          innerWidth >= 1024 ? movie.backdrop_path : movie.poster_path
        ),
        title: movie.title,
        description: movie.overview,
        date: movie.release_date,
      }));
  }, [similarMovies, innerWidth]);

  // 영화 / 유사 영화 검색중
  if (searchMoviesLoading || similarMoviesLoading) return <Loading.Movie />;

  return (
    <>
      {target ? (
        <>
          {/* 검색된 영화 배경화면 */}
          <>
            <Image.BackgroundImage
              className="w-full h-screen"
              path={getMovieDBImagePath(target.poster_path)}
              title={target.title}
              description={target.overview}
              date={target.release_date}
              alt={target.title + " 포스터 이미지"}
            />

            <div className="py-6" />
          </>

          {/* 같이 검색된 영화들 */}
          {filteredSearchMovies && filteredSearchMovies.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">검색된 영화들</h3>
                <SlickSlider datas={filteredSearchMovies} />
              </section>

              <div className="py-6" />
            </>
          )}

          {/* 유사 영화들 */}
          {filteredSimilarMovies && filteredSimilarMovies.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">유사한 영화들</h3>
                <SlickSlider datas={filteredSimilarMovies} />
              </section>

              <div className="py-6" />
            </>
          )}
        </>
      ) : (
        <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
          <h4 className="font-extrabold text-2xl px-4 mb-6">
            "{searchParams.getAll("title")}"(으)로 검색된 영화가 없습니다.
          </h4>

          <Icon shape="arrowDown" className="w-10 h-10 animate-bounce mb-2" />

          <Link
            to="/search"
            state={{ isShow: true }}
            className="bg-teal-500 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-teal-600 focus-ring transition-colors"
          >
            다시 검색하기
          </Link>
        </section>
      )}
    </>
  );
};

// 드라마
const Drama = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [queryTitle] = searchParams.getAll("title");

  const {
    searchedDramas,
    similarDramas,
    searchDramasLoading,
    similarDramasLoading,
    searchDramasDone,
    searchDramasError,
  } = useAppSelector(({ drama }) => drama);

  // 2022/12/16 - 드라마 검색 - by 1-blue
  useEffect(() => {
    dispatch(dramaThunkService.searchDramasThunk({ title: queryTitle }));
  }, [dispatch, queryTitle]);

  // 2022/12/16 - 현재 검색된 드라마와 유사 드라마들 검색 - by 1-blue
  useEffect(() => {
    if (!searchedDramas || searchedDramas.length === 0) return;

    dispatch(
      dramaThunkService.similarDramasThunk({ dramaId: searchedDramas[0].id })
    );
  }, [searchedDramas, dispatch]);

  //2022/12/16 - 검색 토스트 처리 - by 1-blue
  useToastify({
    doneMessage: searchDramasDone,
    errorMessage: searchDramasError,
    callback: () => dispatch(movieActions.resetMessage()),
  });

  // 2022/12/16 - 검색 결과 중 메인으로 사용할 드라마 - by 1-blue
  const target = useMemo(() => {
    if (!searchedDramas || searchedDramas.length === 0) return null;

    return searchedDramas[0];
  }, [searchedDramas]);

  // 2022/12/16 - 현재 width 구하기 - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/16 - 같이 검색된 / 유사 드라마 필터링 ( 메인으로 검색된 드라마 제외, 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredSearchDramas = useMemo(() => {
    if (!searchedDramas) return null;

    return searchedDramas
      .filter((v) => v.id !== target?.id)
      .filter((v) => (innerWidth >= 1024 ? v.backdrop_path : v.poster_path))
      .map((v) => ({
        path: getMovieDBImagePath(
          innerWidth >= 1024 ? v.backdrop_path : v.poster_path
        ),
        title: v.name,
        description: v.overview,
        date: v.first_air_date,
      }));
  }, [searchedDramas, innerWidth, target]);
  const filteredSimilarDramas = useMemo(() => {
    if (!similarDramas) return null;

    return similarDramas
      .filter((drama) =>
        innerWidth >= 1024 ? drama.backdrop_path : drama.poster_path
      )
      .map((drama) => ({
        path: getMovieDBImagePath(
          innerWidth >= 1024 ? drama.backdrop_path : drama.poster_path
        ),
        title: drama.name,
        description: drama.overview,
        date: drama.first_air_date,
      }));
  }, [similarDramas, innerWidth]);

  // 드라마 / 유사 드라마 검색중
  if (searchDramasLoading || similarDramasLoading) return <Loading.Movie />;

  return (
    <>
      {target ? (
        <>
          {/* 검색된 드라마 배경화면 */}
          <>
            <Image.BackgroundImage
              className="w-full h-screen"
              path={getMovieDBImagePath(target.poster_path)}
              title={target.name}
              description={target.overview}
              date={target.first_air_date}
              alt={target.name + " 포스터 이미지"}
            />

            <div className="py-6" />
          </>

          {/* 같이 검색된 드라마들 */}
          {filteredSearchDramas && filteredSearchDramas.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">검색된 드라마들</h3>
                <SlickSlider datas={filteredSearchDramas} />
              </section>

              <div className="py-6" />
            </>
          )}

          {/* 유사 영화들 */}
          {filteredSimilarDramas && filteredSimilarDramas.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">유사한 드라마들</h3>
                <SlickSlider datas={filteredSimilarDramas} />
              </section>

              <div className="py-6" />
            </>
          )}
        </>
      ) : (
        <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
          <h4 className="font-extrabold text-2xl px-4 mb-6">
            "{searchParams.getAll("title")}"(으)로 검색된 드라마가 없습니다.
          </h4>

          <Icon shape="arrowDown" className="w-10 h-10 animate-bounce mb-2" />

          <Link
            to="/search"
            state={{ isShow: true }}
            className="bg-teal-500 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-teal-600 focus-ring transition-colors"
          >
            다시 검색하기
          </Link>
        </section>
      )}
    </>
  );
};

type SearchKindsType = {
  Movie: typeof Movie;
  Drama: typeof Drama;
};
const SearchKinds: SearchKindsType = {
  Movie,
  Drama,
};

export default SearchKinds;
