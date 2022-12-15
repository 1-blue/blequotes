import { useState } from "react";

// util
import { combineClassNames } from "@src/utils";

// 백그라운드 이미지
type BackgroundImageProps = {
  className: string;
  path: string;
  title: string;
  description: string;
  date: string;
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
      <div className="absolute inset-0 text-white text-center flex flex-col justify-end bg-gradient-to-b from-black/0 to-black/80">
        <h4 className="my-2 text-2xl font-bold">{title}</h4>
        <p className="max-w-[600px] px-4 mx-auto">{description}</p>
        <time className="text-center text-sm mt-4 mb-8">{date}</time>
      </div>
    </figure>
  );
};

// 포스터 이미지
type PosterProps = {
  path: string;
  isCenter: boolean;
  alt?: string;
  title?: string;
  description?: string;
  date: string;
};
const Poster = ({
  path,
  isCenter,
  alt = "포스터 이미지",
  title,
  description,
  date,
}: PosterProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <figure
      className="relative cursor-pointer"
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <img src={path} alt={alt} />
      {(isCenter || isShow) && title && (
        <div className="absolute inset-0 w-full h-full bg-black/50 text-white p-4 flex flex-col">
          <h4 className="my-2 text-xl font-bold text-center">{title}</h4>
          <p className="poster-description">{description}</p>
          <div className="flex-1" />
          <time className="text-center text-sm">{date}</time>
        </div>
      )}
    </figure>
  );
};

type ImageType = {
  BackgroundImage: typeof BackgroundImage;
  Poster: typeof Poster;
};
const Image: ImageType = {
  BackgroundImage,
  Poster,
};

export default Image;
