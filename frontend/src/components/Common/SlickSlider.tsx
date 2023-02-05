import { useCallback, useMemo, useState } from "react";
import Slider from "react-slick";

// hook
import useInnerSize from "@src/hooks/useInnerSize";

// component
import Image from "@src/components/Common/Image";

// type
import type { Settings } from "react-slick";
import type { PostCategory } from "@src/types";

type ArrowButtonProps = {
  className?: string;
  onClick?: () => void;
};
const ArrowButton = ({ className, onClick }: ArrowButtonProps) => {
  return <button type="button" className={className} onClick={onClick} />;
};

const settings: Settings = {
  className: "center",
  centerMode: true,
  centerPadding: "40px",
  infinite: false,
  slidesToShow: 3,
  speed: 500,
  arrows: true,
  dots: true,
  touchMove: false,
  responsive: [
    { breakpoint: 400, settings: { slidesToShow: 1 } },
    { breakpoint: 700, settings: { slidesToShow: 2 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
  ],
};

type Props = {
  datas: {
    idx: string;
    category: PostCategory;
    paths: string[];
    title?: string;
    description?: string;
    date: string;
  }[];
} & Partial<Settings>;

const SlickSlider = ({ datas, ...rest }: Props) => {
  const [currentPoster, setCurrentPoster] = useState(0);

  const afterChange = useCallback((currentSlide: number) => {
    setCurrentPoster(currentSlide);
  }, []);

  /**
   * 1024 이상인데 이미지가 2개 이하인 경우
   * 700 이상인데 이미지가 1개 이하인 경우
   */
  const [innerWidth] = useInnerSize();
  const infinite = useMemo(() => {
    if (innerWidth >= 1024 && datas.length <= 2) return false;
    if (innerWidth >= 400 && datas.length <= 1) return false;

    return true;
  }, [innerWidth, datas]);

  return (
    <Slider
      {...settings}
      {...rest}
      afterChange={afterChange}
      className="bg-zinc-300"
      prevArrow={<ArrowButton />}
      nextArrow={<ArrowButton />}
      infinite={infinite}
    >
      {datas.map(({ idx, category, paths, title, description, date }, i) => (
        <Image.SlickPoster
          key={idx}
          idx={idx}
          category={category}
          paths={paths}
          isMainPoster={currentPoster === i}
          alt={title + " 이미지"}
          title={title}
          description={description}
          date={date}
        />
      ))}
    </Slider>
  );
};

export default SlickSlider;
