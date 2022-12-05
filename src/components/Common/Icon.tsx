import { useCallback } from "react";

// type
import type { IconShape } from "@src/types";

type Props = {
  shape: IconShape;
  className: string;
  isFill?: boolean;
};
const Icon = ({ shape, className, isFill }: Props) => {
  // 채운 아이콘
  const getFillIcon = useCallback((shape: IconShape) => {
    switch (shape) {
      case "search":
        return (
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
            clipRule="evenodd"
          />
        );
    }
  }, []);

  // 선 아이콘
  const getIcon = useCallback((shape: IconShape) => {
    switch (shape) {
      case "search":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        );
    }
  }, []);

  return (
    <>
      {isFill ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          {getFillIcon(shape)}
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={className}
        >
          {getIcon(shape)}
        </svg>
      )}
    </>
  );
};

export default Icon;
