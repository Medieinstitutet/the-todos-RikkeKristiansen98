
export const TodoList = () => {
 
  return (
    <>
    <div className="main-container">
    <h1><strong>To do list</strong></h1>
      <ul>
     <input type="text" />
   <button className="saveBtn">Save</button>
              <>     
    <button className="editBtn">
                  Edit
      </button>
     <button className="deleteBtn">Delete</button>
              </>
      </ul>
      <input type="text"
        placeholder="Add task to do" />
      <button className="addBtn">Add</button>
    </div>
    </>
  );
};
