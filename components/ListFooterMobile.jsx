import styled from "styled-components";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function ListFooterMobile() {
  const { darkTheme, todoListQtd, onClearCompleted } = useContext(TodoContext);
  return (
    <LiFooterMobile $dark={darkTheme}>
      <p>
        {todoListQtd} item{todoListQtd > 1 && "s"} left
      </p>
      <button onClick={onClearCompleted}>Clear Completed</button>
    </LiFooterMobile>
  );
}

export default ListFooterMobile;

const LiFooterMobile = styled.li`
  background-color: ${(props) =>
    props.$dark ? "hsl(235, 24%, 19%)" : "white"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0 2rem;
  border-radius: 0 0 0.5rem 0.5rem;

  & p {
    font-family: "Josefin Sans";
    font-size: 1.2rem;
    color: hsl(236, 9%, 61%);
  }

  & button {
    background: none;
    border: none;
    font-family: "Josefin Sans";
    font-size: 1.2rem;
    font-weight: 600;
    color: hsl(236, 9%, 61%);
    transition: color 0.1s;

    &:hover {
      cursor: pointer;
      color: ${(props) =>
        props.$dark ? "hsl(236, 33%, 92%)" : "hsl(235, 19%, 35%)"};
    }
  }

  @media (min-width: 650px) {
    display: none;
  }

  user-select: none;
`;
