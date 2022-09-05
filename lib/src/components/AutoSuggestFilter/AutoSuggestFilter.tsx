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
  const [cursor, setCursor] = useState<number>(-1);
  const [timeoutFetchSuggestion, setTimeoutFetchSuggestion] =
    useState<NodeJS.Timeout | null>(null);
  const { placeholder, value, onChange } = inputProps;

  /**
   * Set a suggestion value when the cursor change
   */
  useEffect(() => {
    if (suggestions[cursor]) {
      const inputValue = getSuggestionValue<string | Data>(suggestions[cursor]);
      if (inputValue) onChange(inputValue.toLowerCase());
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
    const lastIndexSuggestion = suggestions.length - 1;

    if (key === ARROW_UP && cursor > 0) setCursor((prevState) => prevState - 1);

    if (key === ARROW_DOWN && cursor < lastIndexSuggestion)
      setCursor((prevState) => prevState + 1);

    if (key === ARROW_DOWN && cursor === lastIndexSuggestion) setCursor(0);

    if (key === ARROW_UP && cursor <= 0) setCursor(lastIndexSuggestion);
  };

  const onChangeTextField = (value: string): void => {
    onChange(value);
    if (timeoutFetchSuggestion) clearTimeout(timeoutFetchSuggestion);

    setTimeoutFetchSuggestion(
      setTimeout(() => {
        onSuggestionsFetch(value);
      }, 1000)
    );

    setCursor(-1);
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
