import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import {
  movieThunkService,
  dramaThunkService,
  bookThunkService,
} from "@src/store/thunks";

// component
import HeadInfo from "@src/components/Common/HeadInfo";
import RHF from "@src/components/Common/RHF";
import Icon from "@src/components/Common/Icon";
import SkeletonUI from "@src/components/Common/SkeletonUI";
import SearchKinds from "@src/components/SearchKinds";
import Suggested from "@src/components/Suggested";

// type
import type { SearchCategory } from "@src/types";

type SearchForm = {
  category: SearchCategory;
  title: string;
};

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryTitle] = searchParams.getAll("title");
  const [queryCategory] = searchParams.getAll("category");

  const { suggestedMovies, suggestedMoviesLoading } = useAppSelector(
    ({ movie }) => movie
  );
  const { suggestedDramas, suggestedDramasLoading } = useAppSelector(
    ({ drama }) => drama
  );
  const { suggestedBooks, suggestedBooksLoading } = useAppSelector(
    ({ book }) => book
  );
  const { register, handleSubmit, watch, setValue } = useForm<SearchForm>();
  const currentCategory = watch("category");

  // 2022/12/07 - 링크 이동 ( 히스토리 남기기 위함 ) - by 1-blue
  const onSumbit = handleSubmit(
    useCallback(
      ({ category, title }) => {
        if (!title.trim()) return toast.warn("검색어를 입력해주세요!");

        // 첫 검색이라면 현재 페이지 히스토리에 남기지 않기 ( 즉 "/search"인 경우에는 기록 남기지 않기 )
        navigate(`/search?category=${category}&title=${title}`, {
          replace: !queryCategory && !queryTitle,
        });
      },
      [navigate, queryTitle, queryCategory]
    )
  );

  // 2022/12/07 - 검색창 렌더링 여부 - by 1-blue
  const [isShowSearchForm, setIsShowSearchForm] = useState(true);
  const onCloseSearchForm: React.MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (!(e.target instanceof HTMLElement)) return alert(">>> 잘못된 접근");

      const { type } = e.target.dataset;

      if (type === "searchForm") setIsShowSearchForm(false);
    },
    []
  );

  // 2022/12/16 - 검색 후 처리 - by 1-blue
  useEffect(() => {
    setValue("title", queryTitle);
    setIsShowSearchForm(false);
  }, [dispatch, queryTitle, setValue, setIsShowSearchForm]);

  // 2022/12/07 - 네비게이션 바에서 검색링크를 누른 경우 검색창 렌더링 - by 1-blue
  const { state } = useLocation();
  useEffect(() => {
    if (state?.isShow) setIsShowSearchForm(true);
  }, [state]);

  // 해당 컴포넌트에서 "keyword"는 추천 검색어를 의미
  // 2022/12/13 - 추천 검색어 보여줄지 결정하는 변수 - by 1-blue
  const [isOpenKeyword, setIsOpenKeyword] = useState(false);

  // 2022/12/13 - 현재 포커싱중인 추천 검색어 - by 1-blue
  const [focusIndex, setFocusIndex] = useState(-1);

  // 2022/12/16 - 디바운스를 적용한 추천 검색어 요청 - by 1-blue
  const timerId = useRef<null | NodeJS.Timeout>(null);
  const keyword = watch("title");
  useEffect(() => {
    if (!keyword) return;
    if (timerId.current !== null) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      if (currentCategory === "movie") {
        dispatch(movieThunkService.suggestedMoviesThunk({ keyword }));
      } else if (currentCategory === "drama") {
        dispatch(dramaThunkService.suggestedDramasThunk({ keyword }));
      } else if (currentCategory === "book") {
        dispatch(bookThunkService.suggestedBooksThunk({ keyword }));
      }

      timerId.current = null;
      setIsOpenKeyword(true);
    }, 200);
  }, [timerId, keyword, dispatch, currentCategory]);

  // 2022/12/13 - 외부 클릭 시 추천 검색어 닫기 - by 1-blue
  const inputContainerRef = useRef<null | HTMLDivElement>(null);
  const handleClickOutSide = useCallback((e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;

    // FIXME: input의 ref를 얻어내기 힘들어서 아래와 같이 처리
    if (
      inputContainerRef.current?.firstElementChild?.lastElementChild ===
      e.target
    ) {
      setIsOpenKeyword(true);
      setFocusIndex(-1);
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
  const onMoveKeyword: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!linkContainerRef.current) return;
      if (!linkContainerRef.current.firstElementChild) return;

      // 추천 검색어 링크들 ( 방향키로 포커싱을 이동하기 위함 )
      const links = [
        ...linkContainerRef.current.firstElementChild.childNodes,
      ].filter((v): v is HTMLElement => v instanceof HTMLElement);

      // 추천 검색어의 길이
      let targetLength = 0;
      if (currentCategory === "movie") {
        targetLength = suggestedMovies.length || 0;
      } else if (currentCategory === "drama") {
        targetLength = suggestedDramas.length || 0;
      } else if (currentCategory === "book") {
        targetLength = suggestedBooks.length || 0;
      }

      switch (e.key) {
        case "ArrowDown":
          if (focusIndex + 1 >= targetLength) {
            setFocusIndex(0);
            links[0].focus();
          } else {
            setFocusIndex((prev) => prev + 1);
            links[focusIndex + 1].focus();
          }
          break;
        case "ArrowUp":
          if (focusIndex - 1 <= -1) {
            setFocusIndex(targetLength - 1);
            links[targetLength - 1].focus();
          } else {
            setFocusIndex((prev) => prev - 1);
            links[focusIndex - 1].focus();
          }
          break;
        case "Escape":
          setFocusIndex(-1);
          setIsOpenKeyword(false);

          // FIXME: "react-hook-form"에서 컴포넌트로 만든 "input"의 ref를 얻기 힘들어서 직접 찾아서 처리함
          // 즉 "<RHF.Input />"가 변경될 때마다 그에 맞게 수정해줘야 함
          // [type="search"]input에 포커싱
          if (
            inputContainerRef &&
            inputContainerRef.current &&
            inputContainerRef.current.firstElementChild instanceof
              HTMLElement &&
            inputContainerRef.current.firstElementChild
              .lastElementChild instanceof HTMLInputElement
          ) {
            inputContainerRef.current.firstElementChild.lastElementChild.focus();
          }
          break;

        default:
          break;
      }
    },
    [
      linkContainerRef,
      currentCategory,
      suggestedMovies,
      suggestedDramas,
      suggestedBooks,
      focusIndex,
    ]
  );

  return (
    <>
      {/* meta */}
      <HeadInfo
        title={`${watch("title") || currentCategory} | 검색`}
        description={`특정 영화 / 드라마 / 도서를 검색하는 페이지입니다.`}
      />

      {isShowSearchForm && (
        <RHF.Form
          onSubmit={onSumbit}
          className="fixed inset-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-[1]"
          onClick={onCloseSearchForm}
        >
          <div className="absolute top-[120px] px-[10vw] py-4 space-y-4">
            <RHF.Select
              register={register}
              name="category"
              htmlOptions={[
                { value: "movie", text: "영화" },
                { value: "drama", text: "드라마" },
                { value: "book", text: "도서" },
              ]}
              className="p-1 rounded-sm font-extrabold outline-none focus:ring-2 focus:ring-main-500"
            />

            <div className="w-[220px] xs:w-[250px]" onKeyDown={onMoveKeyword}>
              <div
                className="flex rounded-sm overflow-hidden font-bold focus-within:ring-2 focus-within:ring-main-500"
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
                  className="px-2 py-1 outline-none font-lg bg-main-500"
                >
                  <Icon shape="search" className="w-5 h-5 text-white" />
                </RHF.Button>
              </div>

              <div ref={linkContainerRef}>
                {/* 추천 검색어 패치중 */}
                {isOpenKeyword &&
                  (suggestedMoviesLoading ||
                    suggestedDramasLoading ||
                    suggestedBooksLoading) && <SkeletonUI.SuggestedWord />}
                {/* 추천 검색어 패치완료 */}
                {isOpenKeyword && currentCategory === "movie" && (
                  <Suggested.Movie setFocusIndex={setFocusIndex} />
                )}
                {isOpenKeyword && currentCategory === "drama" && (
                  <Suggested.Drama setFocusIndex={setFocusIndex} />
                )}
                {isOpenKeyword && currentCategory === "book" && (
                  <Suggested.Book setFocusIndex={setFocusIndex} />
                )}
              </div>
            </div>
          </div>
        </RHF.Form>
      )}

      {queryCategory === "movie" && <SearchKinds.Movie />}
      {queryCategory === "drama" && <SearchKinds.Drama />}
      {queryCategory === "book" && <SearchKinds.Book />}
    </>
  );
};

export default React.memo(Search);
