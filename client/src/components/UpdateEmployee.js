import React, { useState, useContext } from "react";
import { Context } from "../context/Context";
import "./UpdateEmployee.css";
import Axios from "axios";
import { NavLink } from "react-router-dom";

function UpdateEmployee() {
  const { dispatch, editData } = useContext(Context);
  const [name, setName] = useState(editData.editName);
  const [position, setPosition] = useState(editData.editPosition);
  const [task, setTask] = useState(editData.editTask);
  const [wage, setWage] = useState(editData.editWage);
  const [id, setId] = useState(editData.editId);

  const updateEmployee = () => {
    Axios.put("http://localhost:3001/updateEmployee", {
      // access endpoint
      name: name,
      position: position,
      task: task,
      wage: wage,
      id: id,
    }).then(() => {
      setName("");
      setPosition("");
      setTask("");
      setWage("");
    });
  };

  return (
    <div className="updateEmployee">
      <div className="dialog">
        <h2>Update Employee</h2>
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
        <NavLink className="addButton" onClick={updateEmployee} to="/">
          SUBMIT
        </NavLink>
      </div>
    </div>
  );
}

export default UpdateEmployee;
