import { useCallback, useState } from "react";
import Slider from "react-slick";

// component
import Image from "@src/components/Common/Image";

// type
import type { Settings } from "react-slick";

const settings: Settings = {
  className: "center",
  centerMode: true,
  centerPadding: "40px",
  infinite: true,
  slidesToShow: 3,
  speed: 500,
  arrows: false,
  dots: true,
  responsive: [
    { breakpoint: 400, settings: { slidesToShow: 1 } },
    { breakpoint: 700, settings: { slidesToShow: 2 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
  ],
};

type Props = {
  datas: {
    path: string;
    title?: string;
    description?: string;
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
    >
      {datas.map(({ path, title, description }, i) => (
        <Image.Poster
          key={path}
          path={path}
          isCenter={currentPoster === i}
          alt={title + " 이미지"}
          title={title}
          description={description}
        />
      ))}
    </Slider>
  );
};

export default SlickSlider;
