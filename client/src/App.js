import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [task, setTask] = useState(""); // new variable
  const [wage, setWage] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);
  const [newTask, setNewTask] = useState("");

  const [search, setSearch] = useState("");

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      // access endpoint
      name: name,
      position: position,
      task: task,
      wage: wage,
    }).then(() => {
      getEmployees();
      setName("");
      setPosition("");
      setTask("");
      setWage("");
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const get3Employees = () => {
    Axios.get("http://localhost:3001/employees3").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const get5Employees = () => {
    Axios.get("http://localhost:3001/employees5").then((response) => {
      // access endpoint
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/updateWage", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                position: val.position,
                task: val.task,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  const updateEmployeeTask = (id) => {
    Axios.put("http://localhost:3001/updateTask", {
      task: newTask,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                position: val.position,
                task: newTask,
                wage: val.wage,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          // filter will delete what gets returned
          return val.id !== id;
        })
      );
    });
  };

  const getSearch = (search) => {
    Axios.get(`http://localhost:3001/search${search}`).then((response) => {
      // access endpoint
      setEmployeeList(response.data);
      setSearch("");
    });
  };

  return (
    <div className="App">
      <div className="pageHeader">Project Management System Testing</div>
      <div className="UI">
        <div className="addEmployeeDiv">
          <h2>Add New Employee</h2>
          <label>Name:</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
          <label>Position:</label>
          <input
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
            value={position}
          />
          <label>Task:</label>
          <input
            type="text"
            onChange={(event) => {
              setTask(event.target.value);
            }}
            value={task}
          />
          <label>Wage (year):</label>
          <input
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}
            value={wage}
          />
          <button onClick={addEmployee} className="addButton">
            Add
          </button>
          <button onClick={getEmployees} className="showEmployeesButton">
            Show Employees
          </button>
        </div>
        <div className="employees">
          <div>
            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              value={search}
            />
            <button
              onClick={() => {
                getSearch(search);
              }}
              className="sortButtons"
            >
              Search
            </button>
            <button onClick={get3Employees} className="sortButtons">
              Show 3
            </button>
            <button onClick={get5Employees} className="sortButtons">
              Show 5
            </button>
            <button onClick={getEmployees} className="sortButtons">
              Show All
            </button>
          </div>
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Task</th>
              <th>Wage</th>
              <th>Update Task</th>
              <th>Update Wage</th>
              <th>Delete Employee</th>
            </tr>
            {employeeList.map((val, key) => {
              return (
                <tr>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td>{val.position}</td>
                  <td>{val.task}</td>
                  <td>${parseInt(val.wage, 10) / 1000},000</td>
                  <td>
                    <div>
                      <input
                        className="editEmployeeInput"
                        type="text"
                        onChange={(event) => {
                          setNewTask(event.target.value);
                        }}
                      />
                      <button
                        className="employeeButton"
                        onClick={() => {
                          updateEmployeeTask(val.id);
                        }}
                      >
                        Update Task
                      </button>
                    </div>
                  </td>
                  <td>
                    <div>
                      <input
                        className="editEmployeeInput"
                        type="number"
                        onChange={(event) => {
                          setNewWage(event.target.value);
                        }}
                      />
                      <button
                        className="employeeButton"
                        onClick={() => {
                          updateEmployeeWage(val.id);
                        }}
                      >
                        Update Wage
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="deleteEmployeeButton"
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
