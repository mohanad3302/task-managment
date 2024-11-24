import { useState, useContext } from "react";

import Todo from "./Todo";
import { TodosContext } from "../Contexts/TodosContext";

export default function FilteredButton({ value }) {
  const { todos, setTodos } = useContext(TodosContext);
  console.log("--++++++++-----", value);
  function handleFilterClick() {
    // Get todos from DB
    let todoDb = JSON.parse(localStorage.getItem("todos"));
    let filteredTodo = todoDb.filter((t) => {
      if (value === "All") {
        return t.assignee;
      } else {
        return t.assignee === value;
      }
    });
    // console.log(filteredTodo);
    setTodos(filteredTodo);
    // // <Todo key={filteredTodo.id} todo={filteredTodo}></Todo>;
    // console.log("========", filteredTodo);
  }
  return (
    <>
      <button
        type="button"
        style={{
          margin: "20px",
          padding: "10px",
          Border: "none",
          borderRadius: "10px",
          whiteSpace: "normal",
          width: "150px",
        }}
        onClick={handleFilterClick}
        // onClick={onClose}
      >
        {value}
      </button>
    </>
  );
}
