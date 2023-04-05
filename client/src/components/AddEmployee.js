import React, { useState } from "react";
import "./AddEmployee.css";
import Axios from "axios";

function AddEmployee() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [task, setTask] = useState(""); // new variable
  const [wage, setWage] = useState("");
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      // access endpoint
      name: name,
      position: position,
      task: task,
      wage: wage,
    }).then(() => {
      setName("");
      setPosition("");
      setTask("");
      setWage("");
    });
  };

  return (
    <div className="addEmployee">
      <h2>Add New Employee</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
          value={position}
        />
      </div>
      <div>
        <label>Task:</label>
        <input
          type="text"
          onChange={(event) => {
            setTask(event.target.value);
          }}
          value={task}
        />
      </div>
      <div>
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
          value={wage}
        />
      </div>
      <button onClick={addEmployee} className="addButton">
        SUBMIT
      </button>
    </div>
  );
}

export default AddEmployee;
