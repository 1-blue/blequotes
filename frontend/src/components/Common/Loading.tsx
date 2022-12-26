import { useEffect } from "react";

// component
import Spinner from "@src/components/Common/Spinner";

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
  FullScreen: typeof FullScreen;
};
const Loading: LoadingType = {
  FullScreen,
};

export default Loading;
