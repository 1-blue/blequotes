import { useCallback, useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { searchMovie } from "@src/store/thunks";
import { movieActions } from "@src/store/reducers/movieReducer";

// util
import { getMovieImagePath } from "@src/utils";

// hook
import useInnerSize from "@src/hooks/useInnerSize";
import useToastify from "@src/hooks/useToastify";

// component
import Image from "@src/components/Common/Image";
import RHF from "@src/components/Common/RHF";
import Icon from "@src/components/Common/Icon";
import Spinner from "@src/components/Common/Spinner";
import SlickSlider from "@src/components/Common/SlickSlider";

/// >>>
type SearchCategroy = "movie" | "drama" | "book";

type SearchForm = {
  category: SearchCategroy;
  title: string;
};

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { search, searchMovieLoading, searchMovieDone, searchMovieError } =
    useAppSelector(({ movie }) => movie);
  const { register, handleSubmit } = useForm<SearchForm>();

  // 2022/12/06 - 현재 width 구하기 - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/07 - 링크 이동 ( 히스토리 남기기 위함 ) - by 1-blue
  const onSumbit = handleSubmit(
    useCallback(
      ({ category, title }: SearchForm) => {
        const [queryCategory] = searchParams.getAll("category");
        const [queryTitle] = searchParams.getAll("title");

        // 첫 검색이라면 현재 페이지 히스토리에 남기지 않기 ( 즉 "/search"인 경우에는 기록 남기지 않기 )
        navigate(`/search?category=${category}&title=${title}`, {
          replace: !queryCategory && !queryTitle,
        });
      },
      [searchParams, navigate]
    )
  );

  // 2022/12/07 - 검색창 렌더링 여부 - by 1-blue
  const [isShowSearchForm, setIsShowSearchForm] = useState(true);
  const onCloseSearchForm = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (!(e.target instanceof HTMLElement)) return alert(">>> 잘못된 접근");

      const { type } = e.target.dataset;

      if (type === "searchForm") setIsShowSearchForm(false);
    },
    []
  );

  // 2022/12/07 - 영화 / 드라마 / 도서 검색 - by 1-blue
  useEffect(() => {
    const [category] = searchParams.getAll("category");
    const [title] = searchParams.getAll("title");

    switch (category) {
      case "movie":
        dispatch(searchMovie({ title }));
        break;

      case "drama":
        console.log("드라마 검색 >> ", title);
        break;

      case "book":
        console.log("도서 검색 >> ", title);
        break;
    }
  }, [searchParams, dispatch]);

  //2022/12/08 - 검색 토스트 처리 - by 1-blue
  const [title] = searchParams.getAll("title");
  useToastify({
    doneMessage: searchMovieDone && `"${title}"인 ${searchMovieDone}`,
    errorMessage: searchMovieError,
    callback: () => dispatch(movieActions.resetMessage()),
  });

  // 2022/12/07 - 네비게이션 바에서 검색링크를 누른 경우 검색창 렌더링 - by 1-blue
  const { state } = useLocation();
  useEffect(() => {
    if (state?.isShow) setIsShowSearchForm(true);
  }, [state]);

  // 2022/12/07 - 검색 폼 렌더링 시 스크롤 금지 - by 1-blue
  useEffect(() => {
    if (isShowSearchForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isShowSearchForm]);

  // 영화 검색중
  if (searchMovieLoading) return <Spinner />;

  // 검색 결과
  const target = search?.results[0];

  return (
    <>
      {isShowSearchForm && (
        <RHF.Form
          onSubmit={onSumbit}
          className="absolute inset-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-[1]"
          onClick={onCloseSearchForm}
          data-type="searchForm"
        >
          <div className="absolute top-[120px] px-[20vw] py-4 space-y-4">
            <RHF.Select
              register={register}
              name="category"
              options={[
                { value: "movie", text: "영화" },
                { value: "drama", text: "드라마" },
                { value: "book", text: "도서" },
              ]}
              className="p-1 rounded-sm font-extrabold outline-none focus:ring-2 focus:ring-teal-500"
            />

            <div className="flex rounded-sm overflow-hidden font-bold focus-within:ring-2 focus-within:ring-teal-500">
              <RHF.Input
                register={register}
                type="search"
                name="title"
                placeholder="영화 제목을 입력해주세요!"
                autoFocus
                className="px-2 py-1 outline-none text-xl placeholder:text-base placeholder:font-medium"
              />

              <RHF.Button
                type="submit"
                className="px-2 py-1 outline-none font-lg bg-teal-500"
              >
                <Icon shape="search" className="w-6 h-6 text-white" />
              </RHF.Button>
            </div>
          </div>
        </RHF.Form>
      )}

      {target ? (
        <>
          <Image.BackgroundImage
            className="w-full h-[80vh]"
            path={getMovieImagePath(target.poster_path)}
            title={target.title}
            description={target.overview}
            alt={target.title + " 포스터 이미지"}
          />

          <div className="py-6" />

          {/* 같이 검색된 영화들 */}
          <section>
            <h3 className="font-jua text-4xl px-4 pb-2">검색된 영화들</h3>
            <SlickSlider
              datas={search.results.map((v) => ({
                path: getMovieImagePath(
                  innerWidth >= 1024 ? v.backdrop_path : v.poster_path
                ),
                title: v.title,
                description: v.overview,
              }))}
            />
          </section>

          <div className="py-6" />
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

export default Search;
