import { useState } from "react";
import { TodoTypes } from "../models/TodoTypes";
import { TodoService } from "../models/TodoService";
import { TodoForm } from "./TodoForm";

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  return (
    <div className="main-container">
      <div>
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="todos">
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="items">
              {editingTodoId === todo.id ? (
                <div className="editText">
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    autoFocus={true} />
                  <button className="save-Btn" 
                  onClick={() => handleEditSave(todo.id)}>
                    Save
                  </button>
                  <button className="cancel-Btn" 
                  onClick={() => handleEditCancel()}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <span>{todo.text}</span>
                  <button className="edit-Btn" 
                  onClick={() => handleEditStart(todo.id, todo.text)}>
                    Edit
                  </button>
                </div>
              )}
              <button className="delete-Btn" 
              onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
