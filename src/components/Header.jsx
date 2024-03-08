import styled from "styled-components";

import sunIcon from "/assets/SVG/sunIcon.svg";
import moonIcon from "/assets/SVG/moonIcon.svg";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function Header() {
  const { darkTheme, onToggleTheme } = useContext(TodoContext);
  return (
    <HeaderStyled $dark={darkTheme}>
      <h1>Todo</h1>
      <button onClick={onToggleTheme}></button>
    </HeaderStyled>
  );
}

export default Header;

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h1 {
    font-family: "Josefin Sans";
    color: white;
    letter-spacing: 1rem;
    text-transform: uppercase;
    font-size: 3rem;
  }

  & button {
    border: none;
    background: url(${(props) => (props.$dark ? sunIcon : moonIcon)}) no-repeat
      center;
    background-size: contain;
    width: 2rem;
    height: 2rem;

    &:hover {
      cursor: pointer;
    }
  }
`;
