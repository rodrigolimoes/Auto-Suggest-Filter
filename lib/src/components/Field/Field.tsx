import React from "react";
import { Input } from "./style";

interface FieldStateProps {}

interface FieldDispatchProps {}

type FieldProps = FieldDispatchProps & FieldStateProps;

const Field: React.FC<FieldProps> = () => {
  return <Input placeholder={"Search"} />;
};

export default Field;
