import styled, { css } from "styled-components";

type ElementProps = { isLastElement: boolean };

export const Element = styled.li<ElementProps>`
  width: 100%;
  list-style: none;
  padding: 10px;

  &:hover {
    background-color: #f8ecec;
  }
  ${(props) =>
    props.isLastElement &&
    css`
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    `}
`;

export const Wrapper = styled.ul`
  width: 100%;
  padding: 0 20px 0 20px;
  margin: 0;
  padding-inline-start: 0;

  border: solid 2px rgb(0, 0, 0, 18%);
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
