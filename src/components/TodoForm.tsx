// TodoForm.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { TodoService } from "../models/TodoService";
import { TodoTypes } from "../models/TodoTypes";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

export const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodo) => [...prevTodo, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <div className="inputForm">
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus={true}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTodo}>Add</button>
      <h1>To do list</h1>
    </div>
  );
};
