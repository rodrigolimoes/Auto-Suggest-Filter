import React from "react";
import { Header, Tag, WrapperTags } from "./style";
import { Filters } from "../../model/Filters";

interface SuggestionFilterStateProps {
  filters: Array<Filters>;
}
interface SuggestionFilterDispatchProps {}

type SuggestionFilterProps = SuggestionFilterStateProps &
  SuggestionFilterDispatchProps;

const SuggestionFilter: React.FC<SuggestionFilterProps> = ({ filters }) => {
  return (
    <Header>
      <small>Filter</small>
      <WrapperTags>
        {filters.length > 0
          ? filters.map((e) => <Tag key={e.value}>{e.label}</Tag>)
          : null}
      </WrapperTags>
    </Header>
  );
};

export default SuggestionFilter;
