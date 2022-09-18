import { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [todolistItems, setTodolistItems] = useState([
    { id: Date.now(), value: "Add to do" }
  ]);
  const [inputTodos, setInputTodos] = useState("");
  const [editTodo, setEditTodo] = useState({});

  function handleTodo() {
    setTodolistItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        value: inputTodos
      }
    ]);
    setInputTodos("");
    return;
  }

  function handleEdit(todoItem) {
    setEditTodo(todoItem);
    console.log(editTodo);
  }

  function handleEditChange(e) {
    setEditTodo((prev) => ({ ...prev, value: e.target.value }));
    console.log(editTodo);
  }

  function handleSaveChange() {
    const newTodo = todolistItems.map((todoItem) => {
      if (editTodo.id === todoItem.id) {
        return editTodo;
      }
      return todoItem;
    });
    setTodolistItems(newTodo);
    setEditTodo({});
  }

  function removeTodo(todoItemInList) {
    const newTodo = todolistItems.filter((todoItem) => {
      return todoItemInList.id !== todoItem.id;
    });
    setTodolistItems(newTodo);
    setEditTodo({});
  }
  return (
    <>
      <div className="App">
        <input
          value={inputTodos}
          onChange={(e) => setInputTodos(e.target.value)}
        ></input>
        <button id="span" onClick={handleTodo}>
          To do List
        </button>
        <button onClick={() => setTodolistItems([])} id="span">
          Clear
        </button>
      </div>
      <div>
        {todolistItems.map((todosItems) => {
          return (
            <div style={{ display: "flex" }}>
              {editTodo.id === todosItems.id ? (
                <input
                  id="inputTodo"
                  value={editTodo.value}
                  onChange={(e) => handleEditChange(e)}
                />
              ) : (
                <p>{todosItems.value}</p>
              )}
              {editTodo.id === todosItems.id ? (
                <button id="todo-action" onClick={handleSaveChange}>
                  Save
                </button>
              ) : (
                <button id="todo-action" onClick={() => handleEdit(todosItems)}>
                  Edit
                </button>
              )}
              <button id="todo-action" onClick={() => removeTodo(todosItems)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
