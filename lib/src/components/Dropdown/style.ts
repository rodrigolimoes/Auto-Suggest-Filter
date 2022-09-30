import styled, { css } from "styled-components";

type ElementProps = { isLastElement: boolean; isHovered: boolean };

export const DropdownContainer = styled.ul`
  width: 100%;
  padding: 0 20px 0 20px;
  margin: 5px 0 0 0;
  padding-inline-start: 0;

  border: none;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0, rgba(27, 31, 35, 0.15) 0 0 0 1px;
`;

export const Element = styled.li<ElementProps>`
  width: 100%;
  list-style: none;
  padding: 10px;
  cursor: pointer;

  ${(props) =>
    props.isLastElement &&
    css`
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    `}

  ${(props) =>
    props.isHovered &&
    css`
      background-color: #ebedef;
    `}
`;
