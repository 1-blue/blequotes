import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/useRTK";
import { fetchMovie } from "@src/store/thunks";

// util
import { getMovieImagePath } from "@src/utils";

// hook
import useInnerSize from "@src/hooks/useInnerSize";

// component
import Image from "@src/components/Common/Image";
import SlickSlider from "@src/components/Common/SlickSlider";
import Loading from "@src/components/Common/Loading";

const Movie = () => {
  const dispatch = useAppDispatch();
  const { popular, top_rated, now_playing, fetchMovieLoading } = useAppSelector(
    ({ movie }) => movie
  );

  // 2022/12/05 - 각종 영화들 패치 - by 1-blue
  useEffect(() => {
    if (!popular) dispatch(fetchMovie({ category: "popular" }));
    if (!top_rated) dispatch(fetchMovie({ category: "top_rated" }));
    if (!now_playing) dispatch(fetchMovie({ category: "now_playing" }));
  }, [dispatch, popular, top_rated, now_playing]);

  // 2022/12/06 - 현재 width 구하기 - by 1-blue
  const [innerWidth] = useInnerSize();

  // 영화를 패치하는 중이라면
  if (!popular || !top_rated || !now_playing) return <Loading.Movie />;
  if (fetchMovieLoading) return <Loading.Movie />;

  // 메인 이미지로 사용할 랜덤한 영화 선택
  const index0To2 = Math.floor(Math.random() * 3);
  const index0To19 = Math.floor(Math.random() * 20);
  const target =
    index0To2 === 0 ? popular : index0To2 === 1 ? top_rated : now_playing;
  const randomImage = getMovieImagePath(target.results[index0To19].poster_path);

  return (
    <>
      <Image.BackgroundImage
        className="w-full h-screen"
        path={randomImage}
        title={target.results[index0To19].title}
        description={target.results[index0To19].overview}
        alt={target.results[index0To19].title + " 포스터 이미지"}
      />

      <div className="py-6" />

      {/* 인기 */}
      <section>
        <h3 className="font-jua text-4xl px-4 pb-2">인기 영화들</h3>
        <SlickSlider
          datas={popular.results.map((v) => ({
            path: getMovieImagePath(
              innerWidth >= 1024 ? v.backdrop_path : v.poster_path
            ),
            title: v.title,
            description: v.overview,
          }))}
        />
      </section>

      <div className="py-6" />

      {/* 최신 영화들 */}
      <section>
        <h3 className="font-jua text-4xl px-4 pb-2">최신 영화들</h3>
        <SlickSlider
          datas={now_playing.results.map((v) => ({
            path: getMovieImagePath(
              innerWidth >= 1024 ? v.backdrop_path : v.poster_path
            ),
            title: v.title,
            description: v.overview,
          }))}
        />
      </section>

      <div className="py-6" />

      {/* 지속적 인기 */}
      <section>
        <h3 className="font-jua text-4xl px-4 pb-2">꾸준한 인기 영화들</h3>
        <SlickSlider
          datas={top_rated.results.map((v) => ({
            path: getMovieImagePath(
              innerWidth >= 1024 ? v.backdrop_path : v.poster_path
            ),
            title: v.title,
            description: v.overview,
          }))}
        />

        <div className="py-6" />
      </section>
    </>
  );
};

export default Movie;
