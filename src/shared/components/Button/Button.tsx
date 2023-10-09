import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';

function CustomChakraUiButton(props: ButtonProps) {
  return <ChakraButton
    variant={props.variant === 'primary' ? 'outline' : 'filled'}
    color={props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'}
    fontFamily={'body'}
    border={'2px'}
    borderColor={props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'}
    lineHeight={'1rem'}
    fontWeight={500}
    fontSize={'sm'}
    width={'full'}
    letterSpacing={'.07rem'}
    transition={'all .3s ease-in-out'}
    _hover={
      {
        borderColor: props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'
      }
    }
    _focus={
      {
        boxShadow: 'none',
        outline: 'none',
        borderColor: props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'
      }
    }
    {...props}
    colorScheme="blue"
  >
    {props.children}
  </ChakraButton>
}


export default CustomChakraUiButton;