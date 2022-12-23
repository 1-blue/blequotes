import { Link } from "react-router-dom";

// component
import Icon from "@src/components/Common/Icon";

type Props = {
  title?: string;
};

const NotFountPost = ({ title }: Props) => {
  return (
    <section className="absolute inset-0 w-screen h-screen flex flex-col justify-center items-center">
      <h4 className="font-extrabold text-2xl px-4 mb-2">다시 접근해주세요!</h4>

      <h4 className="font-extrabold text-2xl px-4 mb-6">
        "{title || "잘못된 접근입니다."}"
      </h4>

      <Icon shape="arrowDown" className="w-10 h-10 animate-bounce mb-2" />

      <div className="flex space-x-2">
        <Link
          to={`/search?category=movie&title=${title}`}
          replace
          className="bg-main-500 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-600 focus-ring transition-colors"
        >
          영화 찾기
        </Link>
        <Link
          to={`/search?category=drama&title=${title}`}
          replace
          className="bg-main-500 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-600 focus-ring transition-colors"
        >
          드라마 찾기
        </Link>
        <Link
          to={`/search?category=book&title=${title}`}
          replace
          className="bg-main-500 px-4 py-2 font-bold text-lg rounded-sm text-white hover:bg-main-600 focus-ring transition-colors"
        >
          도서 찾기
        </Link>
      </div>
    </section>
  );
};

export default NotFountPost;
