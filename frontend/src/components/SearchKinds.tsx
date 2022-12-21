import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  movieThunkService,
  dramaThunkService,
  bookThunkService,
} from "@src/store/thunks";
import { movieActions } from "@src/store/reducers/movieReducer";
import { dramaActions } from "@src/store/reducers/dramaReducer";
import { bookActions } from "@src/store/reducers/bookReducer";

// util
import { dateFormat, getMovieDBImagePath } from "@src/utils";

// hook
import useToastify from "@src/hooks/useToastify";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";

// components
import Image from "@src/components/Common/Image";
import Icon from "@src/components/Common/Icon";
import Loading from "@src/components/Common/Loading";
import SlickSlider from "@src/components/Common/SlickSlider";

// type
import type { PostCategory } from "@src/types";

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

  // 2022/12/16 - 같이 검색된 / 유사 영화 필터링 ( 메인으로 검색된 영화 제외, 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredSearchMovies = useMemo(() => {
    if (!searchedMovies) return null;

    return searchedMovies
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
      });
  }, [searchedMovies]);
  const filteredSimilarMovies = useMemo(() => {
    if (!similarMovies) return null;

    return similarMovies
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
      });
  }, [similarMovies]);

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
    callback: () => dispatch(dramaActions.resetMessage()),
  });

  // 2022/12/16 - 검색 결과 중 메인으로 사용할 드라마 - by 1-blue
  const target = useMemo(() => {
    if (!searchedDramas || searchedDramas.length === 0) return null;

    return searchedDramas[0];
  }, [searchedDramas]);

  // 2022/12/16 - 같이 검색된 / 유사 드라마 필터링 ( 메인으로 검색된 드라마 제외, 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredSearchDramas = useMemo(() => {
    if (!searchedDramas) return null;

    return searchedDramas
      .filter((drama) => drama.backdrop_path || drama.poster_path)
      .map((drama) => {
        const paths: string[] = [];

        if (drama.poster_path) {
          paths.push(getMovieDBImagePath(drama.poster_path));
        }
        if (drama.backdrop_path) {
          paths.push(getMovieDBImagePath(drama.backdrop_path));
        }

        return {
          id: drama.id + "",
          category: "DRAMA" as PostCategory,
          paths,
          title: drama.name,
          description: drama.overview,
          date: drama.first_air_date,
        };
      });
  }, [searchedDramas]);
  const filteredSimilarDramas = useMemo(() => {
    if (!similarDramas) return null;

    return similarDramas
      .filter((drama) => drama.backdrop_path || drama.poster_path)
      .map((drama) => {
        const paths: string[] = [];

        if (drama.poster_path) {
          paths.push(getMovieDBImagePath(drama.poster_path));
        }
        if (drama.backdrop_path) {
          paths.push(getMovieDBImagePath(drama.backdrop_path));
        }

        return {
          id: drama.id + "",
          category: "DRAMA" as PostCategory,
          paths,
          title: drama.name,
          description: drama.overview,
          date: drama.first_air_date,
        };
      });
  }, [similarDramas]);

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

// 도서
const Book = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [queryTitle] = searchParams.getAll("title");

  const {
    searchedBooks,
    searchBooksDone,
    searchBooksError,
    searchBooksLoading,
    similarBooks,
    similarBooksLoading,
  } = useAppSelector(({ book }) => book);

  // 2022/12/16 - 도서 검색 - by 1-blue
  useEffect(() => {
    dispatch(bookThunkService.searchBooksThunk({ title: queryTitle }));
  }, [dispatch, queryTitle]);

  // 2022/12/16 - 현재 검색된 도서와 유사 도서들 검색 - by 1-blue
  useEffect(() => {
    if (!searchedBooks || searchedBooks.length === 0) return;

    dispatch(
      bookThunkService.similarBooksThunk({
        author: searchedBooks[0].authors[0],
      })
    );
  }, [searchedBooks, dispatch]);

  //2022/12/16 - 검색 토스트 처리 - by 1-blue
  useToastify({
    doneMessage: searchBooksDone,
    errorMessage: searchBooksError,
    callback: () => dispatch(bookActions.resetMessage()),
  });

  // 2022/12/16 - 검색 결과 중 메인으로 사용할 도서 - by 1-blue
  const target = useMemo(() => {
    if (!searchedBooks || searchedBooks.length === 0) return null;

    return searchedBooks[0];
  }, [searchedBooks]);

  // 2022/12/16 - 같이 검색된 / 유사 도서 필터링 ( 메인으로 검색된 도서 제외, 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredSearchBooks = useMemo(() => {
    if (!searchedBooks) return null;

    return searchedBooks.map((book) => ({
      id: book.isbn,
      category: "BOOK" as PostCategory,
      paths: [book.thumbnail],
      title: book.title,
      description: book.contents,
      date: dateFormat(new Date(book.datetime), "YYYY-MM-DD"),
    }));
  }, [searchedBooks]);
  const filteredSimilarBooks = useMemo(() => {
    if (!similarBooks) return null;

    return similarBooks.map((book) => ({
      id: book.isbn,
      category: "BOOK" as PostCategory,
      paths: [book.thumbnail],
      title: book.title,
      description: book.contents,
      date: dateFormat(new Date(book.datetime), "YYYY-MM-DD"),
    }));
  }, [similarBooks]);

  // 도서 / 유사 도서 검색중
  if (searchBooksLoading || similarBooksLoading) return <Loading.Book />;

  return (
    <>
      {target ? (
        <>
          {/* 검색된 도서 배경화면 */}
          <>
            <Image.BackgroundImage
              className="w-full h-screen"
              path={target.thumbnail}
              title={target.title}
              description={target.contents}
              date={dateFormat(new Date(target.datetime), "YYYY-MM-DD")}
              alt={target.title + " 포스터 이미지"}
            />

            <div className="py-6" />
          </>

          {/* 같이 검색된 도서들 */}
          {filteredSearchBooks && filteredSearchBooks.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">검색된 도서들</h3>
                <SlickSlider
                  datas={filteredSearchBooks}
                  slidesToShow={5}
                  responsive={[
                    { breakpoint: 400, settings: { slidesToShow: 1 } },
                    { breakpoint: 600, settings: { slidesToShow: 2 } },
                    { breakpoint: 900, settings: { slidesToShow: 3 } },
                    { breakpoint: 1024, settings: { slidesToShow: 4 } },
                  ]}
                />
              </section>

              <div className="py-6" />
            </>
          )}

          {/* 유사 도서들 */}
          {filteredSimilarBooks && filteredSimilarBooks.length >= 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">
                  "{target.authors[0]}"님의 다른 도서들
                </h3>
                <SlickSlider
                  datas={filteredSimilarBooks}
                  slidesToShow={5}
                  responsive={[
                    { breakpoint: 400, settings: { slidesToShow: 1 } },
                    { breakpoint: 600, settings: { slidesToShow: 2 } },
                    { breakpoint: 900, settings: { slidesToShow: 3 } },
                    { breakpoint: 1024, settings: { slidesToShow: 4 } },
                  ]}
                />
              </section>

              <div className="py-6" />
            </>
          )}
        </>
      ) : (
        <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
          <h4 className="font-extrabold text-2xl px-4 mb-6">
            "{searchParams.getAll("title")}"(으)로 검색된 도서가 없습니다.
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
  Book: typeof Book;
};
const SearchKinds: SearchKindsType = {
  Movie,
  Drama,
  Book,
};

export default SearchKinds;
