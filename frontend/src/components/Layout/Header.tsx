import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// hook
import useScrollDirection from "@src/hooks/useScrollDirection";

// util
import { combineClassNames, throttleHelper } from "@src/utils";

// component
import Icon from "@src/components/Common/Icon";

const Header = () => {
  const { pathname } = useLocation();
  const [isHide] = useScrollDirection();
  const [scrollYRatio, setScrollYRatio] = useState(0);

  // 2022/12/05 - header 투명도를 위한 스크롤 이벤트 등록 - by 1-blue
  useEffect(() => {
    const handleScroll = () => {
      const ratio =
        Math.floor(window.scrollY >= 200 ? 50 : window.scrollY / 4) + 10;

      setScrollYRatio(ratio / 100);
    };
    const throttleScroll = throttleHelper(handleScroll, 50);

    throttleScroll();

    window.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, []);

  return (
    <>
      <header
        className={combineClassNames(
          "fixed inset-0 bottom-auto duration-200 z-10",
          isHide ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <section
          className="py-2 px-4 flex justify-between items-center text-white backdrop-blur-sm"
          style={{ backgroundColor: `rgba(0, 0, 0, ${scrollYRatio})` }}
        >
          <Link to="/" className="focus-ring-header">
            <img src="/logo.png" alt="" className="w-10 h-10" />
          </Link>
          <Link
            to="/search"
            state={{ isShow: true }}
            className="focus-ring-header"
          >
            <Icon shape="search" className="w-8 h-8" />
          </Link>
        </section>

        <nav
          className="flex px-8 text-white space-x-4 bg-filter backdrop-blur-sm"
          style={{ backgroundColor: `rgba(0, 0, 0, ${scrollYRatio})` }}
        >
          <Link
            to="/movie"
            className={combineClassNames(
              "font-bold pt-2 pb-0.5 transition-colors focus:outline-none hover:text-main-500 focus:text-main-500 hover:border-main-500 focus:border-main-500",
              pathname.includes("movie")
                ? "border-b-2 text-main-400 border-main-400"
                : ""
            )}
          >
            영화
          </Link>
          <Link
            to="/drama"
            className={combineClassNames(
              "font-bold pt-2 pb-0.5 transition-colors focus:outline-none hover:text-main-500 focus:text-main-500 hover:border-main-500 focus:border-main-500",
              pathname.includes("drama")
                ? "border-b-2 text-main-400 border-main-400"
                : ""
            )}
          >
            드라마
          </Link>
          <Link
            to="/book"
            className={combineClassNames(
              "font-bold pt-2 pb-0.5 transition-colors focus:outline-none hover:text-main-500 focus:text-main-500 hover:border-main-500 focus:border-main-500",
              pathname.includes("book")
                ? "border-b-2 text-main-400 border-main-400"
                : ""
            )}
          >
            도서
          </Link>
        </nav>
      </header>
    </>
  );
};

export default React.memo(Header);
