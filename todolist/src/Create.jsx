import React, { useState } from "react";
import { addTodo } from "./api";

function Create({ setTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    try {
      const newTask = await addTodo(task);
      setTask("");
      setTodos((prevTodos) => [...prevTodos, newTask]);
      console.log("Task added:", newTask);
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  return (
    <div className="create_form">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
