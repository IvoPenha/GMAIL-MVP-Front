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
    initialSlide: 0,
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
    <Box
      height={'120px'}
    >
      <Box
        display={{ base: "block", lg: "none" }}
      >
        <Slider {...settings} ref={sliderRef} >
          {children}
        </Slider>
      </Box>
      <Box
        display={{ base: "none", lg: "flex" }}
        width={'full'}
        justifyContent={'space-between'}
        __css={{
          '.estatisticaCard': {
            minW: { '2xl': '18rem', xl: '13rem', lg: '10rem' },
            padding: 0
          }
        }}
      >
        {children}
      </Box>
    </Box >
  );
};
