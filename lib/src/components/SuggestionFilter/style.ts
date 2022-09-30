import styled, { css } from "styled-components";

export const Tag = styled.div<{ isSelected: boolean }>`
  display: inline-block;
  padding: 3px 10px 3px 10px;
  margin: 5px 5px 0 0;
  text-align: center;

  border: solid 2px rgb(0, 0, 0, 18%);
  border-radius: 50px;

  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #dcdcdc;
    `}
`;

export const WrapperTags = styled.div`
  padding: 10px 0 10px 0;
`;

export const Header = styled.header`
  width: 100%;
  padding: 0 10px 0 10px;

  border: none;
`;
