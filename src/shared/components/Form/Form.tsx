import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  DefaultValues,
  FieldError,
  FieldValues,
  useForm,
} from "react-hook-form";
import { Box, Button } from "@chakra-ui/react";
import { Input } from "./Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconType } from 'react-icons';

interface FormProps<T extends FieldValues> {
  values: T & {
    [key: string]: {
      inputType: string;
      label: string;
      key: string;
      defaultValue: string;
      icon?: IconType
    };
  };
  onSubmit: (data: T) => Promise<void>;
  validationSchema?: yup.ObjectSchema<any>;
}

const GenericForm: ForwardRefRenderFunction<any, FormProps<any>> = (
  { values, onSubmit, validationSchema },
  ref
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: values.defaultValues as DefaultValues<any>,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  function isRequiredField(key: string) {
    const field = validationSchema?.fields[key] as
      | {
        spec: { optional: boolean };
      }
      | undefined;
    if (!field) {
      return false;
    }
    return !field.spec.optional;
  }

  return (
    <Box
      width={'calc(100%)'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={3} ref={ref}>
          {Object.keys(values).map((key) => {
            const value = values[key];
            return (
              <Input
                isRequiredField={
                  isRequiredField(value.key) || value.inputType === "password"
                }
                key={key}
                label={value.label ? value.label : value["key"]}
                type={value.inputType ? value.inputType : "text"}
                defaultValue={value.defaultValue ? value.defaultValue : ""}
                error={errors[value.key] as FieldError}
                icon={value.icon}
                {...register(value.key)}
              />
            );
          })}
          <Button type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>

  );
};

export default forwardRef(GenericForm);
