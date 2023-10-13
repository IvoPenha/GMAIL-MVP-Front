import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";
import { Box, } from "@chakra-ui/react";
interface props {
  children: React.ReactNode[];
}
export const CarouselContainer = ({
  children,
}: props) => {
  const settings: Settings = {
    dots: false,
    speed: 500,
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 0,
    initialSlide: 1,
    draggable: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const sliderRef = useRef<any>();

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
        gap={8}
        borderRadius={8}
      >
      </Box>
      <Slider {...settings} ref={sliderRef} >
        {children}
      </Slider>
    </Box>
  );
};
