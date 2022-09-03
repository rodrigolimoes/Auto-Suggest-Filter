import React from "react";
import TextField from "../TextField/TextField";
import { Container } from "./style";

interface Data {
  [key: string]: any;
}

interface AutoSuggestFilterStateProps {
  inputProps: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  suggestions: Array<Data> | Array<string>;
}

interface AutoSuggestFilterDispatchProps {
  onSuggestionsFetch: (value: string) => void;
}

type AutoSuggestFilterProps = AutoSuggestFilterDispatchProps &
  AutoSuggestFilterStateProps;

const AutoSuggestFilter: React.FC<AutoSuggestFilterProps> = ({
  inputProps,
  suggestions,
  onSuggestionsFetch,
}) => {
  const { placeholder, value, onChange } = inputProps;

  const onChangeTextField = (value: string) => {
    onChange(value);
    onSuggestionsFetch(value);
  };

  const isShowDropdown = Array.isArray(suggestions)
    ? suggestions.length > 0
    : false;

  return (
    <Container>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={onChangeTextField}
        isShowDropdown={isShowDropdown}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
