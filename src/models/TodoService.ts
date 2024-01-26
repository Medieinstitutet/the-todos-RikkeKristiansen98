import { TodoTypes } from "./TodoTypes";

const LOCAL_STORAGE_KEY = 'todos';


const TodoService = {

getTodos: (): TodoTypes[] => {
   const todoString = localStorage.getItem(LOCAL_STORAGE_KEY)
   return todoString ? JSON.parse(todoString) : [];
},


// lägga till todos 
addTodos: (text:string): TodoTypes => {
   const todos = TodoService.getTodos();
const newTodo: TodoTypes = {id: todos.length + 1, text, completed: false};


const updateTodos = [...todos, newTodo];
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));


return newTodo;
},
// uppdatera


updateTodo: (todo: TodoTypes): TodoTypes => {
   const todos = TodoService.getTodos();
   const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t))
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
return todo;
},


// Ta bort to do 
deleteTodo: (id:number): void => {
   const todos = TodoService.getTodos();


   const updateTodos = todos.filter((todo) => todo.id !== id);
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));


}


};
