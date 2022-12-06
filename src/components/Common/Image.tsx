import { useState } from "react";

// util
import { combineClassNames } from "@src/utils";

// 백그라운드 이미지
type BackgroundImageProps = {
  className: string;
  path: string;
  title: string;
  description: string;
  alt?: string;
};
const BackgroundImage = ({
  className,
  path,
  title,
  description,
  alt = "배경 이미지",
}: BackgroundImageProps) => {
  return (
    <figure
      className={combineClassNames(
        "relative bg-center bg-no-repeat bg-zinc-800 bg-fixed bg-contain flex justify-center",
        className
      )}
      style={{ backgroundImage: `url("${path}")` }}
    >
      <img src={path} alt={alt} hidden />
      <div className="absolute inset-0 bg-black/20 text-white text-center flex flex-col justify-end">
        <h4 className="my-2 text-2xl font-bold">{title}</h4>
        <p className="w-[600px] mx-auto mb-8">{description}</p>
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
};
const Poster = ({
  path,
  isCenter,
  alt = "포스터 이미지",
  title,
  description,
}: PosterProps) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <figure
      className="relative cursor-pointer"
      onMouseOver={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <img src={path} alt={alt} hidden className="" />
      {(isCenter || isShow) && title && (
        <div className="absolute inset-0 w-full h-full bg-black/50 text-white p-4">
          <h4 className="my-2 text-xl font-bold text-center">{title}</h4>
          <p className="poster-description">{description}</p>
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
