import { useCallback, useEffect, useState, useRef } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { searchMovie, suggestedMovie } from "@src/store/thunks";
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
import SlickSlider from "@src/components/Common/SlickSlider";
import Loading from "@src/components/Common/Loading";

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
  const {
    search,
    suggested,
    searchMovieLoading,
    searchMovieDone,
    searchMovieError,
    suggestedMovieLoading,
  } = useAppSelector(({ movie }) => movie);
  const { register, handleSubmit, watch, setValue } = useForm<SearchForm>();

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

    setValue("title", title);
    setIsShowSearchForm(false);
  }, [searchParams, dispatch, setValue, setIsShowSearchForm]);

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

  // 해당 컴포넌트에서 "keyword"는 추천 검색어를 의미
  // 2022/12/13 - 추천 검색어 보여줄지 결정하는 변수 - by 1-blue
  const [isOpenKeyword, setIsOpenKeyword] = useState(false);
  // 2022/12/13 - 현재 포커싱중인 추천 검색어 - by 1-blue
  const [focusIndex, setFocusIndex] = useState(-1);
  // 2022/12/13 - 디바운스를 적용한 추천 검색어 요청 - by 1-blue
  const timerId = useRef<null | NodeJS.Timeout>(null);
  const keyword = watch("title");
  useEffect(() => {
    if (!keyword) return;
    if (timerId.current !== null) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      dispatch(suggestedMovie({ keyword }));
      timerId.current = null;
      setIsOpenKeyword(true);
    }, 200);
  }, [timerId, keyword, dispatch]);
  // 2022/12/13 - 외부 클릭 시 추천 검색어 닫기 - by 1-blue
  const inputContainerRef = useRef<null | HTMLDivElement>(null);
  const handleClickOutSide = useCallback((e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;

    // >>> input의 ref를 얻어내기 힘들어서 아래와 같이 처리
    if (inputContainerRef.current?.firstElementChild === e.target) {
      setIsOpenKeyword(true);
    } else {
      setIsOpenKeyword(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => window.removeEventListener("click", handleClickOutSide);
  }, [handleClickOutSide]);
  // 2022/12/13 - 링크들의 컨테이너 ref - by 1-blue
  const linkContainerRef = useRef<null | HTMLDivElement>(null);
  // 2022/12/13 - 검색에서 키보드 방향키 및 ESC 누른 경우 추천 검색어 이동 이벤트 - by 1-blue
  const onMoveKeyword = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!suggested) return;
      if (!linkContainerRef.current) return;
      const links = [...linkContainerRef.current.childNodes].filter(
        (v): v is HTMLElement => v instanceof HTMLElement
      );

      switch (e.key) {
        case "ArrowDown":
          if (focusIndex + 1 >= suggested.results.length) {
            setFocusIndex(0);
            links[0].focus();
          } else {
            setFocusIndex((prev) => prev + 1);
            links[focusIndex + 1].focus();
          }
          break;
        case "ArrowUp":
          if (focusIndex - 1 <= -1) {
            setFocusIndex(suggested.results.length - 1);
            links[suggested.results.length - 1].focus();
          } else {
            setFocusIndex((prev) => prev - 1);
            links[focusIndex - 1].focus();
          }
          break;
        case "Escape":
          setFocusIndex(-1);
          setIsOpenKeyword(false);
          break;

        default:
          break;
      }
    },
    [suggested, linkContainerRef, focusIndex]
  );

  // 영화 검색중
  if (searchMovieLoading) return <Loading.Movie />;

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
          <div className="absolute top-[120px] px-[10vw] py-4 space-y-4">
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

            <div className="w-[250px]" onKeyDown={onMoveKeyword}>
              <div
                className="flex rounded-sm overflow-hidden font-bold focus-within:ring-2 focus-within:ring-teal-500"
                ref={inputContainerRef}
              >
                <RHF.Input
                  register={register}
                  type="search"
                  name="title"
                  placeholder="영화 제목을 입력해주세요!"
                  autoFocus
                  className="w-full px-2 py-1 outline-none text-xl placeholder:text-base placeholder:font-medium"
                />

                <RHF.Button
                  type="submit"
                  className="px-2 py-1 outline-none font-lg bg-teal-500"
                >
                  <Icon shape="search" className="w-5 h-5 text-white" />
                </RHF.Button>
              </div>

              {/* 추천 검색어 패치중 */}
              {isOpenKeyword && suggestedMovieLoading && <Loading.Keyword />}
              {/* 추천 검색어 패치완료 */}
              {isOpenKeyword && !suggestedMovieLoading && suggested && (
                <div
                  className="flex flex-col mt-1 rounded-b-sm overflow-hidden bg-white"
                  ref={linkContainerRef}
                >
                  {suggested.results.map((result, index) => (
                    <Link
                      key={result.id}
                      to={`/search?category=${watch("category")}&title=${
                        result.title
                      }`}
                      className="px-4 py-1 transition-colors whitespace-nowrap text-ellipsis overflow-hidden break-keep hover:bg-teal-400 hover:text-white focus:outline-none focus:bg-teal-400 focus:text-white"
                      onFocus={() => setFocusIndex(index)}
                    >
                      {result.title}
                    </Link>
                  ))}

                  {/* 추천 검색어가 없다면 */}
                  {suggested.results.length === 0 && (
                    <div className="p-4">
                      <span>
                        <b>검색되는 영화가 없습니다.</b>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </RHF.Form>
      )}

      {target ? (
        <>
          <Image.BackgroundImage
            className="w-full h-screen"
            path={getMovieImagePath(target.poster_path)}
            title={target.title}
            description={target.overview}
            alt={target.title + " 포스터 이미지"}
          />

          <div className="py-6" />

          {/* 같이 검색된 영화들 */}
          {search.results.length !== 1 && (
            <>
              <section>
                <h3 className="font-jua text-4xl px-4 pb-2">검색된 영화들</h3>
                <SlickSlider
                  datas={search.results
                    .filter((v) =>
                      innerWidth >= 1024 ? v.backdrop_path : v.poster_path
                    )
                    .map((v) => ({
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

export default Search;
