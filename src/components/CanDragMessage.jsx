import styled from "styled-components";

import { useContext } from "react";
import { TodoContext } from "../todo/TodoContext";

function CanDragMessage() {
  const { darkTheme } = useContext(TodoContext);
  return (
    <PStyled $dark={darkTheme} id="dragMsg">
      Drag and drop to reorder list
    </PStyled>
  );
}

export default CanDragMessage;

const PStyled = styled.p`
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  font-family: "Josefin Sans";
  font-weight: 500;
  color: ${(props) =>
    props.$dark ? "hsl(233, 14%, 35%)" : " hsl(236, 9%, 61%)"};

  user-select: none;
`;
