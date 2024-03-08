import styled from "styled-components";

import sunIcon from "../assets/SVG/sunIcon.svg";
import moonIcon from "../assets/SVG/moonIcon.svg";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function Header() {
  const { darkTheme, onToggleTheme } = useContext(TodoContext);
  return (
    <HeaderStyled $dark={darkTheme}>
      <h1>Todo</h1>
      <button onClick={onToggleTheme}>
        <img src={darkTheme ? sunIcon : moonIcon} />
      </button>
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
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;

    & img {
      width: 2rem;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;
