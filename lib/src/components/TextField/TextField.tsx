import React from "react";
import { Input } from "./style";

interface TextFieldStateProps {
  placeholder: string;
  value: string;
  isShowDropdown: boolean;
}

interface TextFieldDispatchProps {
  onChange: (value: string) => void;
  onHandleKey: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

type TextFieldProps = TextFieldDispatchProps & TextFieldStateProps;

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  value,
  isShowDropdown,
  onChange,
  onHandleKey,
}) => {
  return (
    <Input
      isShowDropdown={isShowDropdown}
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      onKeyDown={onHandleKey}
    />
  );
};

export default TextField;
