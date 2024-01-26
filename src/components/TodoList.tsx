import { useState } from "react";
import { TodoTypes } from "../models/TodoTypes";
import { TodoService } from "../models/TodoService";
import { TodoForm } from "./TodoForm";


export const TodoList = () => {
 
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null> (null);
  const [editedTodoText, setEditedTodoText] = useState<string>("")
 
  //functio for handling edit actions


  const handleEditStart = (id:number, text:string) =>{
      setEditedTodoId(id);
      setEditedTodoText(text);
  }


  const handleEditCancel =() => {
      setEditedTodoId(null);
      setEditedTodoText("")
  }


  const handleEditSave =(id:number) => {
      if(editedTodoText.trim() !== ""){
          const updateTodo = TodoService.updateTodo({
              id, text:editedTodoText, completed:false
          });
setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
);
setEditedTodoId(null);
setEditedTodoText("");
  }
  };

  const handleDeleteTodo = (id:number) => {
      TodoService.deleteTodo(id);
      setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
  }
  return (
  <div className="todoContainer">
   <div>
<TodoForm setTodos = {setTodos}/>        
 </div>
 <div className="todos">


{todos.map((todo) => (
<div className="items" key={todo.id}>
{editingTodoId == todo.id ? (
<div className="editText">
     
 <input type="text"
      value={editedTodoText}
      onChange={(e) => setEditedTodoText
          (e.target.value)}
          autoFocus={true} />
          <button className="saveBtn" 
          onClick={() => handleEditSave(todo.id)}>
           Save
          </button>
          <button className="cancelBtn" 
          onClick={() => handleEditCancel()}>
          Cancel</button>
  </div>
): (
  <div className="editBtn">
<span>{todo.text}</span>
<button 
onClick={() => handleEditStart(todo.id, todo.text)}>
Edit todo
</button>
</div>
)}
<button 
onClick={() => handleDeleteTodo(todo.id)}>
  Delete
</button>
</div>
))}
</div>
</div>
)};

