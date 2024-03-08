import TodoItem from "./TodoItem";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function EmptyTodoList() {
  const { activeFilter, todoList } = useContext(TodoContext);

  function getMessage() {
    if (activeFilter === "all" && todoList.length === 0) {
      return "Empty task list! Uff...";
    } else if (activeFilter === "active" && todoList.length !== 0) {
      return "No active tasks... Time to add one!";
    } else if (activeFilter === "completed" && todoList.length !== 0) {
      return "No completed tasks... Hands on!";
    } else {
      return "Empty task list! Uff...";
    }
  }

  return <TodoItem empty={true}>{getMessage()}</TodoItem>;
}

export default EmptyTodoList;
