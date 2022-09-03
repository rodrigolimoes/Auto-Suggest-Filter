import React from "react";
import { Wrapper, Element } from "./style";
import { Suggestions } from "../../model/Suggestions";
import SuggestionFilter from "../SuggestionFilter/SuggestionFilter";
import { Filters } from "../../model/Filters";

interface DropdownStateProps {
  suggestions: Suggestions;
  filters: Array<Filters>;
}

interface DropdownDispatchProps {
  renderSuggestion: <T>(suggestion: T) => JSX.Element;
}

type DropdownProps = DropdownStateProps & DropdownDispatchProps;

const Dropdown: React.FC<DropdownProps> = ({
  suggestions,
  filters,
  renderSuggestion,
}) => {
  return (
    <React.Fragment>
      {suggestions.length > 0 ? (
        <React.Fragment>
          {Array.isArray(filters) && filters.length > 0 ? (
            <SuggestionFilter filters={filters} />
          ) : null}
          <Wrapper>
            {suggestions.map((suggestion, i) => {
              const isLastElement = suggestions.length - 1 === i;
              return (
                <Element key={i} isLastElement={isLastElement}>
                  {renderSuggestion(suggestion)}
                </Element>
              );
            })}
          </Wrapper>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Dropdown;