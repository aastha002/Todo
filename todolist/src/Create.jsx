import React, { useState } from "react";
import axios from "axios";

function Create({ setTodos }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }
    axios
      .post("http://localhost:3001/add/", { task: task })
      .then((result) => {
        setTask("");
        setTodos((prevTodos) => [...prevTodos, result.data]);
        console.log("Task added:", result.data);
      })
      .catch((err) => console.log(err));
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
