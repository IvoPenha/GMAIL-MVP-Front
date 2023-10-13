import { extendTheme } from "@chakra-ui/react";

const Menu = {
  baseStyle: {
    menu: {
      border: 'none',
      outline: 'none',

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
      }

    },
    list: {
      color: 'softText',
      minWidth: 'none',
      width: '8rem',
      paddingY: '8px',

    }
  }
}


export const theme = extendTheme({
  components: {
    Menu,
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
