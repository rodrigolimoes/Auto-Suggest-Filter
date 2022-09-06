import React from "react";
import { Wrapper, Element } from "./style";
import { Suggestions } from "../../model/Suggestions";
import SuggestionFilter from "../SuggestionFilter/SuggestionFilter";
import { Filters } from "../../model/Filters";

interface DropdownStateProps {
  suggestions: Suggestions;
  filters: Array<Filters>;
  currentSuggestion: number;
}

interface DropdownDispatchProps {
  renderSuggestion: <T>(suggestion: T) => JSX.Element;
  onSelectSuggestion: (index: number) => void;
  onHoverSuggestion: (index: number) => void;
}

type DropdownProps = DropdownStateProps & DropdownDispatchProps;

const Dropdown: React.FC<DropdownProps> = ({
  suggestions,
  filters,
  currentSuggestion,
  renderSuggestion,
  onSelectSuggestion,
  onHoverSuggestion,
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
                <Element
                  key={i}
                  isHovered={currentSuggestion === i}
                  isLastElement={isLastElement}
                  onMouseOver={() => {
                    onHoverSuggestion(i);
                  }}
                  onMouseOut={() => {
                    onHoverSuggestion(-1);
                  }}
                  onClick={() => {
                    onSelectSuggestion(i);
                  }}
                >
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
