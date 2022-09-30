import styled from "styled-components";

type InputStyleProps = {
  isShowDropdown: boolean;
};

export const Input = styled.input<InputStyleProps>`
  width: 100%;
  color: #b4a19d;
  padding: 10px;
  border: solid 2px rgb(0, 0, 0, 18%);
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: rgb(0, 0, 0, 25%);
  }
`;
