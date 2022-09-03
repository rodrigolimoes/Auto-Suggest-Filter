import React from "react";
import { Suggestions } from "../../model/Suggestions";
import { Container } from "./style";

import TextField from "../TextField/TextField";
import Dropdown from "../Dropdown/Dropdown";
import { Filters } from "../../model/Filters";

interface AutoSuggestFilterStateProps {
  inputProps: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
  suggestions: Suggestions;
  filters: Array<Filters>;
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
  filters,
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
      <Dropdown
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        filters={filters}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
