import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { dramaThunkService } from "@src/store/thunks";

// util
import { getMovieDBImagePath } from "@src/utils";

// component
import Image from "@src/components/Common/Image";
import SlickSlider from "@src/components/Common/SlickSlider";
import SkeletonUI from "@src/components/Common/SkeletonUI";

// type
import type { PostCategory } from "@src/types";

const Drama = () => {
  const dispatch = useAppDispatch();
  const { popular, top_rated, on_the_air, fetchDramasLoading } = useAppSelector(
    ({ drama }) => drama
  );

  // 2022/12/15 - 각종 드라마들 패치 - by 1-blue
  useEffect(() => {
    if (popular.length === 0) {
      dispatch(dramaThunkService.fetchDramasThunk({ category: "popular" }));
    }
    if (top_rated.length === 0) {
      dispatch(dramaThunkService.fetchDramasThunk({ category: "top_rated" }));
    }
    if (on_the_air.length === 0) {
      dispatch(dramaThunkService.fetchDramasThunk({ category: "on_the_air" }));
    }
  }, [dispatch, popular, top_rated, on_the_air]);
  // 2022/12/15 - 인기 / 현재 상영중 / 꾸준한 인기 드라마들 필터링 ( 현재 브라우저 사이즈에 맞는 이미지 없는 경우 제외 ) - by 1-blue
  const filteredPopularDatas = useMemo(
    () =>
      popular
        .filter((v) => v.backdrop_path || v.poster_path)
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
        }),
    [popular]
  );
  const filteredOnTheAirDatas = useMemo(
    () =>
      on_the_air
        .filter((v) => v.backdrop_path || v.poster_path)
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
        }),
    [on_the_air]
  );
  const filteredTopRatedDatas = useMemo(
    () =>
      top_rated
        .filter((v) => v.backdrop_path || v.poster_path)
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
        }),
    [top_rated]
  );

  // 드라마를 패치하는 중이라면
  if (popular.length === 0 || top_rated.length === 0 || on_the_air.length === 0)
    return <SkeletonUI.Page />;
  if (fetchDramasLoading) return <SkeletonUI.Page />;

  // 메인 이미지로 사용할 랜덤한 드라마 선택
  const index0To2 = Math.floor(Math.random() * 3);
  const index0To19 = Math.floor(Math.random() * 20);
  const target =
    index0To2 === 0 ? popular : index0To2 === 1 ? top_rated : on_the_air;

  const randomImage = getMovieDBImagePath(target[index0To19].poster_path);

  return (
    <>
      <Image.BackgroundImage
        className="w-full h-screen"
        path={randomImage}
        title={target[index0To19].name}
        description={target[index0To19].overview}
        date={target[index0To19].first_air_date}
        alt={target[index0To19].name + " 포스터 이미지"}
      />

      <div className="py-6" />

      {/* 인기 */}
      {filteredPopularDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">인기 드라마들</h3>
          <SlickSlider datas={filteredPopularDatas} />

          <div className="py-6" />
        </section>
      )}

      {/* 현재 방영중인 드라마들 */}
      {filteredOnTheAirDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">
            현재 방영중인 드라마들
          </h3>
          <SlickSlider datas={filteredOnTheAirDatas} />

          <div className="py-6" />
        </section>
      )}

      {/* 지속적 인기 */}
      {filteredTopRatedDatas && (
        <section>
          <h3 className="font-jua text-4xl px-4 pb-2">꾸준한 인기 드라마들</h3>
          <SlickSlider datas={filteredTopRatedDatas} />

          <div className="py-6" />
        </section>
      )}
    </>
  );
};

export default Drama;
