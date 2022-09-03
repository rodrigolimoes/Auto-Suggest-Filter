import React from "react";
import TextField from "../TextField/TextField";
import { Container } from "./style";

interface AutoSuggestFilterStateProps {
  inputProps: {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
}

interface AutoSuggestFilterDispatchProps {}

type AutoSuggestFilterProps = AutoSuggestFilterDispatchProps &
  AutoSuggestFilterStateProps;

const AutoSuggestFilter: React.FC<AutoSuggestFilterProps> = ({
  inputProps,
}) => {
  const { placeholder, value, onChange } = inputProps;
  return (
    <Container>
      <TextField placeholder={placeholder} value={value} onChange={onChange} />
    </Container>
  );
};

export default AutoSuggestFilter;
