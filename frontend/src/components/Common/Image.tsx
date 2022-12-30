import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

// util
import { combineClassNames } from "@src/utils";

// hook
import useInnerSize from "@src/hooks/useInnerSize";

// type
import type { PostCategory } from "@src/types";

// 백그라운드 이미지
type BackgroundImageProps = {
  className: string;
  path: string;
  title?: string;
  description?: string;
  date?: string;
  alt?: string;
};
const BackgroundImage = ({
  className,
  path,
  title,
  description,
  date,
  alt = "배경 이미지",
}: BackgroundImageProps) => {
  return (
    <figure
      className={combineClassNames(
        "relative bg-center bg-no-repeat bg-zinc-800 bg-contain bg-fixed flex justify-center",
        className
      )}
      style={{ backgroundImage: `url("${path}")` }}
    >
      <img src={path} alt={alt} hidden />
      {(title || description || date) && (
        <div className="absolute inset-0 text-white text-center flex flex-col justify-end bg-gradient-to-b from-black/0 to-black/80">
          {title && <h4 className="my-2 text-2xl font-bold">{title}</h4>}
          {description && (
            <p className="max-w-[600px] px-4 mx-auto">{description}</p>
          )}
          {date && (
            <time className="text-center text-sm mt-4 mb-8">{date}</time>
          )}
        </div>
      )}
    </figure>
  );
};

// react-slick으로 사용할 포스터 이미지
type SlickPosterProps = {
  idx: string;
  category: PostCategory;
  paths: string[];
  isMainPoster: boolean;
  alt?: string;
  title?: string;
  description?: string;
  date: string;
};
const SlickPoster = ({
  idx,
  category,
  paths,
  isMainPoster,
  alt = "포스터 이미지",
  title,
  description,
  date,
}: SlickPosterProps) => {
  const [isShow, setIsShow] = useState(false);

  // 2022/12/19 - 게시글 및 게시글 작성 페이지 이동 시 클릭한 데이터 세션 스토리지에 저장 - by 1-blue
  const onSaveDataToStorage = useCallback(() => {
    sessionStorage.setItem(
      "data",
      JSON.stringify({ idx, category, title, description, paths, date })
    );
  }, [idx, category, title, description, paths, date]);

  // 2022/12/20 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/20 - 렌더링할 이미지 path - by 1-blue
  const targetPath = useMemo(() => {
    if (paths.length === 1) return paths[0];

    if (innerWidth >= 1024) return paths[1];
    else return paths[0];
  }, [paths, innerWidth]);

  return (
    <Link
      to={`/post/${title}`}
      state={{ idx, category }}
      onClick={onSaveDataToStorage}
    >
      <figure
        className="relative cursor-pointer flex justify-center bg-slate-400"
        onMouseOver={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
      >
        <img src={targetPath} alt={alt} className="h-60" />
        {(isMainPoster || isShow) && title && (
          <div className="absolute inset-0 w-full h-full bg-black/50 text-white p-4 flex flex-col">
            <h4 className="mb-2 text-xl font-bold text-center">{title}</h4>
            <p className="poster-description">{description}</p>
            <div className="flex-1" />
            <time className="text-center text-sm">{date}</time>
          </div>
        )}
      </figure>
    </Link>
  );
};

// 일반적으로 사용할 이미지
type PhotoProps = {
  path: string;
  alt: string;
  className: string;
};
const Photo = ({ path, alt, className }: PhotoProps) => {
  return (
    <figure style={{ backgroundImage: `url("${path}")` }} className={className}>
      <img src={path} alt={alt} hidden />
    </figure>
  );
};

type ImageType = {
  BackgroundImage: typeof BackgroundImage;
  SlickPoster: typeof SlickPoster;
  Photo: typeof Photo;
};
const Image: ImageType = {
  BackgroundImage,
  SlickPoster,
  Photo,
};

export default Image;
