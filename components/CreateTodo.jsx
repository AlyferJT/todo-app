import styled from "styled-components";

import CheckButton from "./CheckButton";

import { useContext, useRef } from "react";
import { TodoContext } from "../todo/TodoContext";

function CreateTodo() {
  const { darkTheme, onCreateTodo } = useContext(TodoContext);
  const todoTitle = useRef();

  function handleClick() {
    if (todoTitle.current.value.trim() !== "") {
      onCreateTodo(todoTitle.current.value);
      todoTitle.current.value = "";
    }
  }

  return (
    <>
      <DivStyled $dark={darkTheme}>
        <CheckButton onClick={handleClick} className=""></CheckButton>
        <input
          spellCheck="false"
          ref={todoTitle}
          placeholder="Create a new todo..."
        ></input>
      </DivStyled>
    </>
  );
}

export default CreateTodo;

const DivStyled = styled.div`
  margin-top: 3.5rem;
  padding-left: 2rem;
  width: 100%;
  height: 5rem;
  background-color: ${(props) =>
    props.$dark ? "hsl(235, 24%, 19%)" : "white"};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: rgba(50, 50, 50, 0.25) 0 0.4rem 0.5rem;

  & input {
    flex-grow: 1;
    height: 100%;
    font-family: "Josefin Sans";
    font-size: 1.3rem;
    color: ${(props) =>
      props.$dark ? "hsl(234, 39%, 85%)" : "hsl(235, 19%, 35%)"};
    border: none;
    outline: none;
    border-radius: 0 0.5rem 0.5rem 0;
    background-color: rgba(0, 0, 0, 0%);
  }

  user-select: none;
`;
