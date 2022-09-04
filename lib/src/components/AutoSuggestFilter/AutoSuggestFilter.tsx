import React, { useState, useEffect } from "react";
import { Suggestions, Data } from "../../model/Suggestions";
import { Filters } from "../../model/Filters";
import { KeyBoardEvent } from "../../common/keyBoardEvent";

import { Container } from "./style";

import TextField from "../TextField/TextField";
import Dropdown from "../Dropdown/Dropdown";

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
  getSuggestionValue: <T>(item: T) => string;
}

type AutoSuggestFilterProps = AutoSuggestFilterDispatchProps &
  AutoSuggestFilterStateProps;

const AutoSuggestFilter: React.FC<AutoSuggestFilterProps> = ({
  inputProps,
  suggestions,
  filters,
  onSuggestionsFetch,
  renderSuggestion,
  getSuggestionValue,
}) => {
  const [cursor, setCursor] = useState<number>(0);
  const { placeholder, value, onChange } = inputProps;

  /**
   * Set a suggestion value when the cursor change
   */
  useEffect(() => {
    if (suggestions.length > 0) {
      const inputValue = getSuggestionValue<string | Data>(suggestions[cursor]);
      onChange(inputValue);
    }
  }, [cursor, suggestions]);

  /**
   * This function get the keyboard event and update the index of suggestions
   * @param key
   * @return void
   */
  const onHandleKey = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>): void => {
    const { ARROW_UP, ARROW_DOWN } = KeyBoardEvent;

    if (key === ARROW_UP && cursor > 0) setCursor((prevState) => prevState - 1);

    if (key === ARROW_DOWN && cursor < suggestions.length - 1)
      setCursor((prevState) => prevState + 1);
  };

  const onChangeTextField = (value: string): void => {
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
        onHandleKey={onHandleKey}
      />
      <Dropdown
        currentSuggestion={cursor}
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        filters={filters}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
