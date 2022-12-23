import { useEffect } from "react";

// component
import Spinner from "@src/components/Common/Spinner";

/**
 * 2022/12/14 - 추천 영화 검색 로딩에 사용할 대체 화면 - by 1-blue
 * @returns
 */
const Keyword = () => {
  return (
    <aside className="w-full p-4 mt-1 flex flex-col justify-center items-center space-y-2 bg-white">
      <div className="w-full h-6 bg-main-200/80 rounded-sm" />
      <div className="w-full h-6 bg-main-200/80 rounded-sm" />
      <Spinner.Relative />
      <div className="w-full h-6 bg-main-200/80 rounded-sm" />
      <div className="w-full h-6 bg-main-200/80 rounded-sm" />
    </aside>
  );
};

/**
 * 2022/12/14 - 영화 패치 및 검색 로딩에 사용할 대체 화면 - by 1-blue
 * @returns
 */
const Movie = () => {
  return (
    <>
      <aside className="w-full flex flex-col justify-center items-center space-y-2 bg-black/70">
        <Spinner.Relative outerClassName="absolute top-1/3" />

        <div className="w-full h-[80vh]">
          <div className="bg-white w-[80vw] h-full mx-auto flex flex-col justify-end px-4 pb-4 space-y-2">
            <div className="bg-main-200/80 w-full h-10 rounded-sm mb-2" />
            {Array(6)
              .fill(null)
              .map((v, i) => (
                <div key={i} className="bg-main-200/80 w-full h-5 rounded-sm" />
              ))}
          </div>
        </div>
      </aside>

      <div className="py-6" />

      <div className="flex space-x-2">
        <div className="w-full h-[30vh] bg-main-200/80"></div>
        <div className="w-full h-[30vh] bg-main-200/80 px-4 py-2 space-y-2">
          <div className="bg-main-400 w-full h-[15%] rounded-sm"></div>
          {Array(4)
            .fill(null)
            .map((v, i) => (
              <div key={i} className="bg-main-400 w-full h-[8%] rounded-sm" />
            ))}
        </div>
        <div className="w-full h-[30vh] bg-main-200/80"></div>
      </div>
    </>
  );
};

/**
 * 2022/12/18 - 도서 패치 및 검색 로딩에 사용할 대체 화면 - by 1-blue
 * @returns
 */
const Book = () => {
  return (
    <>
      <aside className="w-full flex flex-col justify-center items-center space-y-2 bg-black/70">
        <Spinner.Relative outerClassName="absolute top-1/3" />

        <div className="w-full h-[80vh]">
          <div className="bg-white w-[80vw] h-full mx-auto flex flex-col justify-end px-4 pb-4 space-y-2">
            <div className="bg-main-200/80 w-full h-10 rounded-sm mb-2" />
            {Array(6)
              .fill(null)
              .map((v, i) => (
                <div key={i} className="bg-main-200/80 w-full h-5 rounded-sm" />
              ))}
          </div>
        </div>
      </aside>

      <div className="py-6" />

      <div className="flex space-x-2">
        <div className="w-full h-[30vh] bg-main-200/80"></div>
        <div className="w-full h-[30vh] bg-main-200/80 px-4 py-2 space-y-2">
          <div className="bg-main-400 w-full h-[15%] rounded-sm"></div>
          {Array(4)
            .fill(null)
            .map((v, i) => (
              <div key={i} className="bg-main-400 w-full h-[8%] rounded-sm" />
            ))}
        </div>
        <div className="w-full h-[30vh] bg-main-200/80"></div>
      </div>
    </>
  );
};

/**
 * 2022/12/16 - 드라마 패치 및 검색 로딩에 사용할 대체 화면 - by 1-blue
 * @returns
 */
const Drama = () => {
  return (
    <>
      <aside className="w-full flex flex-col justify-center items-center space-y-2 bg-black/70">
        <Spinner.Relative outerClassName="absolute top-1/3" />

        <div className="w-full h-[80vh]">
          <div className="bg-white w-[80vw] h-full mx-auto flex flex-col justify-end px-4 pb-4 space-y-2">
            <div className="bg-main-200/80 w-full h-10 rounded-sm mb-2" />
            {Array(6)
              .fill(null)
              .map((v, i) => (
                <div key={i} className="bg-main-200/80 w-full h-5 rounded-sm" />
              ))}
          </div>
        </div>
      </aside>

      <div className="py-6" />

      <div className="flex space-x-2">
        <div className="w-full h-[30vh] bg-main-200/80"></div>
        <div className="w-full h-[30vh] bg-main-200/80 px-4 py-2 space-y-2">
          <div className="bg-main-400 w-full h-[15%] rounded-sm"></div>
          {Array(4)
            .fill(null)
            .map((v, i) => (
              <div key={i} className="bg-main-400 w-full h-[8%] rounded-sm" />
            ))}
        </div>
        <div className="w-full h-[30vh] bg-main-200/80"></div>
      </div>
    </>
  );
};

/**
 * 2022/12/22 - 전체 화면을 검은색으로 덮고 스피너 렌더링 - by 1-blue
 */
const FullScreen = ({ message }: { message?: string }) => {
  // 로딩중에 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <aside className="fixed inset-0 w-screen h-screen bg-black/70">
      {message && (
        <span className="fixed inset-0 top-1/4 text-white text-2xl font-bold text-center">
          {message}
        </span>
      )}
      <Spinner.Absolute />
    </aside>
  );
};

type LoadingType = {
  Keyword: typeof Keyword;
  Movie: typeof Movie;
  Drama: typeof Drama;
  Book: typeof Book;
  FullScreen: typeof FullScreen;
};
const Loading: LoadingType = {
  Keyword,
  Movie,
  Drama,
  Book,
  FullScreen,
};

export default Loading;
