import React from "react";
import { List, Element } from "./style";
import { Suggestions } from "../../model/Suggestions";

interface SuggestionListStateProps {
  suggestions: Suggestions;
}

interface SuggestionListDispatchProps {
  renderSuggestion: <T>(suggestion: T) => JSX.Element;
}

type SuggestionListProps = SuggestionListStateProps &
  SuggestionListDispatchProps;

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestions,
  renderSuggestion,
}) => {
  return (
    <React.Fragment>
      {suggestions.length > 0 ? (
        <List>
          {suggestions.map((suggestion, i) => {
            const isLastElement = suggestions.length - 1 === i;
            return (
              <Element key={i} isLastElement={isLastElement}>
                {renderSuggestion(suggestion)}
              </Element>
            );
          })}
        </List>
      ) : null}
    </React.Fragment>
  );
};

export default SuggestionList;
