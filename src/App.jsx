import styled from "styled-components";
import "./App.css";

import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import CanDragMessage from "./components/CanDragMessage";
import TodoContextProvider from "./todo/TodoContext";

function App() {
  return (
    <>
      <TodoContextProvider>
        <DivStyled>
          <Header />
          <CreateTodo />
          <TodoList />
          <CanDragMessage />
        </DivStyled>
      </TodoContextProvider>
    </>
  );
}

export default App;

const DivStyled = styled.div`
  max-width: 47rem;
  padding: 4.5rem 2.5rem;
  margin: 0 auto;

  @media (min-width: 650px) {
    margin-top: 1.5rem;
  }
`;
