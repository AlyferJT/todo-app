import styled from "styled-components";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function ListFilter() {
  const {
    darkTheme,
    activeFilter,
    todoList,
    todoListQtd,
    onFilterBy,
    onClearCompleted,
  } = useContext(TodoContext);

  function handleChangeFilter(event) {
    onFilterBy(event.target.name);
  }

  return (
    <>
      {todoList.length > 0 && (
        <MenuStyled $dark={darkTheme}>
          <p className="itensLeft">
            {todoListQtd} item{todoListQtd > 1 && "s"} left
          </p>
          <div>
            <button
              onClick={handleChangeFilter}
              name="all"
              className={activeFilter === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={handleChangeFilter}
              name="active"
              className={activeFilter === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              onClick={handleChangeFilter}
              name="completed"
              className={activeFilter === "completed" ? "active" : ""}
            >
              Completed
            </button>
          </div>
          <button className="clearCompletedBtn" onClick={onClearCompleted}>
            Clear Completed
          </button>
        </MenuStyled>
      )}
    </>
  );
}

export default ListFilter;

const MenuStyled = styled.menu`
  width: 100%;
  height: 5rem;
  background-color: ${(props) =>
    props.$dark ? "hsl(235, 24%, 19%)" : "white"};
  box-shadow: rgba(50, 50, 50, 0.2) 0 0.7rem 2.9rem 0;
  border-radius: 0.5rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  & button {
    background: none;
    border: none;
    font-family: "Josefin Sans";
    font-weight: 700;
    font-size: 1.5rem;
    color: hsl(236, 9%, 61%);
    transition: color 0.1s;

    &:hover {
      cursor: pointer;
      color: ${(props) =>
        props.$dark ? "hsl(236, 33%, 92%)" : "hsl(235, 19%, 35%)"};
    }

    &.active {
      color: hsl(220, 98%, 61%);
    }
  }

  & .itensLeft {
    font-family: "Josefin Sans";
    font-size: 1.2rem;
    color: hsl(236, 9%, 61%);
  }

  & .clearCompletedBtn {
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

  & .itensLeft,
  .clearCompletedBtn {
    display: none;
  }

  @media (min-width: 650px) {
    margin-top: 0;
    border-radius: 0 0 0.5rem 0.5rem;
    justify-content: space-between;
    padding: 0 2rem;
    height: 4rem;

    & button {
      font-size: 1.2rem;
    }

    & .itensLeft,
    .clearCompletedBtn {
      display: block;
    }
  }

  user-select: none;
`;
