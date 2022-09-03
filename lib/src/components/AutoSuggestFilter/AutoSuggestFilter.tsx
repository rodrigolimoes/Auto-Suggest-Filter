import React from "react";
import { Suggestions } from "../../model/Suggestions";
import { Container } from "./style";

import TextField from "../TextField/TextField";
import SuggestionList from "../SuggestionList/SuggestionList";

interface AutoSuggestFilterStateProps {
  inputProps: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  suggestions: Suggestions;
}

interface AutoSuggestFilterDispatchProps {
  onSuggestionsFetch: (value: string) => void;
  renderSuggestion: <T>(suggestion: T) => JSX.Element;
}

type AutoSuggestFilterProps = AutoSuggestFilterDispatchProps &
  AutoSuggestFilterStateProps;

const AutoSuggestFilter: React.FC<AutoSuggestFilterProps> = ({
  inputProps,
  suggestions,
  onSuggestionsFetch,
  renderSuggestion,
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
      <SuggestionList
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
