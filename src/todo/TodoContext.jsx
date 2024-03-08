import { useReducer, createContext } from "react";
import { createGlobalStyle } from "styled-components";
import { v4 as uuidv4 } from "uuid";

///////////////////////
/* BACKGROUND IMAGES */
import bgMobileLight from "../assets/images/bg-mobile-light.jpg";
import bgDesktopLight from "../assets/images/bg-desktop-light.jpg";
import bgMobileDark from "../assets/images/bg-mobile-dark.jpg";
import bgDesktopDark from "../assets/images/bg-desktop-dark.jpg";

///////////////////////////////
/* DEFAULT TODOCONTEXT VALUE */
const defaultTodoValue = {
  todoList: [
    {
      id: uuidv4(),
      title: "First task",
      status: "completed",
    },
  ],
  activeFilter: "all",
  darkTheme: true,
};

/////////////////
/* TODOCONTEXT */
export const TodoContext = createContext({
  onToggleTheme: () => {},
  onCreateTodo: () => {},
  onDeleteTodo: () => {},
  onToggleStatus: () => {},
  onClearCompleted: () => {},
  onFilterBy: () => {},
  onTodoDrag: () => {},
  todoListQtd: "",
  activeFilter: "",
  darkTheme: Boolean,
});

//////////////
/* DISPATCH */
function handleTodoApp(state, action) {
  if (action.type === "TOGGLE_THEME") {
    const newThemeValue = state.darkTheme ? false : true;
    return { ...state, darkTheme: newThemeValue };
  }

  if (action.type === "ADD_TODO") {
    console.log();
    return {
      ...state,
      todoList: [...state.todoList, { ...action.payload }],
    };
  }

  if (action.type === "DELETE_TODO") {
    const todoId = action.payload.id;
    const newState = {
      ...state,
      todoList: [...state.todoList.filter((todo) => todo.id !== todoId)],
    };

    if (state.activeFilter !== "all" && newState.todoList.length === 0) {
      newState.activeFilter = "all";
    }

    return newState;
  }

  if (action.type === "TOGGLE_STATUS") {
    const todoId = action.payload.id;
    const todoIndex = state.todoList.findIndex((item) => item.id === todoId);
    const newStatus =
      state.todoList[todoIndex].status === "active" ? "completed" : "active";

    const newList = {
      ...state,
    };
    newList.todoList[todoIndex].status = newStatus;

    return newList;
  }

  if (action.type === "CLEAR_COMPLETED") {
    return {
      ...state,
      todoList: [
        ...state.todoList.filter((todo) => todo.status !== "completed"),
      ],
    };
  }

  if (action.type === "FILTER_BY") {
    return {
      ...state,
      activeFilter: action.payload.filter,
    };
  }

  if (action.type === "HANDLE_DRAG") {
    const { sourceIndex, destinationIndex } = action.payload;

    const newList = { ...state };
    const [draggedTodo] = newList.todoList.splice(sourceIndex, 1);
    newList.todoList.splice(destinationIndex, 0, draggedTodo);

    return newList;
  }
}

//////////////////////////
/* TODOCONTEXT PROVIDER */
function TodoContextProvider({ children }) {
  const [todoApp, todoAppDispatch] = useReducer(
    handleTodoApp,
    defaultTodoValue
  );

  function toggleTheme() {
    todoAppDispatch({
      type: "TOGGLE_THEME",
    });
  }

  function createTodo(todoTitle) {
    todoAppDispatch({
      type: "ADD_TODO",
      payload: {
        id: uuidv4(),
        title: todoTitle,
        status: "active",
      },
    });
  }

  function deleteTodo(todoId) {
    todoAppDispatch({
      type: "DELETE_TODO",
      payload: {
        id: todoId,
      },
    });
  }

  function toggleStatus(todoId) {
    todoAppDispatch({
      type: "TOGGLE_STATUS",
      payload: {
        id: todoId,
      },
    });
  }

  function clearCompleted() {
    todoAppDispatch({
      type: "CLEAR_COMPLETED",
    });
  }

  function filterBy(newFilter) {
    todoAppDispatch({
      type: "FILTER_BY",
      payload: {
        filter: newFilter,
      },
    });
  }

  function todoDrag(result) {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    todoAppDispatch({
      type: "HANDLE_DRAG",
      payload: {
        sourceIndex,
        destinationIndex,
      },
    });
  }

  function getTodoQtd() {
    if (todoApp.activeFilter === "all") {
      return todoApp.todoList.length;
    } else if (todoApp.activeFilter === "active") {
      return todoApp.todoList.filter((todo) => todo.status === "active").length;
    } else if (todoApp.activeFilter === "completed") {
      return todoApp.todoList.filter((todo) => todo.status === "completed")
        .length;
    }
  }

  const ctxValue = {
    onToggleTheme: toggleTheme,
    onCreateTodo: createTodo,
    onDeleteTodo: deleteTodo,
    onToggleStatus: toggleStatus,
    onClearCompleted: clearCompleted,
    onFilterBy: filterBy,
    onTodoDrag: todoDrag,
    todoListQtd: getTodoQtd(),
    todoList: todoApp.todoList,
    activeFilter: todoApp.activeFilter,
    darkTheme: todoApp.darkTheme,
  };
  return (
    <TodoContext.Provider value={ctxValue}>
      <GlobalStyle dark={ctxValue.darkTheme} />
      {children}
    </TodoContext.Provider>
  );
}

export default TodoContextProvider;

////////////////////
/* GLOBAL STYLING */
const GlobalStyle = createGlobalStyle`
  * {
    transition: background .2s;
  }

  body {
    width: 100%;
    background-image: url(${(props) =>
      props.dark ? bgMobileDark : bgMobileLight});
    background-repeat: no-repeat;
    background-size: contain;
    background-color: ${(props) => props.dark && "hsl(235, 21%, 11%)"}
  }
  

  @media (min-width: 650px) {
    body {
      background-image: url(${(props) =>
        props.dark ? bgDesktopDark : bgDesktopLight});
    }
  }   
`;
