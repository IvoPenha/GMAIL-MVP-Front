import { Input as ChakraInput, InputProps as ChakraInputProps, FormControl, FormErrorMessage, Icon, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { ForwardedRef, forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";
import { PiEye, PiEyeClosed } from 'react-icons/pi';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  isRequiredField?: boolean;
  icon?: IconType
}

const InputBase = ({ name, label, error, isRequiredField, icon, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [show, setShow] = useState(false)

  return (
    <FormControl isInvalid={!!error}>
      {/* {label && <FormLabel htmlFor={name}>{label} {isRequiredField && '*'} </FormLabel>} */}
      <InputGroup
      >{
          icon &&
          <InputLeftElement pointerEvents="none" height={'full'}  >
            <Icon as={icon} fontSize={'1.5rem'} color={'gray.500'} />
          </InputLeftElement>}
        <ChakraInput
          name={name}
          id={name}
          placeholder={label}
          focusBorderColor="primary"
          variant="outline"
          size="lg"
          ref={ref}
          {...rest}
          paddingY={7}
          type={show ? 'text' : rest.type}
        />
        {
          rest.type === 'password' &&
          <InputRightElement height={'full'} width={'3rem'} >
            <Icon as={!show ? PiEyeClosed : PiEye} cursor={'pointer'} fontSize={'1.5rem'} color={'gray.500'} onClick={() => setShow(!show)} />
          </InputRightElement>
        }
      </InputGroup>

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
