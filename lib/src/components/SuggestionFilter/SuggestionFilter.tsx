import React from "react";
import { Header, Tag, WrapperTags } from "./style";
import { Filters } from "../../model/Filters";

interface SuggestionFilterStateProps {
  filters: Array<Filters>;
}
interface SuggestionFilterDispatchProps {
  onSelectFilter: (index: number) => void;
}

type SuggestionFilterProps = SuggestionFilterStateProps &
  SuggestionFilterDispatchProps;

const SuggestionFilter: React.FC<SuggestionFilterProps> = ({
  filters,
  onSelectFilter,
}) => {
  return (
    <Header>
      <small>Filter</small>
      <WrapperTags>
        {filters.length > 0
          ? filters.map((e, i) => (
              <Tag
                key={e.value}
                onClick={() => {
                  onSelectFilter(i);
                }}
                isSelected={e.checked}
              >
                {e.label}
              </Tag>
            ))
          : null}
      </WrapperTags>
    </Header>
  );
};

export default SuggestionFilter;
