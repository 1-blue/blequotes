import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// hook
import useScrollDirection from "@src/hooks/useScrollDirection";

// util
import { combineClassNames, throttleHelper } from "@src/utils";

const Header = () => {
  const [scrollYRatio, setScrollYRatio] = useState(0);
  const [isHide] = useScrollDirection();

  // 2022/12/05 - header 투명도를 위한 스크롤 이벤트 등록 - by 1-blue
  useEffect(() => {
    const handleScroll = () => {
      const ratio = Math.floor(window.scrollY >= 300 ? 60 : window.scrollY / 5);

      setScrollYRatio(ratio / 100);
    };
    const throttleScroll = throttleHelper(handleScroll, 50);

    window.addEventListener("scroll", throttleScroll);
  }, []);

  return (
    <header className="fixed inset-0">
      <section
        className="py-2 px-4 flex justify-between items-center text-white duration-200"
        style={{ backgroundColor: `rgba(0, 0, 0, ${scrollYRatio})` }}
      >
        <Link to="/">
          <span>로고</span>
        </Link>
        <button type="button">검색</button>
      </section>

      <nav
        className={combineClassNames(
          "px-8 py-2 bg-black text-white space-x-4 duration-200",
          isHide ? "translate-y-[-80px]" : "translate-y-[0px]"
        )}
        style={{ backgroundColor: `rgba(0, 0, 0, ${scrollYRatio})` }}
      >
        <Link to="/movie">영화</Link>
        <Link to="/">드라마</Link>
        <Link to="/">도서</Link>
      </nav>
    </header>
  );
};

export default Header;
