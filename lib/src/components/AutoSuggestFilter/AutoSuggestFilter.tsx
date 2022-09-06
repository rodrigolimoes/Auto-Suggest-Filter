import React, { useState, useEffect } from "react";
import { Suggestions, Data } from "../../model/Suggestions";
import { Filters } from "../../model/Filters";
import { KeyBoardEvent } from "../../common/keyBoardEvent";

import { Container } from "./style";

import TextField from "../TextField/TextField";
import Dropdown from "../Dropdown/Dropdown";

interface AutoSuggestFilterStateProps {
  placeholder: string;
  suggestions: Suggestions;
  filters: Array<Filters>;
}

interface AutoSuggestFilterDispatchProps {
  onSuggestionsFetch: (value: string) => void;
  renderSuggestion: <T>(suggestion: T) => JSX.Element;
  getSuggestionValue: <T>(item: T) => string;
  getSelectedSuggestion: <T>(suggestion: T) => void;
}

type AutoSuggestFilterProps = AutoSuggestFilterDispatchProps &
  AutoSuggestFilterStateProps;

const AutoSuggestFilter: React.FC<AutoSuggestFilterProps> = ({
  placeholder,
  suggestions,
  filters,
  onSuggestionsFetch,
  renderSuggestion,
  getSuggestionValue,
  getSelectedSuggestion,
}) => {
  const [value, setValue] = useState<string>("");
  const [suggestionList, setSuggestionList] = useState<
    Array<Data> | Array<string>
  >([]);
  const [cursor, setCursor] = useState<number>(-1);
  const [timeoutFetchSuggestion, setTimeoutFetchSuggestion] =
    useState<NodeJS.Timeout | null>(null);

  /**
   * Set a suggestion value when the cursor change
   */
  useEffect(() => {
    if (suggestions[cursor]) {
      const inputValue = getSuggestionValue<string | Data>(suggestions[cursor]);
      if (inputValue) setValue(inputValue);
    }
  }, [cursor, suggestions]);

  useEffect(() => {
    setSuggestionList(suggestions);
  }, [suggestions]);

  const resetData = () => {
    setValue("");
    setSuggestionList([]);
    setCursor(-1);
  };

  /**
   * Change the index of cursor if the keyboard arrow up is pressed
   * @param key
   * @param lastIndexSuggestion
   */
  const onPressArrowUp = (key: string, lastIndexSuggestion: number): void => {
    const { ARROW_UP } = KeyBoardEvent;
    if (key === ARROW_UP && cursor > 0) setCursor((prevState) => prevState - 1);
    if (key === ARROW_UP && cursor <= 0) setCursor(lastIndexSuggestion);
  };

  /**
   * Change the index of cursor if the keyboard arrow down is pressed
   * @param key
   * @param lastIndexSuggestion
   */
  const onPressArrowDown = (key: string, lastIndexSuggestion: number): void => {
    const { ARROW_DOWN } = KeyBoardEvent;

    if (key === ARROW_DOWN && cursor < lastIndexSuggestion)
      setCursor((prevState) => prevState + 1);

    if (key === ARROW_DOWN && cursor === lastIndexSuggestion) setCursor(0);
  };

  /**
   * If the keyboard Enter is pressed
   * 1- Informs the selected suggestion
   * 2- Reset the suggestion List, the value of text field, and cursor.
   * @param key
   */
  const onPressEnter = (key: string): void => {
    const { ENTER } = KeyBoardEvent;

    if (key === ENTER) {
      getSelectedSuggestion(suggestionList[cursor]);
      resetData();
    }
  };

  /**
   * This function gets the keyboard event and triggers an action with the base of the key pressed
   * @param key
   * @return void
   */
  const onHandleKey = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>): void => {
    const lastIndexSuggestion = suggestions.length - 1;

    onPressArrowUp(key, lastIndexSuggestion);
    onPressArrowDown(key, lastIndexSuggestion);
    onPressEnter(key);
  };

  const onSelectSuggestion = (index: number) => {
    getSelectedSuggestion(suggestionList[index]);
    resetData();
  };

  const onChangeTextField = (value: string): void => {
    setValue(value);
    if (timeoutFetchSuggestion) clearTimeout(timeoutFetchSuggestion);

    setTimeoutFetchSuggestion(
      setTimeout(() => {
        onSuggestionsFetch(value);
      }, 1000)
    );

    setCursor(-1);
  };

  const isShowDropdown = Array.isArray(suggestionList)
    ? suggestionList.length > 0
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
        suggestions={suggestionList}
        filters={filters}
        renderSuggestion={renderSuggestion}
        onSelectSuggestion={onSelectSuggestion}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
