import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import './Button.css'

function CustomChakraUiButton(props: ButtonProps) {
  return <ChakraButton
    variant={(props.variant === 'primary' || props.variant === 'error') ? 'outline' : 'filled'}
    color={props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'}
    fontFamily={'body'}
    border={'2px'}
    borderColor={props.variant === 'primary' ? 'primary' : props.variant === 'error' ? 'danger' : 'surface'}
    bg={props.variant === 'primary' ? 'surface' : props.variant === 'error' ? 'surface' : 'primary'}
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
    isLoading={false}
    colorScheme="blue"
  >
    {props.isLoading ? <><div className={props.variant === 'primary' ? 'dot-typing-primary' : props.variant === 'error' ? 'dot-typing-error' : 'dot-typing-filled'}></div></> : props.children}
  </ChakraButton>
}


export default CustomChakraUiButton;