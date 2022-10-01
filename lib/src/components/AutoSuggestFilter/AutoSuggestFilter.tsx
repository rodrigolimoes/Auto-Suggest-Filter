import React, { useState, useEffect } from "react";
import { Suggestions, Data } from "../../model/Suggestions";
import { Filters } from "../../model/Filters";
import { KeyBoardEvent } from "../../common/keyBoardEvent";

import { Container } from "./style";

import TextField from "../TextField/TextField";
import Dropdown from "../Dropdown/Dropdown";

type Event = { cursor: number; isKeyBoard: boolean };
type ParamsKeyEvent = {
  cursor: number;
  lastIndexSuggestion: number;
  key: string;
};

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
  const [filterList, setFilterList] = useState<Array<Filters>>([]);
  const [event, setEvent] = useState<Event>({ cursor: -1, isKeyBoard: false });
  const [timeoutFetchSuggestion, setTimeoutFetchSuggestion] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (suggestions && suggestions.length > 0) setSuggestionList(suggestions);
  }, [suggestions]);

  useEffect(() => {
    if (filters && filters.length > 0) setFilterList(filters);
  }, [filters]);

  const resetData = () => {
    setValue("");
    setSuggestionList([]);
    setEvent((prevState) => ({ ...prevState, cursor: -1 }));
  };

  /**
   * Change the index of cursor if the keyboard arrow up is pressed
   * @param ParamsKeyEvent
   */
  const onPressArrowUp = ({
    key,
    cursor,
    lastIndexSuggestion,
  }: ParamsKeyEvent): void => {
    const { ARROW_UP } = KeyBoardEvent;

    if (key === ARROW_UP && cursor > 0)
      setEvent((prevState) => ({ ...prevState, cursor: prevState.cursor - 1 }));
    if (key === ARROW_UP && cursor <= 0)
      setEvent((prevState) => ({ ...prevState, cursor: lastIndexSuggestion }));
  };

  /**
   * Change the index of cursor if the keyboard arrow down is pressed
   * @param ParamsKeyEvent
   */
  const onPressArrowDown = ({
    key,
    cursor,
    lastIndexSuggestion,
  }: ParamsKeyEvent): void => {
    const { ARROW_DOWN } = KeyBoardEvent;

    if (key === ARROW_DOWN && cursor < lastIndexSuggestion)
      setEvent((prevState) => ({ ...prevState, cursor: prevState.cursor + 1 }));

    if (key === ARROW_DOWN && cursor === lastIndexSuggestion)
      setEvent((prevState) => ({ ...prevState, cursor: 0 }));
  };

  /**
   * If the keyboard Enter is pressed
   * 1- Informs the selected suggestion
   * 2- Reset the suggestion List, the value of text field, and cursor.
   * @param ParamsKeyEvent
   */
  const onPressEnter = ({ key, cursor }: ParamsKeyEvent): void => {
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
    const { cursor, isKeyBoard } = event;
    const lastIndexSuggestion = suggestions.length - 1;

    if (!isKeyBoard)
      setEvent((prevState) => ({ ...prevState, isKeyBoard: true }));

    onPressArrowUp({ key, cursor, lastIndexSuggestion });
    onPressArrowDown({ key, cursor, lastIndexSuggestion });
    onPressEnter({ key, cursor, lastIndexSuggestion });

    if (suggestions[cursor] && isKeyBoard) {
      const inputValue = getSuggestionValue<string | Data>(suggestions[cursor]);
      if (inputValue) setValue(inputValue);
    }
  };

  const onSelectSuggestion = (index: number) => {
    getSelectedSuggestion(suggestionList[index]);
    resetData();
  };

  const onHoverSuggestion = (index: number) => {
    setEvent({ cursor: index, isKeyBoard: false });
  };

  const onDataFetch = () => {
    const { cursor } = event;

    if (timeoutFetchSuggestion) clearTimeout(timeoutFetchSuggestion);

    setTimeoutFetchSuggestion(
      setTimeout(() => {
        onSuggestionsFetch(value);
      }, 1000)
    );

    if (cursor !== -1) setEvent((prevState) => ({ ...prevState, cursor: -1 }));
  };

  const onChangeTextField = (value: string): void => {
    setValue(value);
    onDataFetch();
  };

  const onSelectFilter = (index: number) => {
    const filters = [...filterList];

    filters[index] = {
      ...filters[index],
      checked: !filters[index].checked,
    };

    setFilterList(filters);
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
        currentSuggestion={event.cursor}
        suggestions={suggestionList}
        filters={filterList}
        renderSuggestion={renderSuggestion}
        onSelectSuggestion={onSelectSuggestion}
        onHoverSuggestion={onHoverSuggestion}
        onSelectFilter={onSelectFilter}
      />
    </Container>
  );
};

export default AutoSuggestFilter;
