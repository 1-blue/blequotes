// component
import Spinner from "@src/components/Common/Spinner";
import Icon from "@src/components/Common/Icon";

/**
 * 2022/12/14 - 영화/드라마/도서 패치 스켈레톤 UI - by 1-blue
 */
const Page = () => {
  return (
    <aside>
      <div className="w-full flex flex-col justify-center items-center space-y-2 bg-black/70">
        <Spinner.Relative outerClassName="absolute top-1/3" />

        <div className="w-full h-[80vh]">
          <div className="bg-white w-[50vw] min-w-[500px] h-full mx-auto flex flex-col justify-end px-4 pb-4 space-y-2">
            <div className="bg-gray-300 w-full h-10 rounded-sm mb-2" />
            {Array(6)
              .fill(null)
              .map((v, i) => (
                <div key={i} className="bg-gray-300 w-full h-5 rounded-sm" />
              ))}
          </div>
        </div>
      </div>

      <div className="py-6" />

      <div className="flex space-x-2">
        <div className="w-full h-[30vh] bg-gray-300"></div>
        <div className="w-full h-[30vh] bg-gray-300 px-4 py-2 space-y-2">
          <div className="bg-gray-100 w-full h-[15%] rounded-sm"></div>
          {Array(4)
            .fill(null)
            .map((v, i) => (
              <div key={i} className="bg-gray-100 w-full h-[8%] rounded-sm" />
            ))}
        </div>
        <div className="w-full h-[30vh] bg-gray-300"></div>
      </div>
    </aside>
  );
};

/**
 * 2022/12/25 - 게시글 패치 스켈레톤 UI - by 1-blue
 */
const Posts = () => {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((v, i) => (
          <li
            key={i}
            className="group relative pt-[80%] bg-gray-100 rounded-md shadow-xl text-white overflow-hidden transition-all hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 transition-colors group-hover:bg-black/50" />

            <div className="absolute top-[10%] left-[10%] w-[80%] space-y-2 z-[1]">
              <div className="w-full h-8 mb-4 bg-gray-200 rounded" />

              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-full h-4 bg-gray-200 rounded" />
            </div>

            <div className="absolute bottom-[4%] right-[4%] self-end z-[1] space-y-1">
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="like" className="w-5 h-5" />
                <span className="text-sm">
                  <b>0</b>
                </span>
              </button>
              <button type="button" className="flex items-center space-x-1">
                <Icon shape="hate" className="w-5 h-5" />
                <span className="text-sm">
                  <b>0</b>
                </span>
              </button>
            </div>
          </li>
        ))}
    </>
  );
};

/**
 * 2022/12/14 - 추천 영화 검색 로딩 스켈레톤 UI - by 1-blue
 */
const SuggestedWord = () => {
  return (
    <aside className="w-full p-4 mt-1 flex flex-col justify-center items-center space-y-2 bg-white">
      <div className="w-full h-6 bg-gray-300 rounded-sm" />
      <div className="w-full h-6 bg-gray-300 rounded-sm" />
      <Spinner.Relative />
      <div className="w-full h-6 bg-gray-300 rounded-sm" />
      <div className="w-full h-6 bg-gray-300 rounded-sm" />
    </aside>
  );
};

/**
 * 2023/01/02 - 상세 대상 패치 스켈레톤 UI - by 1-blue
 */
const DetailTarget = () => {
  return (
    <aside className="w-full flex flex-col justify-center items-center space-y-2 bg-black/70">
      <Spinner.Relative outerClassName="absolute top-1/3" />

      <div className="w-full h-[100vh]">
        <div className="bg-white w-[50vw] min-w-[600px] h-full mx-auto flex flex-col justify-end px-4 pb-4 space-y-2">
          <div className="bg-gray-300 w-full h-10 rounded-sm mb-2" />
          {Array(6)
            .fill(null)
            .map((v, i) => (
              <div key={i} className="bg-gray-300 w-full h-5 rounded-sm" />
            ))}
        </div>
      </div>
    </aside>
  );
};

type SkeletonUIType = {
  Page: typeof Page;
  Posts: typeof Posts;
  SuggestedWord: typeof SuggestedWord;
  DetailTarget: typeof DetailTarget;
};
const SkeletonUI: SkeletonUIType = {
  Page,
  Posts,
  SuggestedWord,
  DetailTarget,
};

export default SkeletonUI;
