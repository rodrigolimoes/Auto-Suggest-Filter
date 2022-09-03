import React from "react";
import { Input } from "./style";

interface TextFieldStateProps {
  placeholder: string;
  value: string;
}

interface TextFieldDispatchProps {
  onChange: (value: string) => void;
}

type TextFieldProps = TextFieldDispatchProps & TextFieldStateProps;

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const onChangeTextField = (value: string) => {
    onChange(value);
  };

  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeTextField(event.target.value);
      }}
    />
  );
};

export default TextField;
