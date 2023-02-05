import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// util
import { combineClassNames } from "@src/utils";

// hook
import useInnerSize from "@src/hooks/useInnerSize";

// type
import type { PostCategory, TargetInformation } from "@src/types";

// 백그라운드 이미지
type BackgroundImageProps = {
  className: string;
  path: string;
  title?: string;
  description?: string;
  date?: string;
  alt?: string;
  information?: TargetInformation;
};
const BackgroundImage = ({
  className,
  path,
  title,
  description,
  date,
  alt = "배경 이미지",
  information,
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
        <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-b from-black/0 to-black/80">
          <div className="max-w-[600px] flex flex-col justify-center text-white mb-10">
            {information && (
              <div className="flex flex-col items-end text-xs space-y-1">
                {/* 한줄 설명 */}
                {information.tagline && (
                  <span className="absolute top-1/2 text-lg font-bold mb-8 self-center">
                    "{information.tagline}"
                  </span>
                )}
                {/* 장르 */}
                {information.genres && information.genres.length > 0 && (
                  <ul className="flex space-x-1">
                    {information.genres.map((genre) => (
                      <li
                        key={genre.id}
                        className="bg-indigo-600 text-white px-2 py-1 rounded-sm font-bold"
                      >
                        {genre.name}
                      </li>
                    ))}
                  </ul>
                )}
                {/* 런타임, 몇 회 */}
                <div className="space-x-2">
                  {information.runtime && <span>{information.runtime}분</span>}
                  {information.numerOfEpisodes && (
                    <span>{information.numerOfEpisodes}부작</span>
                  )}
                </div>

                {/* 저자들 */}
                {information.authors && information.authors.length > 0 && (
                  <ul className="flex space-x-1">
                    {information.authors.map((author) => (
                      <li
                        key={author}
                        className="bg-indigo-600 text-white px-2 py-1 rounded-sm font-bold"
                      >
                        {author}
                      </li>
                    ))}
                  </ul>
                )}
                {/* 가격 */}
                {information.price && <span>{information.price}원</span>}
              </div>
            )}

            {title && (
              <h4 className="my-2 text-center text-2xl font-bold">{title}</h4>
            )}
            {description && <p className="px-4 mx-auto">{description}</p>}
            {date && (
              <time className="text-center text-sm mt-2 mb-4">{date}</time>
            )}
          </div>
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

  // 2022/12/20 - 브라우저 width - by 1-blue
  const [innerWidth] = useInnerSize();

  // 2022/12/20 - 렌더링할 이미지 path - by 1-blue
  const targetPath = useMemo(() => {
    if (paths.length === 1) return paths[0];

    if (innerWidth >= 1024) return paths[1];
    else return paths[0];
  }, [paths, innerWidth]);

  return (
    <Link to={`/post/${title}`} state={{ idx, category }} tabIndex={-1}>
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
