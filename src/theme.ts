import { extendTheme } from "@chakra-ui/react";
const breakpoints = {
  base: "0px",
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
  "3xl": "1920px",
};
const Menu = {
  baseStyle: {
    menu: {
      border: 'none',
      outline: 'none',
      fontSize: '0.75rem',
    },
    item: {
      maxW: '8rem',
      borderRadius: 'none',
      border: 'none',
      outline: 'none',
      _hover: {
        bg: '#DCDCDC',
        border: 'none',
        outline: 'none',
        keyframe: 'none'
      },
      _focus: {
        border: 'none',
        outline: '0px',
        keyframe: 'none'
      },
      height: '2.5rem',
      paddingY: '0.5rem',
      _after: {
        border: 'none',
        outline: 'none',
      },


    },
    list: {
      color: 'softText',
      minWidth: 'none',
      width: '8rem',
      paddingY: '8px',
      position: 'absolute',
      inset: '0px auto auto 0px',
      transform: 'translateX(-5 0%)',
    }
  }
}


export const theme = extendTheme({
  components: {
    Menu,
    breakpoints
  },
  colors: {
    primary: "#369FFF",
    surface: "#FFFFFF",
    highlight: "#006ED3",
    soft: "#49AFCF",
    danger: "#CF4949",
    warning: "#FFEDBF",
    yellow: "#CFBA49",
    neutral: "#787878",
    softText: "#474747",
    subtitle: "#8EA3B7",
    estatisticaCard: "#369FFF1A",
    success: "#49CF87"
  },
  fonts: {
    body: "Roboto",
    logo: "Audiowide",
    manrope: "Manrope",
  },

});
