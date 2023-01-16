import { Link } from "react-router-dom";

// component
import Icon from "@src/components/Common/Icon";

const All = () => {
  return (
    <>
      {/* 네비게이션 바의 높이가 92px이라서 상단을 띄워주기 위해 사용 */}
      <section className="h-[92px] bg-gray-600 mb-6"></section>

      <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
        <h4 className="font-extrabold text-2xl px-4 mb-2">
          다시 접근해주세요!
        </h4>

        <h4 className="font-extrabold text-2xl px-4 mb-6">
          존재하지 않는 URL입니다.
        </h4>

        <Icon shape="arrowDown" className="w-10 h-10 animate-bounce mb-2" />

        <Link
          to="/"
          className="bg-main-400 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-500 focus-ring transition-colors"
        >
          메인 페이지로 이동
        </Link>
      </section>
    </>
  );
};

type NotFountPostProps = {
  title?: string;
};

const Post = ({ title }: NotFountPostProps) => {
  return (
    <>
      {/* 네비게이션 바의 높이가 92px이라서 상단을 띄워주기 위해 사용 */}
      <section className="h-[92px] bg-gray-600 mb-6"></section>

      <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
        <h4 className="font-extrabold text-2xl px-4 mb-2">
          다시 접근해주세요!
        </h4>

        <h4 className="font-extrabold text-2xl px-4 mb-6">
          "{title || "잘못된 접근입니다."}"
        </h4>

        <Icon shape="arrowDown" className="w-10 h-10 animate-bounce mb-2" />

        <div className="flex space-x-2">
          <Link
            to={`/search?category=movie&title=${title}`}
            replace
            className="bg-main-400 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-500 focus-ring transition-colors"
          >
            영화 찾기
          </Link>
          <Link
            to={`/search?category=drama&title=${title}`}
            replace
            className="bg-main-400 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-500 focus-ring transition-colors"
          >
            드라마 찾기
          </Link>
          <Link
            to={`/search?category=book&title=${title}`}
            replace
            className="bg-main-400 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-500 focus-ring transition-colors"
          >
            도서 찾기
          </Link>
        </div>
      </section>
    </>
  );
};

type NotFoundPageType = {
  All: typeof All;
  Post: typeof Post;
};
const NotFoundPage: NotFoundPageType = {
  All,
  Post,
};

export default NotFoundPage;
