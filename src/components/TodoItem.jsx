import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";

import CheckButton from "./CheckButton";
import crossIcon from "../assets/SVG/crossIcon.svg";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function TodoItem({ status, children, empty, id, index }) {
  const { darkTheme, onDeleteTodo, onToggleStatus } = useContext(TodoContext);
  const todoState = status;

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <LiStyled
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          $dark={darkTheme}
          className={todoState}
          crossImg={crossIcon}
        >
          {empty ? (
            <p id="noTodo">{children}</p>
          ) : (
            <>
              <CheckButton
                className={todoState}
                onClick={() => onToggleStatus(id)}
              ></CheckButton>
              <p>{children}</p>
              <button id="crossBtn" onClick={() => onDeleteTodo(id)}></button>
            </>
          )}
        </LiStyled>
      )}
    </Draggable>
  );
}

export default TodoItem;

const LiStyled = styled.li`
  font-family: "Josefin Sans";
  font-size: 1.3rem;
  padding: 1.6rem 2rem;
  width: 100%;
  min-height: 5rem;
  background-color: ${(props) =>
    props.$dark ? "hsl(235, 24%, 19%)" : "white"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  border-bottom: 1px solid
    ${(props) => (props.$dark ? "hsl(237, 14%, 26%)" : "hsl(233, 11%, 84%)")};

  &:first-of-type {
    border-top-left-radius: 0.5rem 0.5rem;
    border-top-right-radius: 0.5rem 0.5rem;
  }

  & p {
    flex-grow: 1;
    color: ${(props) =>
      props.$dark ? "hsl(234, 39%, 85%)" : "hsl(235, 19%, 35%)"};
  }

  & #checkBtn {
    width: 2rem;
    height: 2rem;
    background: none;
    border: 1px solid hsl(236, 33%, 92%);
    border-radius: 50%;
    transition: border 0.2s;

    &:hover {
      cursor: pointer;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(
            to bottom right,
            hsl(192, 100%, 67%),
            hsl(280, 87%, 65%)
          )
          border-box;
      border: 1px solid transparent;
    }
  }

  & #crossBtn {
    background: none;
    border: none;
    background: url(${(props) => props.crossImg}) no-repeat center;
    width: 1.1rem;
    height: 1.1rem;
    transition: transform 0.1s;

    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  }

  &.completed {
    text-decoration: line-through;
    color: ${(props) =>
      props.$dark ? "hsl(234, 11%, 52%)" : "hsl(233, 11%, 84%)"};
    & p {
      color: ${(props) =>
        props.$dark ? "hsl(234, 11%, 52%)" : "hsl(233, 11%, 84%)"};
    }
  }

  & #noTodo {
    user-select: none;
    &:hover {
      cursor: default;
    }
  }

  @media (min-width: 650px) {
    & #crossBtn {
      display: none;
    }

    &:hover {
      & #crossBtn {
        display: block;
      }
    }

    &:last-of-type {
      border-bottom-radius: 0;
    }

    & #noTodo {
      border-radius: 0.5rem;
    }
  }
`;
