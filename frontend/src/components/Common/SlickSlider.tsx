import { useCallback, useState } from "react";
import Slider from "react-slick";

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
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        height: "100%",
        zIndex: 1,
        backgroundColor: "#232323",
        color: "white",
      }}
    />
  );
};

const settings: Settings = {
  className: "center",
  centerMode: true,
  centerPadding: "40px",
  infinite: true,
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
    id: string;
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

  return (
    <Slider
      {...settings}
      {...rest}
      afterChange={afterChange}
      className="bg-zinc-300"
      prevArrow={<ArrowButton />}
      nextArrow={<ArrowButton />}
    >
      {datas.map(({ id, category, paths, title, description, date }, i) => (
        <Image.SlickPoster
          key={id}
          id={id}
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
