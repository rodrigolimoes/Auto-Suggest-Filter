import React from "react";
import { Input } from "./style";

interface TextFieldStateProps {
  placeholder: string;
  value: string;
  isShowDropdown: boolean;
}

interface TextFieldDispatchProps {
  onChange: (value: string) => void;
}

type TextFieldProps = TextFieldDispatchProps & TextFieldStateProps;

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  isShowDropdown,
  onChange,
}) => {
  return (
    <Input
      isShowDropdown={isShowDropdown}
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
    />
  );
};

export default TextField;
