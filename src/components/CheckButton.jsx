import styled from "styled-components";

import checkIcon from "../assets/SVG/checkIcon.svg";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function CheckButton({ ...props }) {
  const { darkTheme } = useContext(TodoContext);
  return (
    <ButtonStyled $dark={darkTheme} {...props}>
      <button></button>
    </ButtonStyled>
  );
}

export default CheckButton;

const ButtonStyled = styled.div`
  & button {
    width: 2rem;
    height: 2rem;
    background: none;
    border: 1px solid
      ${(props) => (props.$dark ? "hsl(233, 14%, 35%)" : "hsl(236, 33%, 92%)")};
    border-radius: 50%;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      background: linear-gradient(
            ${(props) => (props.$dark ? "hsl(235, 24%, 19%)" : "white")},
            ${(props) => (props.$dark ? "hsl(235, 24%, 19%)" : "white")}
          )
          padding-box,
        linear-gradient(
            to bottom right,
            hsl(192, 100%, 67%),
            hsl(280, 87%, 65%)
          )
          border-box;
      border: 1px solid transparent;
    }
  }

  &.completed {
    & button {
      position: relative;
      background: linear-gradient(
        to bottom right,
        hsl(192, 100%, 67%),
        hsl(280, 87%, 65%)
      );

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: -0.05rem;
        background: url(${checkIcon}) no-repeat;
        background-position: center;
        padding: 1rem;
      }

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0%);
        border-radius: 50%;
        background: linear-gradient(
          to bottom right,
          hsl(192, 100%, 67%),
          hsl(280, 87%, 65%)
        );
      }
    }
  }
`;
