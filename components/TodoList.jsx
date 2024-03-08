import styled from "styled-components";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import TodoItem from "./TodoItem.jsx";
import ListFooterMobile from "./ListFooterMobile.jsx";
import ListFilter from "./ListFilter";
import EmptyTodoList from "./EmptyTodoList.jsx";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function TodoList() {
  const { todoList, todoListQtd, activeFilter, onTodoDrag } =
    useContext(TodoContext);

  return (
    <>
      <UlStyled>
        <>
          <DragDropContext onDragEnd={onTodoDrag}>
            <Droppable droppableId="todos" type="list" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {todoListQtd > 0 ? (
                    todoList.map((todo, index) => {
                      if (
                        todo.status === activeFilter ||
                        activeFilter === "all"
                      ) {
                        return (
                          <TodoItem
                            key={todo.id}
                            id={todo.id}
                            index={index}
                            status={todo.status}
                          >
                            {todo.title}
                          </TodoItem>
                        );
                      }
                    })
                  ) : (
                    <EmptyTodoList />
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {todoList.length > 0 && <ListFooterMobile />}
        </>
      </UlStyled>
      {todoList.length > 0 && <ListFilter />}
    </>
  );
}

export default TodoList;

const UlStyled = styled.ul`
  margin-top: 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(50, 50, 50, 0.25) 0 0.4rem 0.5rem;
  border-radius: 0.5rem;

  &.dark {
  }
`;
