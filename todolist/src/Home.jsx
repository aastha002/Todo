import React, { useEffect, useState } from "react";
import Create from "./Create";
import { fetchTodos, deleteItem, updateTodo } from "./api";
import {
  BsCircleFill,
  BsFillTrashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await updateTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      console.log("Item deleted");
    } catch (err) {
      alert("Error deleting item");
    }
  };

  return (
    <div className="home">
      <div className="todo-container">
        <h2>Todo List</h2>
        <Create setTodos={setTodos} />
        {todos.length === 0 ? (
          <div>
            <h2>No Records</h2>
          </div>
        ) : (
          todos.map((todo, index) => (
            <div className="task" key={index}>
              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {todo.done ? (
                  <BsFillCheckCircleFill className="icon" />
                ) : (
                  <BsCircleFill className="icon" />
                )}
                <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span>
                  <BsFillTrashFill
                    className="icon"
                    onClick={() => handleDelete(todo._id)}
                  />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
