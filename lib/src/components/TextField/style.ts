import styled, { css } from "styled-components";

type InputStyleProps = {
  isShowDropdown: boolean;
};

export const Input = styled.input<InputStyleProps>`
  color: #b4a19d;
  padding: 10px;
  border-color: rgb(0, 0, 0, 18%);
  border-radius: 10px;

  &:focus {
    outline: none;
    border-color: rgb(0, 0, 0, 25%);
  }

  ${(props) =>
    props.isShowDropdown &&
    css`
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;
